
interface Product {
    name: string;
    description: string;
    imagePath: string;
    price: number;
    category: string;
  }
  
  interface ModalProdutoProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
  }
  
  export default function ModalProduto({ isOpen, onClose, product }: ModalProdutoProps) {
    if (!isOpen || !product) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
          <button
            className="absolute top-3 right-3 text-red-500 font-bold"
            onClick={onClose}
          >
            X
          </button>
          <img
            src={`/images/${product.imagePath}`}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-500 mt-2">{product.category}</p>
          <p className="text-red-500 text-lg font-bold mt-4">
            R$ {product.price.toFixed(2)}
          </p>
          <button
            className="bg-red-500 text-white py-2 px-4 mt-4 w-full rounded-md hover:bg-red-600"
            onClick={() => alert("Produto adicionado ao carrinho!")}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }