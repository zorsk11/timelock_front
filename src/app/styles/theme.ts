import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const styles = {
  global: {
    body: {
      bg: "fillSecondaryLight",
      color: "primary",
    },
  },
};

const colors = {
  black: "#9D8888",
  white: "#FFFFFF",
  primaryLight: "#1E1E1E",
  secondaryLight: "#FFFFFF",

  greyLight: "#EEEEEE",
  grey2Light: "#D1D1D6",
  grey3Light: "#C7C7CC",
  grey4Light: "#AEAEB2",
  grey5Light: "#8E8E93",

  blue: {
    100: "#EDF2FD",
    200: "#C8D9F8",
    300: "#91B3F2",
    400: "#4781E9",
    500: "#3967BA",
  },

  fillPrimaryLight: "#FFFFFF",
  fillSecondaryLight: "#F5F5F5",
  fillTertiaryLight: "#DCE4F2",
  fillQuaternaryLight: "#313131",

  primaryDark: "#FFFFFF",
  secondaryDark: "#1E1E1E",

  greyDark: "#828282",
  grey2Dark: "#6B6B6B",
  grey3Dark: "#5B5B5B",
  grey4Dark: "#3F3F3F",
  grey5Dark: "#8E8E93",

  fillPrimaryDark: "#1E1E1E",
  fillSecondaryDark: "#0F0F0F",
  fillTertiaryDark: "#DCE4F2",
  fillQuaternaryDark: "#0F0F0F",
};

const textStyles = {
  largeTitle: {
    fontWeight: "400",
    fontSize: "34px",
    lineHeight: "1.2",
  },
  title1: {
    fontWeight: "500",
    fontSize: "28px",
    lineHeight: "1.2",
  },
  title2: {
    fontWeight: "400",
    fontSize: "22px",
    lineHeight: "1.2",
  },
  title3: {
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "1.2",
  },
  headline: {
    fontWeight: "600",
    fontSize: "17px",
    lineHeight: "1.2",
  },
  body: {
    fontWeight: "400",
    fontSize: "17px",
    lineHeight: "1.2",
  },
  callout: {
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "1.2",
  },
  subheadline: {
    fontWeight: "400",
    fontSize: "15px",
    lineHeight: "1.2",
  },
  footnote: {
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "1.2",
  },
  caption1: {
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1.2",
  },
  caption2: {
    fontWeight: "400",
    fontSize: "11px",
    lineHeight: "1.2",
  },
  caption3: {
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "1.2",
  },
  tab: {
    fontWeight: "500",
    fontSize: "10px",
    lineHeight: "1.2",
  },
};

const components = {
  Button: {
    variants: {
      navbar: {
        bg: "blue.100",
        padding: "18px",
        gap: "8px",
        borderRadius: "12px",
        fontWeight: "normal",
        fontSize: "17px",
        lineHeight: "120%",
        _hover: {
          bg: "blues.200",
        },
        _active: {
          bg: "blues.300",
        },
      },
      auth: {
        bg: "blue.400",
        paddingX: "32px",
        paddingY: "24px",
        borderRadius: "12px",
        fontWeight: "medium",
        fontSize: "22px",
        lineHeight: "120%",
        minHeight: "65px",
        textColor: "white",
        _hover: {
          bg: "blues.200",
        },
      },
      default: {
        bg: "white",
        textAlign: "left",
        paddingX: "32px",
        paddingY: "24px",
        borderRadius: "12px",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "120%",
        minHeight: "65px",
        _hover: {
          bg: "gray.100",
        },
      },
    },
  },
  Input: {
    variants: {
      auth: {
        field: {
          bg: "fillSecondaryLight",
          paddingX: "32px",
          paddingY: "24px",
          borderRadius: "12px",
          fontWeight: "normal",
          fontSize: "20px",
          lineHeight: "120%",
          minHeight: "65px",
        },
      },
      default: {
        field: {
          bg: "white",
          paddingX: "32px",
          paddingY: "24px",
          borderRadius: "12px",
          fontWeight: "normal",
          fontSize: "20px",
          lineHeight: "120%",
          minHeight: "65px",
        },
      },
    },
  },
  MenuButton: {
    variants: {
      default: {
        bg: "white",
        paddingX: "32px",
        paddingY: "24px",
        borderRadius: "12px",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "120%",
        minHeight: "65px",
        _hover: {
          bg: "gray.100",
        },
      },
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  colors,
  textStyles,
  components,
});

export default theme;
