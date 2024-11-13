"use client"
import { useState } from 'react';
import "../app/globals.css";
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
    
      const response = await fetch('/api/users');
      if(!response.ok){
        console.log(response.status)
      }

      const users: User[] = await response.json(); 

      const user = users.find((user: User) => user.email === email && user.password === password);

      if (user) {
        alert('Login bem-sucedido!');
      } else {
        setErrorMessage('Email ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setErrorMessage('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
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
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Entre com a sua senha"
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2"/>
            <label htmlFor="remember" className="text-sm">Lembrar usuário?</label>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button type="submit" className="bg-red-500 text-white font-bold py-2 rounded-md hover:bg-red-600 transition">
            ENTRAR
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Não possui credenciamento? <Link href="/register" className="text-red-500 font-bold">CRIAR CONTA</Link>
        </p>
      </div>
    </div>
  );
}
