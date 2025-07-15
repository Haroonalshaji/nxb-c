"use client";
import { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Mail, Menu, X } from "lucide-react";

// Context to control sidebar open/close from outside
const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarToggleButton() {
  const { setSidebarOpen } = useContext(SidebarContext);
  return (
    <button
      className="fixed top-4 left-4 z-[100] bg-white rounded-full p-2 shadow"
      onClick={() => setSidebarOpen((v) => !v)}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  return (
    <>
      {/* Overlay for all screens */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />
      {/* Sidebar - always overlays, never static */}
      <aside
        className={`
          bg-white shadow h-full py-6 min-w-[200px] flex flex-col gap-4
          fixed z-[100] top-0 left-0 transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ width: 240, height: '100vh' }}
      >
        {/* Close button for all screens */}
        <button
          className="absolute top-4 right-4"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6" />
        </button>
        <nav className="flex flex-col gap-2 mt-8">
          <Link href="/dashboard/services">
            <span className={`flex items-center gap-2 px-3 py-2 transition-colors cursor-pointer ${pathname.startsWith("/dashboard/services") ? "bg-[#B80D2D] text-white" : "hover:bg-gray-100 text-gray-900"}`}>
              <LayoutGrid className="h-5 w-5" />
              Dashboard
            </span>
          </Link>
          <Link href="/dashboard/enquiries">
            <span className={`flex items-center gap-2 px-3 py-2 transition-colors cursor-pointer ${pathname.startsWith("/dashboard/enquiries") ? "bg-[#B80D2D] text-white" : "hover:bg-gray-100 text-gray-900"}`}>
              <Mail className="h-5 w-5" />
              Enquiries
            </span>
          </Link>
        </nav>
      </aside>
    </>
  );
} 