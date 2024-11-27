import { useEffect, useState } from "react";
import "../app/globals.css";
import Modal from "../components/modal";
import ModalPedidos from "../components/ModalPedidos";
import ModalProduto from "../components/modalProduct";

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

interface User {
  email: string;
  name?: string;
}

interface Pedido {
  id: string;
  items: string[];
  total: number;
  status: string;
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pedidosModalOpen, setPedidosModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      fetchUserInfo(token);
      fetchPedidos(token);
    }

    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch("http://localhost:5555/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
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
  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5555/categories/${categoryId}/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar produtos da categoria");
      }

      const data: Product[] = await response.json();
    } catch (error) {
      console.error("Erro ao carregar produtos da categoria:", error);
    }
  };

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5555/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    }
  };

  const fetchPedidos = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5555/user/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const pedidosData: Pedido[] = await response.json();
        setPedidos(pedidosData);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch("http://localhost:5555/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar produtos");
      }
      const data: Product[] = await response.json();

      const productsWithCategoryNames = data.map((product) => ({
        ...product,
      }));

      setProducts(productsWithCategoryNames);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );
  const clearFilter = () => {
    setSelectedCategory("");
    fetchProducts();
  };
  const userName = user?.name || user?.email?.split("@")[0] || "Usuário";

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <div className="flex items-center space-x-4 w-full m-2">
          <img
            src="/images/fire-red-dragon-logo-vector_10559616.png"
            alt=""
            className="w-20 h-20"
          />
          <input
            type="text"
            placeholder="Procurar"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-4 sm:">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Pedidos
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => setModalOpen(true)}
          >
            Categorias
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">{userName}</span>
          </div>
        </div>
      </header>

      <main className="mt-6">
        {(selectedCategory || searchTerm) && (
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {selectedCategory && (
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center space-x-2">
                  <span>
                    Categoria:{" "}
                    {categories.find((c) => c._id === selectedCategory)?.name}
                  </span>
                  <button
                    onClick={clearFilter}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
              )}

              {searchTerm && (
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2">
                  <span>Busca: {searchTerm}</span>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        categories={categories}
        onSelectCategory={(categoryId: string) => {
          setSelectedCategory(categoryId);
          fetchProductsByCategory(categoryId);
          setModalOpen(false);
        }}
      />
      <ModalPedidos
        isOpen={pedidosModalOpen}
        onClose={() => setPedidosModalOpen(false)}
        pedidos={pedidos}
      />
      <ModalProduto
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        product={selectedProduct}
        categories={categories} 
      />
    </div>
  );
}
