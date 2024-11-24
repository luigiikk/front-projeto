import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onSelectCategory: (category: string) => void;
}

export default function Modal({
  isOpen,
  onClose,
  categories,
  onSelectCategory,
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Reseta ao desmontar
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-96 p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Impede fechamento ao clicar no modal
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          Escolha uma Categoria
        </h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => {
                onSelectCategory(category);
                onClose();
              }}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
            >
              {category}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
