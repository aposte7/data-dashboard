import { Outlet } from "react-router";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-gray-200 bg-white md:hidden">
          <div className="container-responsive flex items-center gap-3 py-3">
            <label
              htmlFor="sidebar-toggle"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </label>
            <div className="font-semibold text-gray-900">Product Dashboard</div>
          </div>
        </header>
        <main className="container-responsive space-y-6 py-6">
          <Outlet />
        </main>
        <footer className="container-responsive py-8 text-sm text-gray-500">
          <p>Local persistence via IndexedDB. Import on the Ingest page.</p>
        </footer>
      </div>
    </div>
  );
}
