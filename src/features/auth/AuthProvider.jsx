import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("sim_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username, password) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === "user" && password === "password") {
      const mockUser = { username, role: "user", token: "mock-jwt-token-1234" };

      localStorage.setItem("sim_user", JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    } else {
      return { success: false, message: "Username or password invalid" };
    }
  };

  const logout = () => {
    localStorage.removeItem("sim_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
