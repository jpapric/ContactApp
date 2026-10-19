import {
  Alert,
  Card,
  Button,
  Form,
  Flex,
  Typography,
  Input,
  Checkbox,
  Row,
  Col,
  Popconfirm,
} from "antd";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function ContactForm({
  onSubmit,
  error,
  onBack,
  showBack = true,
  initialValues = {},
  onDelete,
  title = "Add new contact",
  subtitle = "Enter the contact details below.",
}) {
  const [form] = Form.useForm();
  const contactMethods = Form.useWatch("contactMethods", form) ?? [];

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        background:
          "radial-gradient(ellipse at top left, #e6f4ff 0%, transparent 48%), linear-gradient(135deg, #f5f7fb 0%, #eef2f8 100%)",
      }}
    >
      {showBack && (
        <Button
          type="text"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          aria-label="Back to contacts"
          title="Back to contacts"
          onClick={onBack}
          style={{
            position: "fixed",
            top: 20,
            left: 30,
            zIndex: 1,
            fontSize: "20px",
          }}
        />
      )}
      <Card
        style={{
          width: "100%",
          maxWidth: 760,
          borderRadius: 20,
          boxShadow: "0 20px 60px rgba(31, 45, 61, 0.12)",
        }}
        styles={{ body: { padding: "clamp(20px, 5vw, 36px)" } }}
      >
        <div style={{ marginBottom: 28 }}>
          <Title level={2} style={{ margin: 0, letterSpacing: "-0.5px" }}>
            {title}
          </Title>
          <Typography.Text type="secondary">{subtitle}</Typography.Text>
        </div>

        <Form
          form={form}
          initialValues={initialValues}
          onFinish={onSubmit}
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter name.",
              },
            ]}
          >
            <Input placeholder="John" autoComplete="given-name" />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Surname"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter surname.",
              },
            ]}
          >
            <Input placeholder="Doe" autoComplete="family-name" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter address",
              },
            ]}
          >
            <Input placeholder="Address 1" autoComplete="street-address" />
          </Form.Item>

          <Form.Item
            name="contactMethods"
            label="Contact Method"
            rules={[
              {
                required: true,
                min: 1,
                type: "array",
                message: "Please choose at least one contact method.",
              },
            ]}
          >
            <Checkbox.Group>
              <Row gutter={16}>
                <Col>
                  <Checkbox value="phone">Phone</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="email">Email</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          {contactMethods.includes("phone") && (
            <Form.Item
              name="phone"
              label="Phone"
              preserve={false}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter phone number",
                },
              ]}
            >
              <Input placeholder="0973642813" autoComplete="phone-number" />
            </Form.Item>
          )}

          {contactMethods.includes("email") && (
            <Form.Item
              name="email"
              label="Email"
              preserve={false}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter valid email adress.",
                },
                {
                  type: "email",
                  message: "Please enter valid email address",
                },
              ]}
            >
              <Input
                placeholder="john.doe@gmail.com"
                autoComplete="email-address"
              />
            </Form.Item>
          )}

          <Form.Item
            name="oib"
            label="OIB"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Enter valid OIB",
              },
              {
                pattern: /^\d{11}$/,
                message: "OIB must contain 11 numbers",
              },
            ]}
          >
            <Input
              inputMode="numeric"
              placeholder="123456789101"
              maxLength={11}
            />
          </Form.Item>

          {error && (
            <Alert
              type="error"
              showIcon
              message={error}
              style={{ marginBottom: 16 }}
            />
          )}

          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Flex
              justify={onDelete ? "space-between" : "center"}
              align="center"
              gap={12}
            >
              {onDelete ? (
                <Popconfirm
                  title="Delete this contact"
                  description="Are you sure you want to delete this contact?"
                  okText="Delete"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                  onConfirm={onDelete}
                >
                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    aria-label="Delete contact"
                    title="Delete contact"
                  />
                </Popconfirm>
              ) : (
                <span />
              )}
              <Button type="primary" htmlType="submit" style={{ width: 150 }}>
                Save
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </main>
  );
}
