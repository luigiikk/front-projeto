"use client"
import { useState } from 'react';
import "../app/globals.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  message?: string;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email, 
          password,
          rememberMe 
        })
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

   
      if (data.token) {
       
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        
        router.push('/product');
      }

    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Credenciais inválidas ou servidor indisponível.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">
          Seja <span className="text-red-600">Bem vindo!</span>
        </h1>
        <p className="text-gray-600">Faça login para começar</p>
        
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold" htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Entre com o seu e-mail"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold" htmlFor="password">Senha</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Entre com a sua senha"
                className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="remember" className="text-sm cursor-pointer">
                Lembrar usuário?
              </label>
            </div>
            <Link 
              href="/forgot-password" 
              className="text-sm text-red-500 hover:text-red-600 transition"
            >
              Esqueceu a senha?
            </Link>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">
              {errorMessage}
            </div>
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
                Entrando...
              </>
            ) : 'ENTRAR'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Não possui credenciamento?{' '}
          <Link 
            href="/register" 
            className="text-red-500 font-bold hover:text-red-600 transition"
          >
            CRIAR CONTA
          </Link>
        </p>
      </div>
    </div>
  );
}