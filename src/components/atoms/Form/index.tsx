import { type ReactNode } from "react";
import { BaseForm } from "./styles";

type Props = {
  children: ReactNode;
  onSubmit: any;
};

export function Form({ children, onSubmit }: Props) {
  return <BaseForm onSubmit={onSubmit}>{children}</BaseForm>;
}
