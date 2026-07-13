import { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";

import useCreateWorkspace from "../../hooks/useCreateWorkspace";

function CreateWorkspaceModal({

  isOpen,

  onClose,

}) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useCreateWorkspace();

  if (!isOpen) return null;

  const handleSubmit = () => {
  mutation.mutate(
    {
      name,
      description,
    },
    {
      onSuccess: () => {
        setName("");
        setDescription("");

        onClose();
      },
    }
  );
};

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-[#1f2937] border border-slate-700 shadow-2xl rounded-xl p-6 w-96">

        <h2 className="text-2xl font-bold mb-4">

          Create Workspace

        </h2>

        <Input

          type="text"

          placeholder="Workspace Name"

          value={name}

          onChange={(e)=>setName(e.target.value)}

        />

        <Input

          type="text"

          placeholder="Description"

          value={description}

          onChange={(e)=>setDescription(e.target.value)}

        />

        <div className="flex gap-3 mt-5">

          <Button onClick={onClose}>

            Cancel

          </Button>

          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? "Creating..."
              : "Create"}
          </Button>

        </div>

      </div>

    </div>

  );

}

export default CreateWorkspaceModal;