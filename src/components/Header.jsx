import { Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header
      className="posts-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #eee",
      }}
    >
      {!user && (
        <Link to="/" style={{ textDecoration: "none", padding: "12px 24px" }}>
          <Typography.Title level={4} style={{ margin: 0, color: "#1677ff" }}>
            ContactApp
          </Typography.Title>
        </Link>
      )}

      {user && (
        <>
          <Link
            to="/contacts"
            style={{ textDecoration: "none", padding: "12px 24px" }}
          >
            <Typography.Title level={4} style={{ margin: 0, color: "#1677ff" }}>
              Contacts
            </Typography.Title>
          </Link>
          <Link
            to="/contacts/new"
            style={{ textDecoration: "none", padding: "12px 24px" }}
          >
            <Typography.Title level={4} style={{ margin: 0, color: "#1677ff" }}>
              Add new
            </Typography.Title>
          </Link>
          <Button type="link" onClick={handleLogout}>
            <Typography.Title level={4} style={{ margin: 0, color: "#1677ff" }}>
              Logout
            </Typography.Title>
          </Button>
        </>
      )}
    </header>
  );
}
