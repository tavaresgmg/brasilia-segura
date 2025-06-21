"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Trophy, 
  Award, 
  Target,
  Camera,
  LogIn,
  Settings,
  Bell,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { MOCK_REPORTS } from "@/lib/mock/reports";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // Mock user stats
  const userReports = isAuthenticated ? MOCK_REPORTS.filter(r => r.userId === user?.id).length : 0;
  const resolvedReports = isAuthenticated ? MOCK_REPORTS.filter(r => r.userId === user?.id && r.status === 'resolvido').length : 0;
  const userPoints = userReports * 10 + resolvedReports * 20;
  const userLevel = Math.floor(userPoints / 100) + 1;

  const handleLogin = () => {
    router.push('/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Faça login para continuar</h2>
            <p className="text-gray-600 mb-6">
              Entre para acompanhar seus reportes e ganhar pontos
            </p>
            <Button onClick={handleLogin} size="lg" className="w-full gap-2">
              <LogIn className="h-5 w-5" />
              Entrar / Cadastrar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* User Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Nível {userLevel} • {userPoints} pontos</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Camera className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{userReports}</p>
            <p className="text-sm text-gray-600">Reportes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{resolvedReports}</p>
            <p className="text-sm text-gray-600">Resolvidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5" />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-xs font-medium">Iniciante</p>
            </div>
            <div className="text-center opacity-50">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-xs">Cidadão Ativo</p>
            </div>
            <div className="text-center opacity-50">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-xs">Guardião</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Options */}
      <Card>
        <CardContent className="p-0">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 border-b">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-600" />
              <span>Notificações</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 border-b">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-gray-600" />
              <span>Configurações</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          <button 
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            onClick={logout}
          >
            <div className="flex items-center gap-3">
              <LogIn className="h-5 w-5 text-red-600" />
              <span className="text-red-600">Sair</span>
            </div>
            <ChevronRight className="h-5 w-5 text-red-400" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}