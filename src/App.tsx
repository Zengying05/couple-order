import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import SelectMode from "@/pages/SelectMode";
import Cart from "@/pages/Cart";
import History from "@/pages/History";
import ManageMenu from "@/pages/ManageMenu";
import { useStore } from "@/store/useStore";

export default function App() {
  const { loadMenu, loadOrders } = useStore();

  useEffect(() => {
    loadMenu();
    loadOrders();
  }, [loadMenu, loadOrders]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<SelectMode />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<History />} />
        <Route path="/manage-menu" element={<ManageMenu />} />
      </Routes>
    </Router>
  );
}
