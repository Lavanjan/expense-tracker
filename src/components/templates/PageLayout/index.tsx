import type { ReactNode } from "react";
import { Container } from "./styles";

export function PageLayout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}
