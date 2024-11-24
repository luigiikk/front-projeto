import { useEffect } from "react";

interface Pedido {
  id: string;
  items: string[];
  total: number;
  status: string;
}

interface ModalPedidosProps {
  isOpen: boolean;
  onClose: () => void;
  pedidos: Pedido[];
}

export default function ModalPedidos({
  isOpen,
  onClose,
  pedidos,
}: ModalPedidosProps) {
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
        className="bg-white w-96 p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no modal
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          Meus Pedidos
        </h2>
        {pedidos.length === 0 ? (
          <p className="text-gray-500">Nenhum pedido encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {pedidos.map((pedido) => (
              <li
                key={pedido.id}
                className="p-4 border border-gray-200 rounded-md shadow-sm"
              >
                <h3 className="font-bold">Pedido #{pedido.id}</h3>
                <p className="text-sm text-gray-600">
                  Status: <span className="font-medium">{pedido.status}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Total: <span className="font-medium">R$ {pedido.total.toFixed(2)}</span>
                </p>
                <div className="mt-2">
                  <h4 className="text-sm font-semibold">Itens:</h4>
                  <ul className="text-sm list-disc pl-5 text-gray-600">
                    {pedido.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
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
