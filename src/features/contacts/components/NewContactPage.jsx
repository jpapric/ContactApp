import { useState } from "react";
import { useNavigate } from "react-router";
import {
  App as AntdApp,
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
} from "antd";

const { Title } = Typography;

export default function NewContactPage() {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { message } = AntdApp.useApp();
  const contactMethods = Form.useWatch("contactMethods", form) ?? [];

  const handleSubmit = (values) => {
    setError("");

    try {
      const storedContacts = localStorage.getItem("contacts");
      const contacts = storedContacts ? JSON.parse(storedContacts) : [];

      const contact = {
        id: crypto.randomUUID(),
        name: values.name.trim(),
        surname: values.surname.trim(),
        address: values.address.trim(),
        contactMethods: values.contactMethods,
        phone: values.contactMethods.includes("phone")
          ? values.phone.trim()
          : "",
        email: values.contactMethods.includes("email")
          ? values.email.trim()
          : "",
        oib: values.oib.trim(),
      };

      localStorage.setItem("contacts", JSON.stringify([...contacts, contact]));
      message.success("New contact saved successfully!");
      navigate(`/contacts/${contact.id}`);
    } catch (error) {
      throw new Error(`Unable to save new contact: ${error.message}`);
    }
  };

  return (
    <main>
      <Card
        style={{
          boxShadow: "0 20px 60px rgba(31, 45, 61, 0.12)",
          background:
            "radial-gradient(ellipse at top left, #e6f4ff 0%, transparent 48%), linear-gradient(135deg, #f5f7fb 0%, #eef2f8 100%)",
        }}
        styles={{ body: { padding: "20px" } }}
      >
        <Title style={{ textAlign: "center" }}>Add new contact</Title>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
          size="large"
          style={{
            width: "700px",
            margin: "0 auto",
          }}
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
              preserve:false
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
              preserve:false
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
            <Flex justify="center">
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
