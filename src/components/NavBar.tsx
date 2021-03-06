import {
  IconButton,
  Icon,
  Button,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Spacer,
  VisuallyHidden,
  useDisclosure,
  useBreakpointValue,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdMenu, MdStore } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { SearchBar } from "./SearchBar";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";
import { Account, LogInButton } from "./AccountMenu";
import { CartWidget } from "./CartWidget";
import { Categories } from "./Categories";

const links = [
  {
    key: "store",
    text: "Tienda",
    link: "/",
    end: true,
    icon: MdStore,
  } as const,
];

export type LinkProps = {
  isDisabled?: boolean;
};

const NavDrawer = ({ isDisabled }: LinkProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="purple"
        onClick={onOpen}
        aria-label="Open navigation"
        order={-1}
        variant="ghost"
        icon={<Icon as={MdMenu} size={5} />}
      />
      <Spacer order={-1} />
      {isOpen ? (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <Logo />
            </DrawerHeader>
            <DrawerCloseButton onClick={onClose} />

            <DrawerBody>
              <SearchBar />
              <Flex
                as="nav"
                width="calc(100% + var(--chakra-space-6) * 2)"
                marginLeft={-6}
                marginRight={-6}
                gridGap={2}
                paddingTop={4}
                paddingBottom={4}
                flexDirection="column"
              >
                <Divider
                  marginBottom={2}
                  marginLeft={4}
                  marginRight={4}
                  w="initial"
                />

                {links.map((item, index) => {
                  return (
                    <NavButton
                      key={`nav${index}-${item.key}`}
                      isFullWidth
                      icon={item.icon}
                      to={item.link}
                      end={item.end}
                    >
                      {item.text}
                    </NavButton>
                  );
                })}

                <Divider
                  marginBottom={2}
                  marginLeft={4}
                  marginRight={4}
                  w="initial"
                />

                <Categories
                  showAll={false}
                  borderRadius={0}
                  justifyContent="left"
                  paddingLeft={10}
                />

                <Divider
                  marginBottom={2}
                  marginLeft={4}
                  marginRight={4}
                  w="initial"
                />
                {isDisabled ? null : <LogInButton isFullWidth />}
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Button
                as="a"
                href="https://instagram.com/rulos.artisticos"
                target="_blank"
                bg={
                  "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
                }
                _hover={{
                  bg: "linear-gradient(45deg, rgba(159,106,52,1) 0%, rgba(156,71,41,1) 25%, rgba(128,41,55,1) 50%, rgba(40,46,73,1) 75%, rgba(83,23,63,1) 100%)",
                }}
                colorScheme="purple"
                leftIcon={<FaInstagram />}
              >
                <VisuallyHidden>Follow on Instagram @</VisuallyHidden>
                rulos.artisticos
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : null}
      <CartWidget isFloating />
      {isDisabled ? <Avatar size="md" /> : <Account />}
    </>
  );
};

const NavButtons = ({ isDisabled }: LinkProps) => {
  return (
    <>
      <SearchBar />
      <Spacer />
      <Flex as="nav" alignItems="center" gridGap={2}>
        {links.map((item, index) => {
          return (
            <NavButton
              key={`nav${index}-${item.key}`}
              icon={item.icon}
              to={item.link}
              end={item.end}
            >
              {item.text}
            </NavButton>
          );
        })}
        <CartWidget />
        {isDisabled ? (
          <Avatar size="md" />
        ) : (
          <>
            <LogInButton />
            <Account />
          </>
        )}
      </Flex>
    </>
  );
};

export const NavBar = (props: LinkProps) => {
  const menu = useBreakpointValue({ base: "drawer", md: "buttons" });

  if (menu === "drawer") {
    return <NavDrawer {...props} />;
  } else {
    return <NavButtons {...props} />;
  }
};
