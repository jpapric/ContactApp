import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to="/contacts/new" replace />;
  }

  const handleSubmit = async (values) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await login(values.username, values.password);

      if (result.success) {
        navigate("/contacts/new");
      } else {
        setError(result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <LoginForm onSubmit={handleSubmit} error={error} isLoading={isLoading} />
  );
}
