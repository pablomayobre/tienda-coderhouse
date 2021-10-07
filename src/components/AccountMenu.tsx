import { MdAccountCircle, MdShoppingBasket, MdSettings } from "react-icons/md";
import {
  Text,
  Icon,
  Avatar,
  Menu,
  MenuItem,
  MenuDivider,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useIsSignedIn, useSignIn, useSignOut } from "../api/auth";
import { User } from "firebase/auth";
import { useUser } from "reactfire";
import { useAvatar } from "../api/useAvatar";

const AccountMenu = () => {
  const signOut = useSignOut();
  const { data: user } = useUser();
  const avatar = useAvatar()

  return (
    <Menu gutter={16}>
      <MenuButton as={Avatar} src={avatar} cursor="pointer" size="md"></MenuButton>
      <MenuList>
        <Text padding="0.4rem 0.8rem">
          Sesión iniciada como <strong>{(user as User).displayName}</strong>
        </Text>
        <MenuDivider />
        <MenuItem
          as={Link}
          to="/user/orders"
          iconSpacing={1}
          icon={<Icon as={MdShoppingBasket} size={5} />}
        >
          Mis Ordenes
        </MenuItem>
        <MenuItem
          as={Link}
          to="/user/settings"
          iconSpacing={1}
          icon={<Icon as={MdSettings} size={5} />}
        >
          Configuración
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => signOut()}>Cerrar Sesión</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const LogInButton = ({ isFullWidth }: { isFullWidth?: boolean }) => {
  const signIn = useSignIn();
  const isSignedIn = useIsSignedIn();

  return isSignedIn ? null : (
    <Button
      sx={
        isFullWidth
          ? {
              borderRadius: 0,
              justifyContent: "left",
              paddingLeft: 10,
            }
          : undefined
      }
      leftIcon={<Icon as={MdAccountCircle} size={5} />}
      iconSpacing={1}
      position="relative"
      colorScheme="purple"
      variant="ghost"
      onClick={() => signIn()}
    >
      Iniciar Sesión
    </Button>
  );
};

export const Account = () => {
  const isSignedIn = useIsSignedIn();
  return isSignedIn ? <AccountMenu/> : null;
};
