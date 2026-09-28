import styled from "styled-components";

export const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
`;
