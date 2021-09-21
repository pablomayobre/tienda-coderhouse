import { Stack, Box, Heading } from "@chakra-ui/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRefetchItem } from "../api/getItem";
import {
  CartItem,
  CartItemError,
  CartItemSuspense,
} from "../components/CartItem";
import { CartData, getItemKey, useCart } from "../providers/CartProvider";

const SuspendedCartItem = ({ item }: { item: CartData }) => {
  const refetch = useRefetchItem(item.itemId);

  return (
    <ErrorBoundary FallbackComponent={CartItemError} onReset={refetch}>
      <Suspense fallback={<CartItemSuspense />}>
        <CartItem item={item} />
      </Suspense>
    </ErrorBoundary>
  );
};

const CartView = () => {
  const { list } = useCart();

  return (
    <Box paddingBottom={4}>
      <Heading as="h2" textAlign="center">
        Carrito
      </Heading>
      <Stack gap={20} alignItems="center" padding={4}>
        {list.map((item, index) => (
          <SuspendedCartItem key={getItemKey(item)} item={item} />
        ))}
      </Stack>
    </Box>
  );
};

export default CartView;
