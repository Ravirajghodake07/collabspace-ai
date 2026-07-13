function DeleteDocumentModal({
  isOpen,
  onClose,
  onDelete,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-96">

        <h2 className="text-xl font-bold">
          Delete Document
        </h2>

        <p className="mt-3">
          Are you sure you want to delete this document?
        </p>

        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white rounded-lg py-2"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteDocumentModal;