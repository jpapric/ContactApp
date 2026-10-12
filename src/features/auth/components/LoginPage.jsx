import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { Alert, Button, Card, Form, Input, Space, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await login(values.username, values.password);

      if (result.success) {
        navigate("/contacts");
      } else {
        setError(result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        display: "grid",
        placeItems: "center",
        padding: 16,
        background:
          "radial-gradient(ellipse at top left, #e6f4ff 0%, transparent 48%), linear-gradient(135deg, #f5f7fb 0%, #eef2f8 100%)",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(31, 45, 61, 0.12)",
        }}
        styles={{ body: { padding: "40px 36px" } }}
      >
        <Space
          direction="vertical"
          size={8}
          style={{ width: "100%", marginBottom: 30 }}
        >
          <Text
            strong
            style={{
              color: "#1677ff",
              fontSize: 13,
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            ContactApp
          </Text>
          <Title level={2} style={{ margin: 0, letterSpacing: "-0.5px" }}>
            Welcome back
          </Title>
          <Text type="secondary">Log in to manage your contacts.</Text>
        </Space>

        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          requiredMark={false}
          size="large"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username." }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Your username"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password." }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Your password"
              autoComplete="current-password"
            />
          </Form.Item>

          {error && (
            <Alert
              type="error"
              showIcon
              message={error}
              style={{ marginBottom: 20, borderRadius: 8 }}
            />
          )}

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ height: 46, borderRadius: 10, fontWeight: 600 }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  );
}
