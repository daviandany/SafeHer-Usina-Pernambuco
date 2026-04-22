import { Button } from "./ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router";

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl p-12 overflow-hidden shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-700 rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>

          <div className="relative z-10 text-center text-white">
            <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full p-4 mb-6">
              <Shield className="w-12 h-12" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Quer mais segurança no seu dia a dia?
            </h2>
            
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              O SafeHer é gratuito e foi criado para ajudar mulheres.
              Tenha acesso rápido a ajuda, orientação e recursos de proteção.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/cadastro">
                <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-full px-8 py-6 text-lg group">
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="border-2 border-white/90 !bg-transparent text-white hover:!bg-white hover:text-purple-700 rounded-full px-8 py-6 text-lg transition-all duration-300"
                >
                  Saiba Mais
                </Button>
              </Link>
            </div>

            <p className="text-sm text-purple-100 mt-6">
              ✓ Feito para ajudá-las • ✓ Apoio rápido • ✓ Privacidade garantida
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}