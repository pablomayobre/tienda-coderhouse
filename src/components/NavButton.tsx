import { Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { Link, useMatch } from "react-router-dom";

type NavButtonProps = {
  to: string;
  end?: boolean;
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
  icon,
  children,
  to,
  end
}: NavButtonProps) => {
  const isSelected = !!useMatch(`${to}${end ? "" : "*"}`)

  return (
    <Button
      as={Link}
      to={to}
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
