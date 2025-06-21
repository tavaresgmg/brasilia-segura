"use client";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, MapPin, User, Menu, Camera } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Remove authentication requirement for now
  // Users can use the app without login

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-green-700">Carregando...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mobile */}
      <header className="bg-green-600 text-white sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between p-4">
          <Link href="/home" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Brasília Segura</span>
          </Link>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 p-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 h-16">
          <Link 
            href="/home" 
            className={`flex flex-col items-center justify-center gap-1 ${
              pathname === '/home' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Início</span>
          </Link>
          <Link 
            href="/report" 
            className={`flex flex-col items-center justify-center gap-1 ${
              pathname === '/report' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <div className={`rounded-full p-2 ${
              pathname === '/report' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <Camera className="h-5 w-5" />
            </div>
            <span className="text-xs">Reportar</span>
          </Link>
          <Link 
            href="/map" 
            className={`flex flex-col items-center justify-center gap-1 ${
              pathname === '/map' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span className="text-xs">Mapa</span>
          </Link>
          <Link 
            href="/profile" 
            className={`flex flex-col items-center justify-center gap-1 ${
              pathname === '/profile' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}