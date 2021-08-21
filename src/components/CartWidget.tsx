import { Badge } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
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

export const CartWidget = ({ isSelected, isFullWidth }: CartProps) => {
  const items = 10;

  return (
    <NavButton
      icon={MdShoppingCart}
      isFullWidth={isFullWidth}
      isSelected={isSelected}
    >
      Mi Carrito
      {items > 0 ? (
        <Badge
          colorScheme="red"
          variant="solid"
          sx={!isFullWidth ? defaultStyles : fullWidthStyles}
          borderRadius={4}
        >
          {items}
        </Badge>
      ) : null}
    </NavButton>
  );
};
