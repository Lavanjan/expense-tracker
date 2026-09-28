import { useEffect, useRef, type ReactNode } from "react";
import { Dialog } from "./styles";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ children, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    return () => {
      if (ref.current?.open) {
        ref.current.close();
      }
    };
  }, []);
  return (
    <Dialog ref={ref} onClose={onClose}>
      {children}
    </Dialog>
  );
}
