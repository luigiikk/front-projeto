"use client";
import "../app/globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5555/users", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Erro: ${response.status}`);
      }

      router.push("/login");
    } catch (error) {
      console.error("Erro ao tentar registrar:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6 sm:p-8 space-y-6 transform transition-all duration-300 hover:shadow-2xl">

        <div className="flex justify-center mb-6">
          <img
            src="/images/fire-red-dragon-logo-vector_10559616.png"
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Criar <span className="text-red-600">Conta</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Preencha os dados para se registrar
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">

          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="name"
            >
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              placeholder="Digite seu nome completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="password"
            >
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Crie sua senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordStrength(e.target.value);
                }}
                disabled={loading}
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex gap-1 mt-1">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index < passwordStrength
                      ? [
                          "bg-red-500",
                          "bg-orange-500",
                          "bg-yellow-500",
                          "bg-green-500",
                        ][passwordStrength - 1]
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {[
                "Senha muito fraca",
                "Senha fraca",
                "Senha média",
                "Senha forte",
              ][passwordStrength] || "Digite sua senha"}
            </p>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirme sua senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
                minLength={6}
              />
            </div>
          </div>
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg animate-shake">
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}
          <button
            type="submit"
            className={`
              w-full bg-red-500 text-white font-bold py-3 rounded-lg
              hover:bg-red-600 transform hover:-translate-y-0.5
              transition-all duration-200
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
            ) : (
              "REGISTRAR"
            )}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Já possui uma conta?{" "}
          <Link
            href="/login"
            className="text-red-500 font-bold hover:text-red-600 hover:underline transition-colors duration-200"
          >
            FAZER LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}
