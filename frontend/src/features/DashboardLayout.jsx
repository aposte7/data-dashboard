import React from "react";
import { NavLink, Outlet } from "react-router";
import clsx from "clsx";
import {
  BarChart2,
  DownloadCloud,
  ShoppingCart,
  Info,
  Menu,
  X,
} from "lucide-react";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <input
        id="sidebar-toggle"
        type="checkbox"
        className="peer hidden md:hidden"
      />

      <aside className="hidden w-64 border-r border-gray-200 bg-white md:flex md:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-b-slate-300 px-4">
          <div className="bg-primary-600 grid h-9 w-9 place-items-center rounded-lg font-bold text-white">
            PD
          </div>
          <div>
            <div className="font-semibold text-gray-900">Product Dashboard</div>
          </div>
        </div>
        <div className="py-5">
          <SidebarNav />
        </div>
        <div className="mt-auto p-4 text-xs text-gray-500">
          IndexedDB local storage
        </div>
      </aside>

      <label
        htmlFor="sidebar-toggle"
        className={clsx(
          "pointer-events-none fixed inset-0 bg-black/30 opacity-0 transition-opacity md:hidden",
          "peer-checked:pointer-events-auto peer-checked:opacity-100",
        )}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 w-72 -translate-x-full transform border-r border-gray-200 bg-white transition-transform md:hidden",
          "peer-checked:translate-x-0",
        )}
        aria-hidden={true}
      >
        <div className="flex h-16 items-center gap-3 border-b px-4">
          <div className="bg-primary-600 grid h-9 w-9 place-items-center rounded-lg font-bold text-white">
            PD
          </div>
          <div className="font-semibold text-gray-900">Product Dashboard</div>
          <label
            htmlFor="sidebar-toggle"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </label>
        </div>
        <SidebarNav toggleId="sidebar-toggle" />
        <div className="mt-auto p-4 text-xs text-gray-500">
          IndexedDB local storage
        </div>
      </aside>

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
