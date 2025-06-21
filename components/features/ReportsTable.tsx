"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_REPORTS } from "@/lib/mock/reports";
import { REPORT_CATEGORIES, REPORT_STATUS, URGENCY_LEVELS } from "@/lib/mock/categories";
import { BRASILIA_REGIONS } from "@/lib/mock/regions";
import { 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export function ReportsTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const itemsPerPage = 10;

  // Filtrar reportes
  const filteredReports = MOCK_REPORTS.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(search.toLowerCase()) ||
      report.description.toLowerCase().includes(search.toLowerCase()) ||
      report.userName.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  // Ações simuladas
  const handleApprove = (reportId: string) => {
    console.log("Aprovar:", reportId);
    // Simular atualização
  };

  const handleReject = (reportId: string) => {
    console.log("Rejeitar:", reportId);
    // Simular atualização
  };

  const handleResolve = (reportId: string) => {
    console.log("Resolver:", reportId);
    // Simular atualização
  };

  const handleExport = () => {
    // Simular exportação
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Título,Categoria,Status,Urgência,Região,Data\n"
      + filteredReports.map(r => 
          `${r.id},${r.title},${r.categoryId},${r.status},${r.urgency},${r.location.regionId},${new Date(r.createdAt).toLocaleDateString('pt-BR')}`
        ).join("\n");
    
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "reportes-brasilia-segura.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <CardTitle>Gestão de Reportes</CardTitle>
          <Button onClick={handleExport} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por título, descrição ou usuário..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Todos os Status</option>
            {REPORT_STATUS.map(status => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-medium text-gray-700">Reporte</th>
                <th className="pb-3 font-medium text-gray-700">Categoria</th>
                <th className="pb-3 font-medium text-gray-700">Status</th>
                <th className="pb-3 font-medium text-gray-700">Urgência</th>
                <th className="pb-3 font-medium text-gray-700">Data</th>
                <th className="pb-3 font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report) => {
                const category = REPORT_CATEGORIES.find(c => c.id === report.categoryId);
                const status = REPORT_STATUS.find(s => s.id === report.status);
                const urgency = URGENCY_LEVELS.find(u => u.id === report.urgency);
                const region = BRASILIA_REGIONS.find(r => r.id === report.location.regionId);
                
                return (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-sm">{report.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {report.userName} • {region?.name}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{category?.icon}</span>
                        <span className="text-sm">{category?.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: status?.color }}
                      >
                        {status?.name}
                      </span>
                    </td>
                    <td className="py-4">
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: urgency?.color }}
                      >
                        {urgency?.name}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {new Date(report.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-4">
                      <div className="flex gap-1">
                        {report.status === 'pendente' && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleApprove(report.id)}
                              title="Aprovar"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleReject(report.id)}
                              title="Rejeitar"
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}
                        {report.status === 'em-andamento' && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleResolve(report.id)}
                            title="Marcar como Resolvido"
                          >
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          title="Ver Detalhes"
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-600">
            Mostrando {startIndex + 1} a {Math.min(endIndex, filteredReports.length)} de {filteredReports.length} reportes
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}