import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认已认证
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header onSidebarToggle={toggleSidebar} />
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />

            </Routes>
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
