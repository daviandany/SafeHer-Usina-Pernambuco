import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, Mail, Lock, User, CreditCard, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { registerUser } from "../lib/auth";

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    email: "",
    password: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCPF = (value: string) => {
    const cpf = value.replace(/\D/g, "");
    if (cpf.length <= 11) {
      return cpf
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!acceptTerms) {
      setErrorMessage("Você precisa aceitar os termos e condições.");
      return;
    }

    const result = await registerUser(formData);
    if (!result.ok) {
      setErrorMessage(result.error);
      return;
    }

    setSuccessMessage("Conta criada com sucesso! Redirecionando para o login...");
    setTimeout(() => navigate("/login"), 1200);
  };

  const handleGoogleSignup = () => {
    console.log("Cadastro com Google");
    // Lógica de cadastro com Google
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-100">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <div className="bg-purple-500 rounded-full p-2">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-gray-900">SafeHer</span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
            <p className="text-gray-600">
              Junte-se a milhares de mulheres que se sentem mais seguras
            </p>
          </div>

          {/* Google Signup Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-6 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-full py-6"
            onClick={handleGoogleSignup}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Cadastrar com Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">ou cadastre-se com e-mail</span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            {successMessage ? (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMessage}
              </div>
            ) : null}
            <div>
              <Label htmlFor="fullName" className="text-gray-700 mb-2 block">
                Nome Completo <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Maria Silva Santos"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-12 py-6 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cpf" className="text-gray-700 mb-2 block">
                CPF <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleCPFChange}
                  maxLength={14}
                  className="pl-12 py-6 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-4">
                Seus dados são criptografados e protegidos
              </p>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                E-mail <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-12 py-6 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2 block">
                Senha <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-12 pr-12 py-6 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-4">
                Use pelo menos 8 caracteres com letras e números
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                  required
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  Eu li e aceito os{" "}
                  <a href="#" className="text-purple-600 hover:underline font-medium">
                    Termos de Uso
                  </a>{" "}
                  e a{" "}
                  <a href="#" className="text-purple-600 hover:underline font-medium">
                    Política de Privacidade
                  </a>{" "}
                  do SafeHer <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-full py-6 text-lg"
            >
              Criar Conta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Entrar
              </Link>
            </p>
          </div>

          <div className="mt-6 bg-purple-50 rounded-2xl p-4 border border-purple-100">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Seus dados estão seguros
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Utilizamos criptografia de ponta e seguimos a LGPD. 
                  Seus dados pessoais nunca serão compartilhados sem sua autorização.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Ao criar uma conta, você concorda em receber atualizações importantes sobre segurança
        </p>
      </div>
    </div>
  );
}
