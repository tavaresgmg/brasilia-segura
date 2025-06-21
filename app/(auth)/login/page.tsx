"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData);
      router.push("/");
    } catch (err) {
      setError("Email ou senha inválidos");
    } finally {
      setIsLoading(false);
    }
  };

  // Preencher com credenciais de teste
  const fillTestCredentials = (type: 'admin' | 'citizen') => {
    if (type === 'admin') {
      setFormData({
        email: 'admin@brasilia.gov.br',
        password: 'admin123',
      });
    } else {
      setFormData({
        email: 'joao@gmail.com',
        password: '123456',
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 to-yellow-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Entrar</CardTitle>
          <CardDescription className="text-center">
            Entre com sua conta para continuar
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium">Credenciais de teste:</p>
              <button
                type="button"
                onClick={() => fillTestCredentials('admin')}
                className="text-green-600 hover:underline block"
              >
                → Admin: admin@brasilia.gov.br / admin123
              </button>
              <button
                type="button"
                onClick={() => fillTestCredentials('citizen')}
                className="text-green-600 hover:underline block"
              >
                → Cidadão: joao@gmail.com / 123456
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            <p className="text-sm text-center text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-green-600 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}