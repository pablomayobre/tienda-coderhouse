import { useParams } from "react-router";
import { useOrder } from "../api/useOrder";
import { Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { SuspendedCartItem } from "../components/CartItem";
import { getItemKey } from "../providers/CartProvider";

const OrderviewFallback = () => {
  return <Text>No se encontró la orden que estás buscando</Text>;
};

const OrderView = () => {
  const { id } = useParams();
  const { order } = useOrder(id);

  if (!order) {
    return <OrderviewFallback />;
  }

  return (
    <>
      <Center>
        <Heading>Orden: {id}</Heading>
      </Center>
      <Center><Flex
      direction="column"
      padding={8}
      gridGap={3}
      bg="white"
      borderRadius="lg"
      shadow="xs"
      maxWidth="container.md"
      width="100%"
    >
        <Text>
          <Text fontWeight="bold" display="inline">
            Comprador:
          </Text>{" "}
          {order.buyer.name}
        </Text>
        <Text>
          <Text fontWeight="bold" display="inline">
            Número de Telefono:
          </Text>{" "}
          {order.buyer.phone}
        </Text>
        <Text>
          <Text fontWeight="bold" display="inline">
            E-mail:
          </Text>{" "}
          {order.buyer.email}
        </Text>
      </Flex>
      </Center>
      <Center>
        <Heading>Items</Heading>
      </Center>
      <Stack direction="column" alignItems="center">
        {order.items.map((item, index) => (
          <SuspendedCartItem key={getItemKey(item)} item={item} />
        ))}
      </Stack>
    </>
  );
};

export default OrderView;
