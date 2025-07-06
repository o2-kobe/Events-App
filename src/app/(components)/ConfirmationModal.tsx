import Modal from "./Modal";

interface ConfirmationModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  title: string;
  text: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmationModal({
  showModal,
  setShowModal,
  title,
  text,
  onConfirm,
  confirmText = "Yes",
  cancelText = "Cancel",
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <div className="p-2">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
        <p className="mb-6 text-gray-700">{text}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              setShowModal(false);
            }}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
