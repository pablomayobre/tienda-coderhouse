import { Badge, Box, Icon, IconButton, Portal } from "@chakra-ui/react";
import { MdShoppingCart } from "react-icons/md";
import { useCart } from "../providers/CartProvider";
import { NavButton } from "./NavButton";

export type CartProps = { isFloating?: boolean };

const defaultStyles = {
  top: -1,
  right: -1,
  position: "absolute",
};

const FloatingCartButton = ({
  items,
  text,
}: {
  items: number;
  text: string;
}) => {
  return (
    <Portal>
      <Box position="fixed" right={4} bottom={4}>
        <IconButton
          position="relative"
          right={0}
          bottom={0}
          variant="solid"
          colorScheme="purple"
          aria-label={text}
          borderRadius="100%"
          size="lg"
          shadow="lg"
          icon={<Icon as={MdShoppingCart} size={6} />}
        />
        {items > 0 ? (
          <Badge
            position="absolute"
            colorScheme="red"
            variant="solid"
            top={0}
            right={0}
            borderRadius={4}
          >
            {items}
          </Badge>
        ) : null}
      </Box>
    </Portal>
  );
};

const NormalCartButton = ({ items, text }: { items: number; text: string }) => {
  return (
    <NavButton icon={MdShoppingCart} to="/cart" end>
      {text}
      {items > 0 ? (
        <Badge
          colorScheme="red"
          variant="solid"
          sx={defaultStyles}
          borderRadius={4}
        >
          {items}
        </Badge>
      ) : null}
    </NavButton>
  );
};

export const CartWidget = ({ isFloating }: CartProps) => {
  const { list } = useCart();

  const text = "Mi Carrito";

  return isFloating ? (
    <FloatingCartButton text={text} items={list.length} />
  ) : (
    <NormalCartButton text={text} items={list.length} />
  );
};
