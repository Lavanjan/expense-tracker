import styled, { css } from "styled-components";

const fieldStyle = css`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.white};
  font-family: "Poppins";
  margin-bottom: 10px;
`;

export const Input = styled.input`
  ${fieldStyle}
`;
export const Select = styled.select`
  ${fieldStyle}
`;
export const TextArea = styled.textarea`
  ${fieldStyle}
`;
