import { ChakraTheme, keyframes } from "@chakra-ui/react";
import { GlobalStyleProps, mode, getColor } from "@chakra-ui/theme-tools";

const space = {
  header: "3.5rem",
};

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      margin: 0,
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif`,
      transitionProperty: "",
      transitionDuration: "",
      // -webkit-font-smoothing: "antialiased";
      // -moz-osx-font-smoothing: "grayscale";
      bg: "purple.50",
    },

    ".chakra-skeleton": {
      border: "3px solid red",
    },
  }),
};

const fade = keyframes({
  from: { opacity: 0.7 },
  to: { opacity: 0 },
});

export const CustomTheme: Partial<ChakraTheme> = {
  styles,
  space,
  sizes: space,
  components: {
    Skeleton: {
      baseStyle: (props) => {
        const defaultStartColor = mode("purple.100", "gray.800")(props);
        const defaultEndColor = mode("gray.400", "gray.600")(props);

        const {
          startColor = defaultStartColor,
          endColor = defaultEndColor,
          speed,
          theme,
        } = props;

        const start = getColor(theme, startColor);
        const end = getColor(theme, endColor);

        return {
          opacity: 0.7,
          borderRadius: "2px",
          borderColor: getColor(theme, "gray.300"),
          borderWidth: 1,
          background: start,
          animation: "none",
          position: "relative",

          "&::before": {
            // Cover the whole div
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            // The default theme may take presedence ove this
            visibility: "visible!important",

            // Alternate opacity
            animation: `${speed}s linear infinite alternate ${fade}`,
            background: end,

            // Notify the browser that we want the GPU to animate this
            willChange: "transform",
            transform: "translateZ(0.0001px)",
          },
        };
      },
    },
  },
};
