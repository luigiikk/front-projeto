interface Product {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  category: string;
}

interface OrderItem {
  product: string | Product;  
  quantity: number;
}

interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  createAt: Date;
  products: OrderItem[];
  total: number;
}

interface ModalPedidosProps {
  isOpen: boolean;
  onClose: () => void;
  pedidos: Order[];
  products: Product[];
}

const ModalPedidos: React.FC<ModalPedidosProps> = ({ 
  isOpen, 
  onClose, 
  pedidos,
  products
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Meus Pedidos</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>
        
        {pedidos.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum pedido encontrado</p>
        ) : (
          <div>
            {pedidos.map((pedido) => (
              <div 
                key={pedido._id} 
                className="border-b py-4"
              >
                <div className="flex justify-between">
                  <span className="font-medium">Pedido #{pedido._id}</span>
                  <span 
                    className={`
                      px-2 py-1 rounded-full text-sm 
                      ${pedido.status === 'WAITING' ? 'bg-yellow-100 text-yellow-800' : 
                        pedido.status === 'IN_PRODUCTION' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}
                  >
                    {pedido.status === 'WAITING' ? 'Aguardando' : 
                     pedido.status === 'IN_PRODUCTION' ? 'Em Produção' : 
                     'Concluído'}
                  </span>
                </div>
                <div className="mt-2">
                <p>Total: R$ {(pedido.total || 0).toFixed(2)}</p>
                  <div className="text-sm text-gray-600">
                  {pedido.products.map((item) => {
  // Verifica se é uma string ou um objeto Product
  const productId = typeof item.product === 'string' 
    ? item.product 
    : item.product._id;
  
  const product = products.find(p => p._id === productId);

  return (
    <div key={productId}>
      {product?.name || 'Produto não encontrado'} (x{item.quantity})
    </div>
  );
})}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalPedidos;