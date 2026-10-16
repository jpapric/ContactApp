import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../features/auth/AuthProvider";
import { App as AntdApp } from "antd";
import LoginPage from "../features/auth/components/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import NewContactPage from "../features/contacts/components/NewContactPage";
import ContactList from "../features/contacts/components/ContactList";
import ContactDetailsPage from "../features/contacts/components/ContactDetailsPage";
import PageNotFound from "../components/PageNotFound";
import Header from "../components/Header";
import "../css/index.css";

function App() {
  return (
    <>
      <AuthProvider>
        <AntdApp>
          <BrowserRouter>
            <StrictMode>
              <Header />
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/contacts/new" element={<NewContactPage />} />
                  <Route path="/contacts" element={<ContactList />} />
                  <Route
                    path="/contacts/:contactId"
                    element={<ContactDetailsPage />}
                  />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </StrictMode>
          </BrowserRouter>
        </AntdApp>
      </AuthProvider>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
