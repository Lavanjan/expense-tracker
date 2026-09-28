import styled from "styled-components";

export const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  padding: 40px 0;
`;

export const Card = styled.ul`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
