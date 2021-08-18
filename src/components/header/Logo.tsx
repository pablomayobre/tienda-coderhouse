import { Box, Heading, Link } from "@chakra-ui/react";
import "@fontsource/bebas-neue";

export const Logo = () => {
  return (
    <Link href="#">
      <Box>
        <Heading
          color="purple.500"
          as="h1"
          fontSize="1.5rem"
          fontFamily="Bebas Neue"
        >
          Rulos Artísticos
        </Heading>
      </Box>
    </Link>
  );
};
