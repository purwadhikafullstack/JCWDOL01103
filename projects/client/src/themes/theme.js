import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        // bg: "",
      },
    },
  },
  colors: {
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    // thirdColor: ,
    // forthColor: ,
    // negativeColor: ,
    blackColor: "black",
  },
  fonts: {
    body: `'Plus Jakarta Sans', sans-serif`,
    heading: `'Plus Jakarta Sans', sans-serif`,
  },
});
