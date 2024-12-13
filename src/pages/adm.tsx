"use client";
import { useEffect, useState } from "react";
import "../app/globals.css";

interface OrderProduct {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  table: string;
  status: "WAITING" | "IN_PRODUCTION" | "DONE";
  createAt: string;
  user: string;
  total: number;
  products: OrderProduct[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const response = await fetch("http://localhost:5555/orders", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar pedidos");
      }

      const data: Order[] = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const changeOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5555/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status do pedido");
      }

      // Atualiza o status do pedido localmente
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Não foi possível atualizar o status do pedido");
    }
  };

  const filteredOrders = orders.filter((order) => {
    // Converte o termo de busca para minúsculas
    const searchTermLower = searchTerm.toLowerCase();
    
    // Verifica se o termo de busca corresponde ao ID do pedido ou ao número da mesa
    return (
      order._id.toLowerCase().includes(searchTermLower) || 
      order.table.toLowerCase().includes(searchTermLower)
    );
  });

  const calculateTotal = (products: OrderProduct[]) => {
    return products.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'WAITING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PRODUCTION': return 'bg-blue-100 text-blue-800';
      case 'DONE': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    switch(currentStatus) {
      case 'WAITING': return 'IN_PRODUCTION';
      case 'IN_PRODUCTION': return 'DONE';
      case 'DONE': return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pedidos</h1>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Buscar por ID do pedido ou número do pedido" 
          className="w-full px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500">Nenhum pedido encontrado</div>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map((order) => (
            <div 
              key={order._id} 
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {order.table}
                  </h2>
                  <p className="text-gray-600">
                    ID: {order._id} - {formatDate(order.createAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status === 'WAITING' ? 'Aguardando' : 
                     order.status === 'IN_PRODUCTION' ? 'Em Produção' : 
                     'Finalizado'}
                  </span>
                  {getNextStatus(order.status) && (
                    <button 
                      onClick={() => {
                        const nextStatus = getNextStatus(order.status);
                        if (nextStatus) {
                          changeOrderStatus(order._id, nextStatus);
                        }
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition"
                    >
                      Avançar Status
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Produtos:</h3>
                <div className="space-y-2">
                  {order.products.map((item) => (
                    <div 
                      key={item.product._id} 
                      className="flex justify-between"
                    >
                      <span>{item.product.name}</span>
                      <span>{item.quantity}x R$ {item.product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {calculateTotal(order.products).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}