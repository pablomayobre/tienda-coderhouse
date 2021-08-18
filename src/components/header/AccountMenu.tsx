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
} from "@chakra-ui/react";
import { NavButton } from "./NavButton";

export type User = {
  name: string;
  avatarUrl?: string;
};

type AccountMenuProps = {
  user?: User;
  isFullWidth?: boolean;
};

export const AccountMenu = ({ user, isFullWidth }: AccountMenuProps) => {
  if (user) {
    return (
      <Menu gutter={16}>
        <MenuButton as={Avatar} cursor="pointer" size="sm"></MenuButton>
        <MenuList>
          <Text padding="0.4rem 0.8rem">
            Sesión iniciada como <strong>Usuario</strong>
          </Text>
          <MenuDivider />
          <MenuItem
            iconSpacing={1}
            icon={<Icon as={MdShoppingBasket} size={5} />}
          >
            Ver Compras
          </MenuItem>
          <MenuItem iconSpacing={1} icon={<Icon as={MdSettings} size={5} />}>
            Configuración
          </MenuItem>
          <MenuDivider />
          <MenuItem>Cerrar Sesión</MenuItem>
        </MenuList>
      </Menu>
    );
  } else {
    return (
      <NavButton icon={MdAccountCircle} isFullWidth={isFullWidth}>
        Iniciar Sesión
      </NavButton>
    );
  }
};
