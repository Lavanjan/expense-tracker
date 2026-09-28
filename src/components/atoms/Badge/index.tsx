import styled from "styled-components";

type Props = { $variant: "success" | "warning" | "danger" };

export const Badge = styled.span<Props>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ theme, $variant = "success" }) => theme.colors[$variant]}1f;
  color: ${({ theme, $variant = "success" }) => theme.colors[$variant]};
`;
