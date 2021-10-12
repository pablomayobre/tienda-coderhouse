import {
  Box,
  Button,
  Heading,
  Skeleton,
  Stack,
  HStack,
  Text,
  Flex,
  Icon,
  useToast,
  Grid,
  Tag,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FallbackProps } from "react-error-boundary";
import { NavigateFunction, useNavigate } from "react-router";
import { useItem } from "../api/useItem";
import { formatCurrency } from "../api/helpers";
import { ItemCount } from "./ItemCount";
import { ImageBox } from "./SuspendedImage";
import { getDefaultVariants, VariantPicker } from "./VariantPicker";
import { useCart } from "../providers/CartProvider";
import { MdAddShoppingCart, MdCheckCircle } from "react-icons/md";
import { useCategories } from "../api/useCategories";
import { Link } from "react-router-dom";

const AddedToCartToast = ({ navigate }: { navigate: NavigateFunction }) => {
  return (
    <Flex
      borderRadius={4}
      alignItems="center"
      gridGap={4}
      bg="green.500"
      color="white"
      paddingTop={2}
      paddingBottom={2}
      paddingRight={2}
      paddingLeft={4}
    >
      <Icon as={MdCheckCircle} boxSize={6} />
      <Box>
        <Heading size="2xs">Añadido al carrito</Heading>
        <Text>Se añadió este producto a tu carrito</Text>
      </Box>
      <Button
        colorScheme="blackAlpha"
        onClick={() => {
          navigate("/cart");
        }}
      >
        Ir al carrito
      </Button>
    </Flex>
  );
};

export const ItemDetail = ({ id }: { id: string }) => {
  const { item } = useItem(id);
  const navigate = useNavigate();
  const toast = useToast();

  if (!item) throw new Error("Item doesn't exist");

  const [selectedVariants, setVariants] = useState(getDefaultVariants(item));
  const [selectedQuantity, setQuantity] = useState(0);
  const [currentToast, setCurrentToast] = useState<string | number | undefined>(
    undefined
  );

  const { addQuantity, getItemQuantity } = useCart();

  const cartQuantity = getItemQuantity(id);

  useEffect(() => {
    if (currentToast) {
      const id = currentToast;
      return () => toast.close(id);
    }
  }, [toast, currentToast]);

  const categories = useCategories();

  return (
    <Box minHeight="100vh" margin={4} marginTop={0}>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr auto" }}
        templateRows={{
          base: "min(calc(100vw - var(--chakra-sizes-4)*2), calc(100vh - var(--chakra-sizes-header) - var(--chakra-sizes-4) * 2)) auto",
          md: "min(calc(100vh - var(--chakra-sizes-header) - var(--chakra-sizes-4) * 2), calc(min(100vw, var(--chakra-sizes-container-lg)) - var(--chakra-sizes-64) - var(--chakra-sizes-4) * 3)) auto",
        }}
        templateAreas={{
          base: '"image" "sidebar" "description"',
          md: '"image sidebar" "description sidebar"',
        }}
      >
        <ImageBox
          gridArea="image"
          flexGrow={1}
          borderTopLeftRadius={4}
          borderTopRightRadius={4}
          shadow="xs"
          bg="white"
          overflow="hidden"
          src={item.pictureURL}
        />
        <Box position="relative" gridArea="sidebar">
          <Stack
            position={{ base: "initial", md: "sticky" }}
            top={{
              base: undefined,
              md: "calc(var(--chakra-sizes-header) + var(--chakra-sizes-4))",
            }}
            borderRadius={{ base: 0, md: 4 }}
            maxWidth={{ base: undefined, md: 64 }}
            marginLeft={{ base: undefined, md: 4 }}
            shadow="xs"
            bg="white"
            padding={4}
          >
            <Heading as="h2">{item.title}</Heading>
            <Text fontSize="3xl">{formatCurrency(item.price)}</Text>
            <VariantPicker
              variants={item.variants}
              selected={selectedVariants}
              setSelected={setVariants}
            />
            <ItemCount
              onChange={(s, value) => {
                setQuantity(value);
              }}
              label="Cantidad:"
              max={item.stock - cartQuantity}
              min={0}
            />
            <Text
              fontSize="sm"
              textAlign="right"
              sx={{ marginTop: "0!important" }}
            >
              {item.stock} unidades
            </Text>
            <Button
              disabled={selectedQuantity === 0}
              leftIcon={<Icon as={MdAddShoppingCart} size={6} />}
              colorScheme="purple"
              variant="solid"
              onClick={() => {
                addQuantity({
                  itemId: item.id,
                  uniqueId: item.uid,
                  quantity: selectedQuantity,
                  variants: selectedVariants,
                });

                setCurrentToast(
                  toast({
                    render: () => <AddedToCartToast navigate={navigate} />,
                  })
                );
              }}
            >
              Agregar al Carrito
            </Button>
          </Stack>
        </Box>
        <Box
          gridArea="description"
          paddingBottom={8}
          paddingTop={4}
          marginBottom={8}
          shadow="xs"
          borderBottomLeftRadius={4}
          borderBottomRightRadius={4}
          bg="white"
        >
          <HStack
            bg="purple.100"
            paddingRight={4}
            paddingLeft={4}
            paddingTop={3}
            paddingBottom={3}
          >
            <Text fontWeight="bold">Categorías:</Text>
            {(item.categories ?? []).map((category) => (
              <Tag
                key={category}
                colorScheme="purple"
                variant="solid"
                as={Link}
                to={`/category/${category}`}
              >
                {categories.get(category) ?? category}
              </Tag>
            ))}
          </HStack>
          <Box paddingRight={4} paddingLeft={4}>
            <Heading marginBottom={3} marginTop={2}>
              Descripción
            </Heading>
            <Text>{item.description}</Text>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export const ItemDetailSuspense = () => {
  return (
    <Box minHeight="100vh">
      <Stack direction="row" justifyContent="center" gridGap={20}>
        <ImageBox minWidth="500px" flexGrow={0} />
        <Stack maxWidth="container.sm">
          <Skeleton>
            <Heading as="h2">My item</Heading>
          </Skeleton>
          <Skeleton>
            <Text fontSize="3xl">$ 100.00</Text>
          </Skeleton>
          <Skeleton>
            <ItemCount label="Cantidad:" max={0} min={0} />
          </Skeleton>
          <Skeleton>
            <Text
              fontSize="sm"
              textAlign="right"
              sx={{ marginTop: "0!important" }}
            >
              100 unidades
            </Text>
          </Skeleton>
          <Skeleton>
            <Button>Agregar al Carrito</Button>
          </Skeleton>
        </Stack>
      </Stack>
    </Box>
  );
};

export const ItemDetailError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Text fontSize="3xl">Hubo un error al cargar este producto</Text>
      <Button onClick={resetErrorBoundary}>Reintentar</Button>
    </Flex>
  );
};
