import { Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type NavButtonProps = {
  isSelected?: boolean;
  icon: IconType;
  isFullWidth?: boolean;
  children: React.ReactNode;
};

const fullWidthStyles = {
  borderRadius: 0,
  justifyContent: "left",
  paddingLeft: 10,
} as const;

export const NavButton = ({
  isFullWidth,
  isSelected,
  icon,
  children,
}: NavButtonProps) => {
  return (
    <Button
      as="a"
      href="#"
      sx={isFullWidth ? fullWidthStyles : undefined}
      leftIcon={<Icon as={icon} size={5} />}
      iconSpacing={1}
      position="relative"
      colorScheme="purple"
      variant={isSelected ? "solid" : "ghost"}
    >
      {children}

    </Button>
  );
};
