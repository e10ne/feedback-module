import { extendTheme } from "@chakra-ui/react";

const fonts = {
  mono: `'Menlo', monospace`,
  body: `'Open Sans', sans-serif`,
  heading: `'Open Sans', sans-serif`,
  montserrat: `'Montserrat', sans-serif`,
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
    Heading: {
      variants: {
        pageHeader: {
          my: "8",
          fontSize: "30px",
        },
        subHeader: {
          fontSize: "26px",
          fontWeight: "600",
          my: "8",
        },
      },
    },
    Button: {
      variants: {
        admin: {
          backgroundColor: "mainBackground",
          borderColor: "primary",
          borderWidth: "1px",
          color: "primary",
          fontFamily: "Montserrat",
          fontWeight: "700",
          p: "1.5rem",
          _hover: {
            bgColor: "gray.200",
          },
        },
      },
    },
  },
  semanticTokens: {
    colors: {
      primary: {
        default: "#416080",
      },
      secondary: {
        default: "#5D8EBF",
      },
      modalConfirm: {
        default: "#5F8EBE",
      },
      modalCancel: {
        default: "#E56A6A",
      },
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
    adminWhite: "#F9F9F9",
  },
  fonts,
});

export default theme;
