import { Button } from "antd";
import { Link } from "react-router-dom";

export default function ContactNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Contact not found</h1>
      <Link
        to="/contacts"
        style={{ textDecoration: "none", padding: "12px 24px" }}
      >
        <Button level={4} style={{ margin: 0, color: "#1677ff" }}>
          Back to contacts
        </Button>
      </Link>
    </div>
  );
}
