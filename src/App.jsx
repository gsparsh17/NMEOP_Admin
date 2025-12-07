import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminHeader from "./components/admin/AdminHeader";
import AdminSidebar from "./components/admin/AdminSidebar";
import Dashboard from "./pages/admin/Dashboard";
import PriceDataManager from "./pages/admin/PriceDataManager";
import StateDataManager from "./pages/admin/StateDataManager";
import NMEOTargetManager from "./pages/admin/NMEOTargetManager";
import ImportDataManager from "./pages/admin/ImportDataManager";
// import ApiManager from "./pages/admin/ApiManager";
// import ReportsManager from "./pages/admin/ReportsManager";
// import AuditLogs from "./pages/admin/AuditLogs";
// import Settings from "./pages/admin/Settings";
// import Login from "./pages/auth/Login";
// import useAdminAuth from "./hooks/useAdminAuth";
import "./index.css";

export default function App() {
  // const { isAuthenticated, user, loading } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-16 h-16 border-4 border-[#003366] border-t-transparent rounded-full animate-spin mx-auto"></div>
  //         <p className="mt-4 text-gray-600">Loading Admin Panel...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   return <Login />;
  // }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* TOP GOVERNMENT STRIP - Bilingual - Mobile Responsive */}
        <div className="bg-[#003366] text-white text-[10px] sm:text-xs py-1 px-2 sm:px-4 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
            <div className="flex items-center flex-wrap gap-1 sm:gap-4">
              <a href="#" className="hover:text-[#FF9933] transition-colors whitespace-nowrap">भारत सरकार</a>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <a href="#" className="hover:text-[#FF9933] transition-colors whitespace-nowrap">GOVERNMENT OF INDIA</a>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <a href="#" className="hover:text-[#FF9933] transition-colors whitespace-nowrap hidden sm:inline">कृषि एवं किसान कल्याण मंत्रालय</a>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <a href="#" className="hover:text-[#FF9933] transition-colors whitespace-nowrap hidden sm:inline">Ministry of Agriculture & Farmers Welfare</a>
            </div>
            <div className="flex items-center flex-wrap gap-1 sm:gap-4">
              <a href="#main-content" className="hover:text-[#FF9933] transition-colors whitespace-nowrap text-[9px] sm:text-xs">Skip to Main</a>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <a href="#" className="hover:text-[#FF9933] transition-colors whitespace-nowrap hidden sm:inline">Sitemap</a>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <a href="#" className="hover:text-[#FF9933] transition-colors whitespace-nowrap hidden sm:inline">Contact</a>
            </div>
          </div>
        </div>

        {/* MAIN ADMIN HEADER WITH LOGOS */}
        <header className="bg-gradient-to-r from-blue-50 to-white shadow-md border-b border-gray-200 sticky top-0 z-50">
          <div className="mx-auto px-2 sm:px-4">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center justify-between py-2">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#003366] p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <img 
                  src="/assets/ut.png" 
                  alt="State Emblem of India" 
                  className="w-10 h-10 object-contain"
                />
                <span className="bg-[#138808] text-white text-[10px] px-1.5 py-0.5 rounded">Admin v2.1.5</span>
              </div>
            </div>

            {/* Main Header Content */}
            <div className="hidden lg:flex items-center justify-between py-4">
              {/* Left Side: State Emblem & Portal Info */}
              <div className="flex items-center gap-6">
                {/* State Emblem Logo */}
                <div className="relative">
                  <img 
                    src="/assets/ut.png" 
                    alt="State Emblem of India" 
                    className="w-16 h-16 object-contain drop-shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-3 bg-[#FF9933] text-white text-[8px] px-1 py-0.5 rounded">
                    Admin
                  </div>
                </div>

                <div className="border-l-2 border-[#FF9933] pl-4">
                  <h1 className="text-xl font-bold text-[#003366] leading-tight">
                    NMEO-OP Data Management System
                    <span className="text-[#FF9933] ml-2">(Admin Panel)</span>
                  </h1>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-[#138808]">Secure Administrative Portal</span> · 
                      <span className="hidden xl:inline"> Ministry of Agriculture & Farmers Welfare · Government of India</span>
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 hidden md:block">
                    Centralized Data Management for Crude Palm Oil Policy Decisions
                  </div>
                </div>
              </div>

              {/* Right Side: Government Logos & User Info */}
              <div className="flex items-center gap-6">
                {/* Government Logos */}
                <div className="hidden xl:flex items-center gap-3">
                  <div className="hidden xl:block">
                    <img 
                      src="/assets/image0012A74.png" 
                      alt="150 Years of Service" 
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div className="">
                    <img 
                      src="/assets/615olGBufWL-Photoroom.png" 
                      alt="Swachh Bharat Mission" 
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                </div>
                
                {/* User & Session Info */}
                <div className="text-right border-l-2 border-gray-200 pl-4">
                  <div className="text-sm">
                    <div className="text-gray-600">Logged in as:</div>
                    <div className="font-semibold text-[#003366]">Administrator</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Session: <span className="font-medium text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Header Content */}
            <div className="lg:hidden flex flex-col items-center py-3">
              <h1 className="text-lg font-bold text-[#003366] text-center">
                NMEO-OP Admin
              </h1>
              <p className="text-xs text-gray-600 text-center mt-1">
                Data Management System
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Session Active</span>
              </div>
            </div>
          </div>
        </header>

        {/* NATIONAL FLAG STRIP - Mobile Responsive */}
        <div className="relative bg-gradient-to-r from-[#FF9933] via-white to-[#138808] py-1 sm:py-2">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#FF9933] rounded-full border border-black"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full border border-black"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#138808] rounded-full border border-black"></div>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 ml-1">National Portal of India</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Flagship Initiatives:</span>
                <div className="flex gap-1 overflow-x-auto pb-1">
                  <div className="bg-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-[#003366] border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                    Digital India
                  </div>
                  <div className="bg-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-[#003366] border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                    Make in India
                  </div>
                  <div className="bg-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-[#003366] border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
                    Atmanirbhar Bharat
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex flex-1">
          {/* Desktop Sidebar */}
          <AdminSidebar 
            isOpen={sidebarOpen}
            // userRole={user?.role}
          />

          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
          )}

          <main className={`flex-1 transition-all duration-300 max-w-7xl mx-auto pb-16 lg:pb-0`}>
            <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-[calc(100vh-300px)]">
              {/* Admin Content Header Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-[#003366] via-[#0072bc] to-[#1e5c2a] text-white p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold">Data Management Dashboard</h2>
                      <p className="text-xs sm:text-sm opacity-90 mt-1">
                        Centralized control for NMEO-OP policy data
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30">
                        <div className="text-xs font-medium">Secure Session</div>
                        <div className="text-xs opacity-80">Administrator Level</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 via-white to-green-50 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-gray-700">
                      <span className="font-semibold text-[#003366]">Purpose:</span> Manage all data sources for policy decision support system.
                    </div>
                    <div className="text-gray-700">
                      <span className="font-semibold text-[#003366]">Access Level:</span> Restricted administrative access only.
                    </div>
                    <div className="text-gray-700">
                      <span className="font-semibold text-[#003366]">Data Integrity:</span> All changes are logged and audited.
                    </div>
                  </div>
                </div>
              </div>

              {/* Routes Content */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/prices" element={<PriceDataManager />} />
                  <Route path="/states" element={<StateDataManager />} />
                  <Route path="/nmeo-targets" element={<NMEOTargetManager />} />
                  <Route path="/imports" element={<ImportDataManager />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>

        {/* COMPREHENSIVE GOVERNMENT FOOTER - Mobile Responsive */}
        <footer className="bg-[#003366] text-white border-t-4 border-[#FF9933] mt-auto">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
            {/* Main Footer Content */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* About Section */}
              <div>
                <h4 className="font-bold text-[#FF9933] mb-2 text-xs uppercase tracking-wider">Admin Portal</h4>
                <ul className="space-y-1 text-[10px] sm:text-xs">
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors flex items-center gap-1">
                    <span className="w-1 h-1 bg-[#FF9933] rounded-full"></span>
                    Dashboard
                  </a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors flex items-center gap-1">
                    <span className="w-1 h-1 bg-[#FF9933] rounded-full"></span>
                    Data Management
                  </a></li>
                </ul>
              </div>

              {/* Ministry Links */}
              <div>
                <h4 className="font-bold text-[#FF9933] mb-2 text-xs uppercase tracking-wider">Ministry Links</h4>
                <ul className="space-y-1 text-[10px] sm:text-xs">
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Main Portal</a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Schemes</a></li>
                </ul>
              </div>

              {/* Security */}
              <div>
                <h4 className="font-bold text-[#FF9933] mb-2 text-xs uppercase tracking-wider">Security</h4>
                <ul className="space-y-1 text-[10px] sm:text-xs">
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Audit Logs</a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Access Control</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-bold text-[#FF9933] mb-2 text-xs uppercase tracking-wider">Support</h4>
                <ul className="space-y-1 text-[10px] sm:text-xs">
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Help Desk</a></li>
                  <li><a href="#" className="hover:text-[#FF9933] transition-colors">Contact Admin</a></li>
                </ul>
              </div>
            </div>

            {/* Copyright & Information */}
            <div className="pt-4 border-t border-gray-700 text-center">
              <div className="flex flex-col items-center justify-center gap-2 mb-3">
                <div className="flex items-center flex-wrap gap-2 justify-center text-[10px]">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Accessibility</a>
                  <span className="text-gray-500">|</span>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                  <span className="text-gray-500">|</span>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Use</a>
                </div>
              </div>
              
              <div className="text-[10px] text-gray-400 space-y-1">
                <p>Restricted Access · Ministry of Agriculture & Farmers Welfare, Government of India</p>
                <p className="hidden sm:block">
                  © 2025 Government of India. All Rights Reserved.
                  <span className="mx-2">|</span>
                  Secure Admin Portal v2.1.5
                </p>
                <p className="mt-1">
                  <span className="font-medium text-gray-300">Last Activity:</span> 
                  {' '}{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0072bc] shadow-lg z-50 border-t border-[#005b94]">
          <div className="flex">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex-1 px-2 py-3 text-center text-white hover:bg-[#0066a6]"
            >
              <div className="text-lg">≡</div>
              <div className="text-[10px]">Menu</div>
            </button>
            <button className="flex-1 px-2 py-3 text-center text-white hover:bg-[#0066a6]">
              <div className="text-lg">📊</div>
              <div className="text-[10px]">Dashboard</div>
            </button>
            <button className="flex-1 px-2 py-3 text-center text-white hover:bg-[#0066a6]">
              <div className="text-lg">📈</div>
              <div className="text-[10px]">Data</div>
            </button>
            <button className="flex-1 px-2 py-3 text-center text-white hover:bg-[#0066a6]">
              <div className="text-lg">⚙️</div>
              <div className="text-[10px]">Admin</div>
            </button>
          </div>
        </div>
      </div>
    </Router>
  );
}