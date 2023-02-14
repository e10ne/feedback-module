import { extendTheme } from "@chakra-ui/react";

const fonts = {
  mono: `'Menlo', monospace`,
  body: `'Open Sans', sans-serif`,
  heading: `'Open Sans', sans-serif`,
};

const theme = extendTheme({
  components: {
    Alert: {
      variants: {
        solid: {
          container: {},
          title: {
            fontSize: "1.1rem",
          },
          icon: {
            my: "auto",
            mr: "2em",
          },
          description: {},
        },
      },
    },
  },
  semanticTokens: {
    colors: {
      mainBackground: {
        default: "#F3F4F6",
      },
      headerBackground: {
        default: "#416080",
      },
      button: {
        default: "#FAB63D",
      },
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },
      heroGradientStart: {
        default: "#7928CA",
        _dark: "#e3a7f9",
      },
      heroGradientEnd: {
        default: "#FF0080",
        _dark: "#fbec8f",
      },
    },
    radii: {
      button: "12px",
    },
  },
  colors: {
    black: "#16161D",
  },
  fonts,
});

export default theme;
