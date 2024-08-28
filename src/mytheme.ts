import { extendTheme } from "@chakra-ui/react";

const myTheme = extendTheme({
  fonts: {
    heading: "Rajdhani, sans-serif",
    body: "Rajdhani, sans-serif",
  },
  colors: {
    vermelho: "#d50c20",
    vermelho_hover: "#e64051",
    fundo_cinza: "#F6F6F6",
    verde700: "#339c00",
    cinza: "gray",
    cinza_hover: "#E8E8E8",
    cinza_200: "#F0F0F0",
    cinza_600: "#ccc",
    cinza_700: "#C0C0C0",
    cinza_900: "#9D9D9D",
    cinza_920: "#909090",
    branco: "white",
    preto: "black",
  },
  breakpoints: {
    celular: "320px",
    media: "1000px",
    grande: "1600px",
  },
});

export default myTheme;