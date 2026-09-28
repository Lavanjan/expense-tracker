import { type ReactNode } from "react";
import { Wrapper, Error } from "./style";

type Props = {
  label: string;
  children: ReactNode;
  error?: string;
};

export default function FormField({ label, children, error }: Props) {
  return (
    <Wrapper>
      {label}
      {children}
      {error && <Error role="alert">{error} </Error>}
    </Wrapper>
  );
}
