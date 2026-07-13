import { useNavigate } from "react-router-dom";
import { FileText, Clock, ArrowRight } from "lucide-react";

function DocumentCard({ document }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-[#141b2d]
        border
        border-slate-700
        rounded-2xl
        p-6
        shadow-lg
        hover:shadow-blue-500/20
        hover:border-blue-500
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* Document Icon & Title */}

      <div className="flex items-center gap-3 mb-4">

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            flex
            items-center
            justify-center
            shadow-lg
          "
        >
          <FileText
            size={22}
            className="text-white"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            {document.title}
          </h2>

          <p className="text-sm text-slate-400">
            Collaborative Document
          </p>
        </div>

      </div>

      {/* Last Updated */}

      <div className="flex items-center gap-2 text-slate-400 mb-6">

        <Clock size={16} />

        <span className="text-sm">
          Updated{" "}
          {new Date(
            document.updatedAt
          ).toLocaleDateString()}
        </span>

      </div>

      {/* Button */}

      <button
        onClick={() =>
          navigate(`/documents/${document.id}`)
        }
        className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          py-3
          rounded-xl
          font-semibold
          text-white
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          hover:from-blue-700
          hover:to-indigo-700
          transition
          shadow-lg
        "
      >
        Open Document

        <ArrowRight size={18} />

      </button>

    </div>
  );
}

export default DocumentCard;