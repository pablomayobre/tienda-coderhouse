import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { NavBar } from "./NavBar";

export const Header = () => {
  return (
    <Box
      as="header"
      w="100%"
      background="white"
      h="56px"
      position="fixed"
      top="0"
    >
      <Flex
        maxWidth="1000px"
        alignItems="center"
        gridGap={2}
        h="100%"
        margin="0 auto"
        paddingLeft={4}
        paddingRight={4}
      >
        <Logo />
        <Spacer />
        <NavBar selected="store" />
      </Flex>
    </Box>
  );
};
