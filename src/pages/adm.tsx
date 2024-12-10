import { useEffect, useState } from "react";
import "../app/globals.css";
import ModalProduto from "../components/modalProduct";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  category: string;
  categoryName?: string;
}

export default function AdminProductos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5555/categories", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar categorias");
      }

      const categoriesData: Category[] = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5555/products", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar produtos");
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center space-x-4 w-full m-2">
          <img
            src="/images/fire-red-dragon-logo-vector_10559616.png"
            alt="Logo"
            className="w-20 h-20"
          />
          <input
            type="text"
            placeholder="Procurar"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="text-lg font-bold">Admin</span>
        </div>
      </header>

      <main className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Produtos</h2>
        {loading ? (
          <div className="text-center py-8">Carregando produtos...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center"
              >
                <img
                  src={`/images/${product.imagePath}`}
                  alt={product.name}
                  className="w-32 h-32 object-cover mb-4"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  {categories.find((c) => c._id === product.category)?.name ||
                    product.category}
                </p>
                <p className="text-sm text-gray-600 text-center mb-2">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-red-500">
                  R$ {product.price.toFixed(2)}
                </p>
                <button
                  className="bg-red-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-red-600"
                  onClick={() => {
                    setSelectedProduct(product);
                    setProductModalOpen(true);
                  }}
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <ModalProduto
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        product={selectedProduct}
        categories={categories}
      />
    </div>
  );
}
