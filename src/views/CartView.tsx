import { Stack, Box, Heading, Text, Button } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import { useRefetchItem } from "../api/getItem";
import { formatCurrency } from "../api/helpers";
import {
  CartItem,
  CartItemError,
  CartItemSuspense,
} from "../components/CartItem";
import { CartData, getItemKey, useCart } from "../providers/CartProvider";

const SuspendedCartItem = ({
  item,
  setPrice,
}: {
  item: CartData;
  setPrice: (value: number) => void;
}) => {
  const refetch = useRefetchItem(item.itemId);

  return (
    <ErrorBoundary FallbackComponent={CartItemError} onReset={refetch}>
      <Suspense fallback={<CartItemSuspense />}>
        <CartItem item={item} setPrice={setPrice} />
      </Suspense>
    </ErrorBoundary>
  );
};

const CartList = ({ list }: { list: CartData[] }) => {
  const [price, setPrice] = useState(list.map(() => 0));

  return (
    <>
      {list.map((item, index) => (
        <SuspendedCartItem
          key={getItemKey(item)}
          item={item}
          setPrice={(value) =>
            setPrice((current) => {
              const prices = [...current];
              prices[index] = value;
              return prices;
            })
          }
        />
      ))}
      <Text
        fontSize="3xl"
        maxWidth="container.md"
        width="100%"
        paddingRight={8}
        textAlign="right"
      >
        Total: {formatCurrency(price.reduce((a, b) => a + b))}
      </Text>
    </>
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
        {list.length > 0 ? (
          <CartList list={list} />
        ) : (
          <>
            <Text fontSize="4xl">Todavía no hay items en tu carrito</Text>
            <Button variant="solid" as={Link} to="/">
              Ir a la Tienda
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default CartView;
