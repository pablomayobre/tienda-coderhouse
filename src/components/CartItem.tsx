import {
  Button,
  Heading,
  Skeleton,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";
import { useItem } from "../api/getItem";
import { ItemCount } from "./ItemCount";
import { SuspendedImage } from "./SuspendedImage";
import { CartData, useCart } from "../providers/CartProvider";
import { GenericVariant } from "../api/types";
import { formatCurrency } from "../api/helpers";

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

  return <Text display="inline-block">{text}</Text>;
};

export const CartItem = ({ item }: { item: CartData }) => {
  const { item: details } = useItem(item.itemId);
  const { setQuantity, remove } = useCart();

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      padding={4}
      paddingLeft={4}
      paddingRight={8}
      gridGap={3}
      bg="white"
      borderRadius="lg"
      shadow="xs"
      maxWidth="container.md"
      width="100%"
    >
      <SuspendedImage
        src={details.pictureURL}
        alt=""
        ratio={1}
        minWidth="160px"
      />
      <Stack
        flexGrow={2}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <Heading as="h2">{details.title}</Heading>
          <VariantDisplay
            variants={details.variants}
            selected={item.variants}
          />

      </Stack>
      <Stack alignItems={"end"}>
        <Text fontSize="3xl" textAlign={"right"}>
          {formatCurrency(details.price)}
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
      direction={{ base: "column", sm: "row" }}
      padding={4}
      paddingLeft={4}
      paddingRight={8}
      gridGap={3}
      bg="white"
      borderRadius="lg"
      shadow="xs"
      maxWidth="container.md"
      width="100%"
    >
      <SuspendedImage
        src=""
        alt=""
        ratio={1}
        minWidth="160px"
      />
      <Stack
        flexGrow={2}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <Skeleton><Heading as="h2">Item name</Heading></Skeleton>
      </Stack>
      <Stack alignItems={"end"}>
        <Skeleton><Text fontSize="3xl" textAlign={"right"}>
          $ 100.00
        </Text></Skeleton>
        <Skeleton><ItemCount
          max={0}
          min={0}
          isDisabled
        /></Skeleton>
        <Skeleton><Text fontSize="sm" textAlign="right" sx={{ marginTop: "0!important" }}>
          200 unidades
        </Text></Skeleton><Skeleton>
        <Button
          marginTop={2}
          display="inline-block"
          variant="link"
          flexGrow={1}
        >
          Quitar del Carrito
        </Button></Skeleton>
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