import "../app/globals.css";
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), 
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao tentar registrar:', error);
      setErrorMessage('Ocorreu um erro. Tente novamente mais tarde.');
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
              className="border rounded-md p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold" htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              className="border rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de Senha */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold" htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Crie sua senha"
              className="border rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button type="submit" className="bg-red-500 text-white font-bold py-2 rounded-md hover:bg-red-600 transition">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
