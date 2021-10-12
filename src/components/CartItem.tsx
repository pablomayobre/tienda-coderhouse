import {
  Button,
  Heading,
  Skeleton,
  Stack,
  Text,
  Flex,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useItem } from "../api/useItem";
import { ItemCount } from "./ItemCount";
import { AspectRatioImage } from "./SuspendedImage";
import { CartData, useCart } from "../providers/CartProvider";
import { GenericVariant } from "../api/types";
import { formatCurrency } from "../api/helpers";
import { Suspense, useEffect } from "react";
import { useCallbackProp } from "../hooks/useCallbackProp";
import { Link } from "react-router-dom";

const VariantDisplay = ({
  selected,
  variants,
}: {
  selected: Record<string, string>;
  variants?: Record<string, GenericVariant>;
}) => {
  const text = Object.entries(variants ?? {})
    .map(([name, variant]) => {
      const valueName = selected[name] ?? variant.default;

      return `${variant.displayName ?? name}: ${
        variant.values[valueName].displayName ?? valueName
      }`;
    })
    .join(", ");

  return (
    <Text
      flexShrink={2}
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      overflow="hidden"
      width="100%"
      display="block"
    >
      {text}
    </Text>
  );
};

export type CartItemProps = {
  item: CartData & { price?: number | null };
  setPrice?: (value: number) => void;
};

export const CartItem = ({ item, setPrice }: CartItemProps) => {
  const { item: details } = useItem(item.itemId);

  if (!details) throw new Error("Item doesn't exist");

  const { setQuantity, remove } = useCart();
  const setItemPrice = useCallbackProp(setPrice);

  useEffect(() => {
    setItemPrice(item.quantity * (item.price ?? details.price));
  }, [item.quantity, item.price, details.price, setItemPrice]);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      bg="white"
      borderRadius="lg"
      shadow="xs"
      maxWidth={{ base: 250, md: "container.md" }}
      margin="0 auto"
      width="100%"
      justifyContent="space-between"
    >
      <LinkBox
        as={Flex}
        direction={{ base: "column", md: "row" }}
        padding={4}
        gridGap={3}
        minWidth={0}
        width="100%"
      >
        <AspectRatioImage
          src={details.pictureURL}
          alt=""
          ratio={1}
          minWidth="160px"
        />
        <Flex direction="column" overflow="hidden" flexGrow={2}>
          <LinkOverlay
            as={Link}
            to={`/item/${item.itemId}`}
            flexShrink={2}
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            width="100%"
            display="block"
          >
            <Heading as="h2" display="inline">
              {details.title}
            </Heading>
          </LinkOverlay>

          <VariantDisplay
            variants={details.variants}
            selected={item.variants}
          />
        </Flex>
      </LinkBox>
      <Stack
        alignItems="end"
        minWidth={0}
        padding={4}
        paddingRight={{ base: 4, sm: 8 }}
      >
        <Text fontSize="3xl" textAlign={"right"}>
          {formatCurrency(item.price ?? details.price)}
        </Text>
        <ItemCount
          onChange={(s, value) => {
            setQuantity({ ...item, quantity: value });
          }}
          value={item.quantity}
          max={details.stock}
          min={1}
        />
        <Text fontSize="sm" textAlign="right" sx={{ marginTop: "0!important" }}>
          {details.stock} unidades
        </Text>
        <Button
          marginTop={2}
          display="inline-block"
          variant="link"
          flexGrow={1}
          onClick={() => {
            remove(item);
          }}
        >
          Quitar del Carrito
        </Button>
      </Stack>
    </Flex>
  );
};

export const CartItemSuspense = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      bg="white"
      borderRadius="lg"
      shadow="xs"
      maxWidth={{ base: 250, md: "container.md" }}
      margin="0 auto"
      width="100%"
      justifyContent="space-between"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        padding={4}
        gridGap={3}
        minWidth={0}
        width="100%"
      >
        <AspectRatioImage alt="" ratio={1} minWidth="160px" />
        <Flex direction="column" overflow="hidden" flexGrow={2}>
          <Skeleton>
            <Heading
              as="h2"
              display="block"
              flexShrink={2}
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
              width="100%"
            >
              Nombre del Producto
            </Heading>
          </Skeleton>
        </Flex>
      </Flex>
      <Stack
        alignItems="end"
        minWidth={0}
        padding={4}
        paddingRight={{ base: 4, sm: 8 }}
      >
        <Skeleton>
          <Text fontSize="3xl" textAlign={"right"}>
            {formatCurrency(100)}
          </Text>
        </Skeleton>
        <Skeleton>
          <ItemCount isDisabled value={0} max={0} min={0} />
        </Skeleton>
        <Skeleton>
          <Text
            fontSize="sm"
            textAlign="right"
            sx={{ marginTop: "0!important" }}
          >
            10 unidades
          </Text>
        </Skeleton>
        <Skeleton>
          <Button
            marginTop={2}
            display="inline-block"
            variant="link"
            flexGrow={1}
            disabled
          >
            Quitar del Carrito
          </Button>
        </Skeleton>
      </Stack>
    </Flex>
  );
};

export const CartItemError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Text fontSize="3xl">Hubo un error al cargar este producto</Text>
      <Button onClick={resetErrorBoundary}>Reintentar</Button>
    </Flex>
  );
};

export const SuspendedCartItem = (props: CartItemProps) => {
  return (
    <ErrorBoundary FallbackComponent={CartItemError}>
      <Suspense fallback={<CartItemSuspense />}>
        <CartItem {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};
