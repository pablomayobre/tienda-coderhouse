import { Box, Flex, Progress, Spacer } from "@chakra-ui/react";
import { useIsLoading } from "../api";
import { Logo } from "./Logo";

export const Header = ({children}: {children?: React.ReactNode}) => {
  const isLoading = useIsLoading();

  return (
    <Box
      as="header"
      w="100%"
      background="white"
      h="header"
      position="fixed"
      top="0"
      shadow="md"
      zIndex={1000}
    >
      <Flex
        maxWidth="container.lg"
        alignItems="center"
        gridGap={2}
        h="100%"
        margin="0 auto"
        paddingLeft={4}
        paddingRight={4}
      >
        <Logo />
        <Spacer />
        {children}
      </Flex>
      <Progress size="xs" value={isLoading ? undefined : 0} />
    </Box>
  );
};
