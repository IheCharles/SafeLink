import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Submit from "./pages/Submit";
import Verify from "./pages/Verify";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/submit" element={<Submit />} />
        </Route>
        {/* Status / verification page — uses its own layout (color-themed) */}
        <Route path="/:submissionId" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}
