import { useEffect, useRef,useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Placeholder from "@tiptap/extension-placeholder";
import socket from "../../socket/socket";

function TipTapEditor({ documentId,content, onSave,onContentChange,aiInsertText, }) {
  const [saveStatus, setSaveStatus] = useState("Saved");
  const isRemoteUpdate = useRef(false);
  const editor = useEditor({
    extensions: [
    StarterKit,
    Placeholder.configure({
        placeholder: "Start writing your document...",
    }),
    ],
    content: content || "",
  });

  useEffect(() => {
    if (!editor) return;

    if (content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [editor, content]);

  useEffect(() => {
    if (!editor) return;

    const updateHandler = () => {
    const html = editor.getHTML();
    const text = editor.getText();
    onContentChange?.(text);
    setSaveStatus("Saving...");

    if (!isRemoteUpdate.current) {
    socket.emit("editor-update", {
        documentId,
        content: html,
    });
    }
    isRemoteUpdate.current = false;

    clearTimeout(window.autoSaveTimer);

    window.autoSaveTimer = setTimeout(() => {
        onSave(html);
        setSaveStatus("✓ Saved");
    }, 2000);
    };

    editor.on("update", updateHandler);

    return () => {
      editor.off("update", updateHandler);
    };
  }, [documentId,editor, onSave,onContentChange]);
useEffect(() => {
  if (!editor) return;

  const handleReceiveUpdate = (newContent) => {
    if (newContent === editor.getHTML()) return;

    isRemoteUpdate.current = true;

    editor.commands.setContent(newContent, false);
  };

  socket.on("receive-editor-update", handleReceiveUpdate);

  return () => {
    socket.off("receive-editor-update", handleReceiveUpdate);
  };
}, [editor]);
useEffect(() => {
  if (!editor) return;
  if (!aiInsertText) return;

  editor
    .chain()
    .focus()
    .insertContent(`\n\n${aiInsertText}`)
    .run();

}, [aiInsertText, editor]);
  if (!editor) return null;

  return (
  <div>

    

    <div
      className="
        flex
        flex-wrap
        items-center
        gap-2
        bg-[#141b2d]
        border
        border-slate-700
        rounded-2xl
        p-4
        mb-5
        shadow-lg
      "
    >

   

      <button
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
        className={`px-4 py-2 rounded-lg transition ${
          editor.isActive("bold")
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        <b>B</b>
      </button>

      

      <button
        onClick={() =>
          editor.chain().focus().toggleItalic().run()
        }
        className={`px-4 py-2 rounded-lg transition ${
          editor.isActive("italic")
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        <i>I</i>
      </button>

      

      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`px-4 py-2 rounded-lg transition ${
          editor.isActive("heading", { level: 1 })
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        H1
      </button>

      

      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`px-4 py-2 rounded-lg transition ${
          editor.isActive("heading", { level: 2 })
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        H2
      </button>

     

      <button
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className={`px-4 py-2 rounded-lg transition ${
          editor.isActive("bulletList")
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        • List
      </button>

     

      <button
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
        className={`px-4 py-2 rounded-lg transition ${
          editor.isActive("orderedList")
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        1. List
      </button>

     

      <button
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
        className={`px-4 py-2 rounded-lg transition ${
          editor.isActive("blockquote")
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        Quote
      </button>

     

      <button
        onClick={() =>
          editor.chain().focus().toggleCodeBlock().run()
        }
        className={`px-4 py-2 rounded-lg transition ${
          editor.isActive("codeBlock")
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        {"</>"}
      </button>

      

      <button
        onClick={() =>
          editor.chain().focus().undo().run()
        }
        className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
      >
        ↶
      </button>

     

      <button
        onClick={() =>
          editor.chain().focus().redo().run()
        }
        className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
      >
        ↷
      </button>

     

      <div className="ml-auto">

        <span
          className="
            px-4
            py-2
            rounded-full
            bg-green-900/40
            text-green-400
            text-sm
            font-semibold
          "
        >
          {saveStatus}
        </span>

      </div>

    </div>

   

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-300
        shadow-xl
        min-h-[700px]
        p-10
      "
    >
      <EditorContent editor={editor} />
    </div>

  </div>
);
}

export default TipTapEditor;