import { Button } from "@/components/ui/Button";

type ModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Confirmation modal for destructive actions.
 */
export const Modal = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-ink-700">{title}</h2>
        <p className="mt-2 text-sm text-ink-600">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
