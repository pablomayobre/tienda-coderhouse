import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useIsSignedIn } from "../api/auth";
import { useUserOrders } from "../api/useUserOrders";
import { Text, Stack, Tag, LinkOverlay, LinkBox } from "@chakra-ui/react";
import { FullOrder } from "../api/useSaveOrder";
import { formatCurrency } from "../api/helpers";
import { Link } from "react-router-dom";

const OrdersList = () => {
  const orders = useUserOrders();

  return (
    <Stack maxWidth="container.sm" margin="0 auto" padding={4}>
      {orders.map((order: FullOrder & { id: string }) => {
        const date = new Date(order.date);
        return (
          <LinkBox
            as={Stack}
            width="100%"
            key={order.id}
            borderRadius={4}
            shadow="xs"
            bg="white"
            padding={4}
          >
            <Tag variant="solid" colorScheme="green" maxWidth="fit-content">
              <LinkOverlay as={Link} to={`/order/${order.id}`}>
                {order.id}
              </LinkOverlay>
            </Tag>
            <Text>
              {order.items.reduce((prev, item) => prev + item.quantity, 0)}{" "}
              items, por un total de: {formatCurrency(order.total)}
            </Text>
            <Text fontSize="sm" textAlign="right" color="blackAlpha.500" padding={0} margin={0}>
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </Text>
          </LinkBox>
        );
      })}
    </Stack>
  );
};

const UserOrders = () => {
  const isSignedIn = useIsSignedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) navigate("/", { replace: true });
  }, [isSignedIn, navigate]);

  return <OrdersList />;
};

export default UserOrders;
