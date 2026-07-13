import { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import useCreateDocument from "../../hooks/useCreateDocument";

function CreateDocumentModal({
  workspaceId,
  isOpen,
  onClose,
}) {
  const [title, setTitle] = useState("");

  const mutation =
    useCreateDocument(workspaceId);

  if (!isOpen) return null;

  const handleSubmit = () => {
    mutation.mutate(title);

    setTitle("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-[#1f2937] border border-slate-700 shadow-2xl rounded-xl p-6 w-96">

        <h2 className="text-2xl font-bold mb-5">
          Create Document
        </h2>

        <Input
          type="text"
          placeholder="Document Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <div className="flex gap-3 mt-5">

          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            Create
          </Button>

        </div>

      </div>

    </div>
  );
}

export default CreateDocumentModal;