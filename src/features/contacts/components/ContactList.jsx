import { Card, Typography, List, Empty, Button } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;

export default function ContactList() {
  const storedContacts = localStorage.getItem("contacts");
  const contacts = storedContacts ? JSON.parse(storedContacts) : [];

  return contacts.length === 0 ? (
    <div style={{ padding: 48 }}>
      <Empty description="No contacts yet">
        <Link to="/contacts/new">
          <Button type="primary">Add you first contact</Button>
        </Link>
      </Empty>
    </div>
  ) : (
    <List
      grid={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
      }}
      dataSource={contacts}
      renderItem={(contact) => (
        <List.Item style={{ padding: 20 }}>
          <Link to={`/contacts/${contact.id}`}>
            <Card
              style={{
                borderRadius: "20px",
                color: "blue",
                borderColor: "#1677ff",
              }}
            >
              <Title level={3} style={{ marginTop: 0, color: "#1677ff" }}>
                {contact.name} {contact.surname}
              </Title>
              <Title type="secondary" level={4}>
                Address: {contact.address}
              </Title>
              <Title type="secondary" level={4}>
                {contact.contactMethods?.includes("phone") && (
                  <Title type="secondary" level={4}>
                    Phone: {contact.phone}
                  </Title>
                )}
                {contact.contactMethods?.includes("email") && (
                  <Title type="secondary" level={4}>
                    Email: {contact.email}
                  </Title>
                )}
              </Title>
              <Title type="secondary" level={4}>
                OIB: {contact.oib}
              </Title>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
}
