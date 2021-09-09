import { Badge } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import { useCart } from "../providers/CartProvider";
import { NavButton } from "./NavButton";

export type CartProps = { isSelected?: boolean; isFullWidth?: boolean };

const defaultStyles = {
  top: -1,
  right: -1,
  position: "absolute",
};

const fullWidthStyles = {
  marginLeft: 2,
};

export const CartWidget = ({ isFullWidth }: CartProps) => {
  const { list, totalQuantity } = useCart();

  console.log(list, totalQuantity);

  return (
    <NavButton icon={MdShoppingCart} isFullWidth={isFullWidth} to="/cart" end>
      Mi Carrito
      {totalQuantity > 0 ? (
        <Badge
          colorScheme="red"
          variant="solid"
          sx={!isFullWidth ? defaultStyles : fullWidthStyles}
          borderRadius={4}
        >
          {totalQuantity}
        </Badge>
      ) : null}
    </NavButton>
  );
};
