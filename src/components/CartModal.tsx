import React from 'react';
import { Order, CartItem } from '../types/types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCreateOrder: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen, 
  onClose, 
  cart, 
  onRemove,
  onUpdateQuantity,
  onCreateOrder
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
        
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Seu carrinho está vazio</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between mb-4 border-b pb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => onRemove(item._id)}
                    className="ml-2 text-red-500"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-4 flex justify-between items-center">
              <strong>Total:</strong>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={onCreateOrder}
              className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600"
            >
              Finalizar Pedido
            </button>
          </>
        )}
        
        <button 
          onClick={onClose}
          className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default CartModal;