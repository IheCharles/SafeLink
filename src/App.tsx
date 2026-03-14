import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Submit from "./pages/Submit";
import Submitted from "./pages/Submitted";
import Verify from "./pages/Verify";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/submitted" element={<Submitted />} />
        </Route>
        {/* Verification page uses its own layout (color-themed, no header) */}
        <Route path="/v/:linkId" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}
