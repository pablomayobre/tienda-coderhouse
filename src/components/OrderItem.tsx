import { Button, Heading, Skeleton, Stack, Text, Flex } from "@chakra-ui/react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useItem } from "../api/useItem";
import { SuspendedImage } from "./SuspendedImage";
import { CartData } from "../providers/CartProvider";
import { GenericVariant } from "../api/types";
import { formatCurrency } from "../api/helpers";
import { Suspense } from "react";

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

export type OrderItemProps = {
  item: CartData & { price?: number | null };
};

export const OrderItem = ({ item }: OrderItemProps) => {
  const { item: details } = useItem(item.itemId);

  if (!details) throw new Error("Item doesn't exist");

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
        <VariantDisplay variants={details.variants} selected={item.variants} />
      </Stack>
      <Stack alignItems={"end"}>
        <Text fontSize="2xl" textAlign="right">
          Cantidad: {item.quantity}
        </Text>
        <Text fontSize="3xl" textAlign="right">
          {formatCurrency(item.price ?? details.price)}
        </Text>
      </Stack>
    </Flex>
  );
};

export const OrderItemSuspense = () => {
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
        <Skeleton><Heading as="h2">Item Name</Heading></Skeleton>
      </Stack>
      <Stack alignItems={"end"}>
        <Skeleton><Text fontSize="2xl" textAlign="right">
          Cantidad: 10
        </Text></Skeleton>
        <Skeleton><Text fontSize="3xl" textAlign="right">
          {formatCurrency(100)}
        </Text></Skeleton>
      </Stack>
    </Flex>
  );
};

export const OrderItemError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Text fontSize="3xl">Hubo un error al cargar este producto</Text>
      <Button onClick={resetErrorBoundary}>Reintentar</Button>
    </Flex>
  );
};

export const SuspendedOrderItem = (props: OrderItemProps) => {
  return (
    <ErrorBoundary FallbackComponent={OrderItemError}>
      <Suspense fallback={<OrderItemSuspense />}>
        <OrderItem {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};
