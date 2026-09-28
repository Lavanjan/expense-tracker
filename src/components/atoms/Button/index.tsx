import styled from "styled-components";

type Props = { $variant?: "primary" | "danger" };

export const Button = styled.button<Props>`
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.buttonRadius};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === "primary" ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $variant }) =>
    $variant === "primary" ? theme.colors.primary : "transparent"};
  color: ${({ theme, $variant }) =>
    $variant === "primary"
      ? theme.colors.white
      : $variant === "danger"
        ? theme.colors.danger
        : theme.colors.text};

  font-weight: 500;
  cursor: pointer;
  font-family: "Poppins";
`;
