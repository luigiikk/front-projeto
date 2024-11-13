import "../app/globals.css";

export default function Productos() {
    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-red-500 text-white rounded-md">
              <span className="material-icons">menu</span>
            </button>
            <input
              type="text"
              placeholder="Procurar"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500"
            />
          </div>
  
          <div className="flex space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Pedidos</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Categorias</button>
            <div className="flex items-center space-x-2">
              <span>Leoman</span>
            </div>
          </div>
        </header>
  
        {/*produtos */}
        <main className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Produtos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* card de cada */}
            <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
              <img src="/images/relogio.jpg" alt="Relógio Digital" className="w-32 h-32 object-cover mb-4" />
              <h3 className="font-semibold text-lg">Relógio Digital</h3>
              <p className="text-sm text-gray-500">(450/500)</p>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`material-icons ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}>
                    star
                  </span>
                ))}
              </div>
              <p className="text-xl font-bold text-red-500">R$ 139,99</p>
              <button className="bg-red-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-red-600">
                Comprar Agora
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  