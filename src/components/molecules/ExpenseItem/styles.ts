import styled from "styled-components";

export const List = styled.li`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 10px;
`;

export const Info = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SubTitle = styled.div`
  font-size: 12px;
`;

export const Amount = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 6px;
`;
