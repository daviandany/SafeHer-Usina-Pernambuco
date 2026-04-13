import { useState } from "react";
import { Link } from "react-router";
import { Shield, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { findUserByEmail } from "../lib/auth";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const user = await findUserByEmail(email);
    if (!user) {
      setErrorMessage("Não encontramos uma conta com este e-mail.");
      return;
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-100 text-center">
            <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-4 mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              E-mail Enviado!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Enviamos um link de recuperação de senha para{" "}
              <span className="font-semibold text-purple-600">{email}</span>
            </p>

            <div className="bg-purple-50 rounded-2xl p-4 mb-6 text-left">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Próximos passos:</strong>
              </p>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Verifique sua caixa de entrada</li>
                <li>Clique no link recebido</li>
                <li>Crie uma nova senha segura</li>
              </ol>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              Não recebeu o e-mail? Verifique sua caixa de spam ou{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-purple-600 hover:underline font-medium"
              >
                tente novamente
              </button>
            </p>

            <Link to="/login">
              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full py-6">
                Voltar para Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-100">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-purple-500 rounded-full p-2">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-gray-900">SafeHer</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Esqueceu sua senha?
            </h1>
            <p className="text-gray-600">
              Não se preocupe! Digite seu e-mail e enviaremos instruções para redefinir sua senha.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                E-mail cadastrado
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 py-6 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full py-6 text-lg"
            >
              Enviar Link de Recuperação
            </Button>
          </form>

          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o login
            </Link>
          </div>

          <div className="mt-8 bg-purple-50 rounded-2xl p-4 border border-purple-100">
            <p className="text-sm text-gray-700 text-center">
              <strong>Dica de segurança:</strong> Nunca compartilhe sua senha com ninguém. 
              O SafeHer nunca solicitará sua senha por e-mail ou telefone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
