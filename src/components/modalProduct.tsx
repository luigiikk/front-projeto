import { useState } from "react";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  name: string;
  description: string;
  imagePath: string;
  price: number;
  category: string;
  categoryName?: string; 
}

interface ModalProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  categories: Category[]; // Adicionando categorias como prop
}

export default function ModalProduto({
  isOpen,
  onClose,
  product,
  categories, // Novo parâmetro
}: ModalProdutoProps) {
  if (!isOpen || !product) return null;

  // Encontrar a categoria do produto
  const productCategory = categories.find(
    (category) => category._id === product.category
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-96 p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <img
            src={`/images/${product.imagePath}`}
            alt={product.name}
            className="w-48 h-48 object-cover mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          
          {/* Adicionar informações de categoria */}
          <p className="text-sm text-gray-600 mb-2">
            Categoria: {productCategory?.name || product.category}
          </p>
          
          <p className="text-gray-700 text-center mb-4">
            {product.description}
          </p>
          
          <p className="text-2xl font-bold text-red-500 mb-4">
            R$ {product.price.toFixed(2)}
          </p>
          
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}