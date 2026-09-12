import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ManifestoMockup from "./ManifestoMockup";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Routes>
          <Route path="/" element={<ManifestoMockup />} />
          <Route path="/dashboard" element={<ManifestoMockup />} />
          <Route path="/politicians/:slug" element={<ManifestoMockup />} />
          <Route path="/politicians" element={<ManifestoMockup />} />
          <Route path="/*" element={<ManifestoMockup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}