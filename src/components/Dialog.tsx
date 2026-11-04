import type { KeyboardEventHandler, ReactNode } from "react";
import { useDialog } from "../hooks/useDialog";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  className: string;
  "aria-labelledby": string;
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
  children: ReactNode;
}

export default function Dialog({
  open,
  onClose,
  children,
  ...props
}: DialogProps) {
  const ref = useDialog(open);
  return (
    <dialog
      {...props}
      ref={ref}
      onClose={() => {
        if (open) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
