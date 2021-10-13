import { useParams } from "react-router";
import { useOrder } from "../api/useOrder";
import { Center, Heading, Stack, Text } from "@chakra-ui/react";
import { SuspendedOrderItem } from "../components/OrderItem";
import { getItemKey } from "../providers/CartProvider";
import { formatCurrency } from "../api/helpers";

const OrderviewFallback = () => {
  return <Text>No se encontró la orden que estás buscando</Text>;
};

const OrderView = () => {
  const { id } = useParams();
  const { order } = useOrder(id);

  if (!order) {
    return <OrderviewFallback />;
  }

  const date = new Date(order.date);

  return (
    <>
      <Heading textAlign="center">Orden de compra</Heading>
      <Center>
        <Text
          color="white"
          bg="green.400"
          borderRadius={8}
          maxWidth="fit-content"
          padding={2}
          paddingLeft={4}
          paddingRight={4}
          fontSize="2xl"
        >
          {id}
        </Text>
      </Center>
      <Heading textAlign="center" paddingTop={4}>
        Items
      </Heading>
      <Stack direction="column" alignItems="center">
        {order.items.map((item) => (
          <SuspendedOrderItem key={getItemKey(item)} item={item} />
        ))}
      </Stack>
      <Text
        margin="0 auto"
        fontSize="3xl"
        paddingTop={4}
        textAlign="right"
        maxWidth="container.md"
      >
        Total: {formatCurrency(order.total)}
      </Text>
      <Text
        margin="0 auto"
        fontSize="sm"
        color="blackAlpha.700"
        paddingTop={0}
        textAlign="right"
        maxWidth="container.md"
        paddingBottom={8}
      >
        Compra realizada el {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </Text>
    </>
  );
};

export default OrderView;
