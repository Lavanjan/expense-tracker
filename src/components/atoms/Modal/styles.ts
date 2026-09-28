import styled from "styled-components";

export const Dialog = styled.dialog`
  width: min(92vw, 450px);
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius};
  ::backdrop {
    background-color: rgba(255, 0, 0, 0.5);
  }
  border: none;
`;
