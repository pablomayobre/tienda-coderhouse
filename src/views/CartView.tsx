import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../api/helpers";
import { SuspendedCartItem } from "../components/CartItem";
import { OrderDetailsModal } from "../components/OrderDetailsModal";
import { useCallbackProp } from "../hooks/useCallbackProp";
import { CartData, getItemKey, useCart } from "../providers/CartProvider";

const CartList = ({ list, clear }: { list: CartData[], clear?: () => void }) => {
  const [price, setPrice] = useState(list.map(() => 0));
  const { columns, minChildWidth } = useBreakpointValue(
    { base: { columns: 4, minChildWidth: "200px" }, md: { columns: 1 } },
    "md"
  ) ?? { columns: 1 };

  const onClear = useCallbackProp(clear);

  return (
    <>
      <SimpleGrid
        columns={columns}
        minChildWidth={minChildWidth}
        width="100%"
        gridGap={4}
      >
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
      </SimpleGrid>
      <Stack
        width="100%"
        alignItems="flex-end"
        maxWidth="container.md"
        paddingRight={8}
        paddingLeft={8}
      >
        <Flex width="100%" direction="row-reverse" justifyContent="space-between" wrap="wrap">
          <Text fontSize="3xl" flexGrow={1} textAlign="right">
            Total: {formatCurrency(price.reduce((a, b) => a + b))}
          </Text>
          <Button variant="link" colorScheme="red" onClick={onClear} paddingLeft={2} paddingRight={2}>
            Vaciar carrito
          </Button>
        </Flex>
        <OrderDetailsModal />{" "}
      </Stack>
    </>
  );
};

const CartView = () => {
  const { list, clear } = useCart();

  return (
    <Box padding={4} paddingTop={0}>
      <Heading as="h2" textAlign="center">
        Carrito
      </Heading>
      <Stack direction="column" gap={20} alignItems="center" paddingTop={2}>
        {list.length > 0 ? (
          <CartList list={list} clear={clear} />
        ) : (
          <>
            <Text fontSize="4xl" textAlign="center">Todavía no hay items en tu carrito</Text>
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
