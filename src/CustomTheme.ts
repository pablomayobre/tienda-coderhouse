import { ChakraTheme } from "@chakra-ui/react";
import { GlobalStyleProps } from "@chakra-ui/theme-tools";

const space = {
  header: '3.5rem'
}

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      margin: 0,
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif`,
      // -webkit-font-smoothing: "antialiased";
      // -moz-osx-font-smoothing: "grayscale";
      bg: "purple.50",
    },
  }),
}

export const CustomTheme: Partial<ChakraTheme> = {
  styles,
  space,
  sizes: space
}