import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useIsSignedIn } from "../api/auth";
import { useUserOrders } from "../api/useUserOrders";
import { Text } from "@chakra-ui/react";

const OrdersList = () => {
  const orders = useUserOrders();

  return (
    <>
      {orders.map((order) => {
        return (
          <Text key={order.id}>
            {order.id}: {order.total}
          </Text>
        );
      })}
    </>
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
