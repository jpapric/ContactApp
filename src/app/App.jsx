import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../features/auth/AuthProvider";
import LoginPage from "../features/auth/components/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import NewContactPage from "../features/auth/components/NewContactPage";
import "../css/index.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <StrictMode>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/contacts/new" element={<NewContactPage />} />
              </Route>
            </Routes>
          </StrictMode>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
