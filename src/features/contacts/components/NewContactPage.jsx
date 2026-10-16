import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App as AntdApp } from "antd";
import ContactForm from "./ContactForm";
import { createContact } from "../model/Contact";
import { saveContact } from "../api/contactAPI";

export default function NewContactPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { message } = AntdApp.useApp();

  const handleSubmit = (values) => {
    setError("");

    try {
      const contact = createContact(values);
      saveContact(contact);

      message.success("New contact saved successfully!");
      navigate(`/contacts`);
    } catch (cause) {
      setError("Unable to save new contact.");
    }
  };

  return <ContactForm onSubmit={handleSubmit} error={error} showBack={false} />;
}
