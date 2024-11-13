import "../app/globals.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5555/users', {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, password }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Erro: ${response.status}`);
      }

      setName('');
      setEmail('');
      setPassword('');
      
      alert('Usuário registrado com sucesso!');
      router.push('/login');

      
    } catch (error) {
      console.error('Erro ao tentar registrar:', error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Ocorreu um erro. Tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Criar Conta</h1>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold" htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Digite seu nome"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold" htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Crie sua senha"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              minLength={6}
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{errorMessage}</p>
          )}

          <button 
            type="submit" 
            className={`
              bg-red-500 text-white font-bold py-2 rounded-md
              hover:bg-red-600 transition
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center
            `}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Registrando...
              </>
            ) : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
}