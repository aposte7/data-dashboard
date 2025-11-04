import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Scrapper from "./pages/Scrapper";
import DashboardLayout from "./components/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="scrap" element={<Scrapper />} />
          <Route path="products" element={<Products />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
