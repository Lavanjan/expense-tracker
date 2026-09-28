import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    bg: "#fffff",
    text: "#00000",
    primary: "#002366",
    danger: "#ff0505",
    success: "#198754",
    warning: "#ff9966",
    border: "#e5e7eb",
    white: "#ffff",
    card: "#fffff",
  },
  radius: "8px",
  buttonRadius: "100px",
};

export type Theme = typeof theme;

export const GlobalStyle = createGlobalStyle`
    body {
    margin:0;
    font-family: 'Poppins';
    background: ${(prop) => prop.theme.colors.bg};
    color:${(prop) => prop.theme.colors.text}
    }
`;
