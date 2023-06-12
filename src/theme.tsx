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
          backgroundColor: "transparent",
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
        menu: {
          color: "#000",
          bg: "button",
          fontFamily: "Open Sans",
          px: "2",
          py: "0",
          w: "10rem",
          h: "3rem",
          fontSize: "lg",
        },
      },
    },
    Select: {
      variants: {
        admin: {
          field: {
            color: "primary",
            bgColor: "mainBackground",
            borderColor: "primary",
            borderWidth: "1px",
            fontFamily: "Montserrat",
            fontWeight: "700",
            _hover: {
              bgColor: "gray.200",
            },
          },
          icon: {
            fontSize: "2em",
            color: "primary",
          },
        },
      },
    },
    Accordion: {
      variants: {
        active: {
          root: {
            fontFamily: "Montserrat",
          },
          button: {
            color: "#252B42",
            fontWeight: "700",
            justifyContent: "space-between",
            bg: "white",
            py: "4",
            px: "8",
            _expanded: {
              color: "primary",
              borderLeftColor: "primary",
              borderLeftWidth: "3px",
              bg: "accordionBackground",
            },
          },
          container: {
            border: "1px solid #EBEBEB",
          },
          panel: {
            fontWeight: "500",
            display: "flex",
            flexDirection: "column",
            gap: "4",
            bg: "accordionBackground",
            px: "8",
          },
          icon: {
            border: "1px solid #D3D3D3",
            borderRadius: "50%",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            w: "9",
            h: "9",
            p: "2",
          },
        },
        archived: {
          root: {
            fontFamily: "Montserrat",
          },
          button: {
            color: "white",
            bg: "secondary",
            fontWeight: "700",
            justifyContent: "space-between",
            py: "4",
            px: "8",
            _expanded: {
              color: "primary",
              bg: "accordionBackground",
              borderLeftColor: "primary",
              borderLeftWidth: "3px",
            },
            _hover: {
              bg: "blue.600",
            },
          },
          container: {
            border: "1px solid #EBEBEB",
          },
          panel: {
            fontWeight: "500",
            bg: "accordionBackground",
            px: "8",
            mb: "8",
          },
          icon: {
            border: "1px solid #D3D3D3",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "50%",
            w: "9",
            h: "9",
            p: "2",
          },
        },
      },
    },
    Menu: {
      variants: {
        main: {
          button: {},
          list: {},
          item: {
            justifyContent: "space-evenly",
          },
          groupTitle: {},
          command: {},
          divider: {
            borderWidth: "2px",
          },
        },
      },
    },
    Text: {
      variants: {
        description: {
          maxH: "60",
          overflowY: "auto",
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
      accordionBackground: {
        default: "#F7F7F7",
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
