"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function SplashScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Redirect after 1.5 seconds
    const redirectTimeout = setTimeout(() => {
      router.push("/home");
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-pulse">
          <Shield className="h-24 w-24 text-white mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Brasília Segura
          </h1>
          <p className="text-lg text-green-100">
            Juntos por uma cidade melhor
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 mx-auto mb-8">
          <div className="h-2 bg-green-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-green-200 mt-2">Carregando...</p>
        </div>

        {/* Hackathon Info */}
        <div className="text-green-100 text-sm">
          <p>Campus Party 2025</p>
          <p className="text-xs">Desafio Cidade + Segura</p>
        </div>
      </div>
    </div>
  );
}