import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { AccountMenu } from "./AccountMenu";
import { Links } from "./Links";

export const NavBar = () => {
  return (
    <Box as="nav" w="100%" background="white" h="56px" position="fixed" top="0">
      <Flex
        maxWidth="1000px"
        alignItems="center"
        h="100%"
        gridGap={2}
        margin="0 auto"
        paddingLeft={4}
        paddingRight={4}
      >
        <Logo />
        <Spacer />
        <Links selected="store" />
        <AccountMenu user={{ name: "Usuario" }} />
      </Flex>
    </Box>
  );
};
