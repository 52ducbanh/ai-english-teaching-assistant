import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AssistantPage from "./pages/AssistantPage/AssistantPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/assistant" replace />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="*" element={<Navigate to="/assistant" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
