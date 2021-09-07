import { LinkBox, LinkOverlay, Heading } from "@chakra-ui/react";
import "@fontsource/bebas-neue";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <LinkBox>
      <Heading
        color="purple.500"
        as="h1"
        fontSize="1.5rem"
        fontFamily="Bebas Neue"
      >
        <LinkOverlay as={Link} to="/">
          Rulos Artísticos
        </LinkOverlay>
      </Heading>
    </LinkBox>
  );
};
