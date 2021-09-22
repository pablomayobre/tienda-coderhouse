import {
  Box,
  Button,
  Heading,
  Skeleton,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";
import { useItem } from "../api";
import { formatCurrency } from "../api/helpers";
import { ItemCount } from "./ItemCount";
import { SuspendedImage } from "./SuspendedImage";
import { getDefaultVariants, VariantPicker } from "./VariantPicker";
import { useCart } from "../providers/CartProvider";

export const ItemDetail = ({ id }: { id: string }) => {
  const { item } = useItem(id);
  const navigate = useNavigate();

  if (!item) throw new Error("Item doesn't exist");

  const [selectedVariants, setVariants] = useState(getDefaultVariants(item));
  const [selectedQuantity, setQuantity] = useState(0);

  const { addQuantity } = useCart();

  return (
    <Box minHeight="100vh">
      <Stack direction="row" justifyContent="center" gridGap={20}>
        <SuspendedImage
          src={item.pictureURL}
          alt=""
          ratio={1}
          minWidth="500px"
          flexGrow={0}
        />
        <Stack maxWidth="container.sm">
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
            max={item.stock}
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
            onClick={() => {
              addQuantity({
                itemId: item.id,
                quantity: selectedQuantity,
                variants: selectedVariants,
              });

              navigate("/cart");
            }}
          >
            Agregar al Carrito
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export const ItemDetailSuspense = () => {
  return (
    <Box minHeight="100vh">
      <Stack direction="row" justifyContent="center" gridGap={20}>
        <SuspendedImage src="" alt="" ratio={1} minWidth="500px" flexGrow={0} />
        <Stack maxWidth="container.sm">
          <Skeleton>
            <Heading as="h2">My item</Heading>
          </Skeleton>
          <Skeleton>
            <Text fontSize="3xl">$ 100.00</Text>
          </Skeleton>
          <Skeleton>
            <ItemCount max={0} min={0} />
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
