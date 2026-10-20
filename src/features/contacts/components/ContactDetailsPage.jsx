import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "./ContactForm";
import {
  deleteContact,
  getContactById,
  updateContact,
} from "../api/contactAPI";
import { App as AntdApp } from "antd";
import ContactNotFound from "../../../components/ContactNotFound";
import { prepareContact } from "../model/Contact";

export default function ContactDetails() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { message } = AntdApp.useApp();

  const [isEditing, setIsEditing] = useState(false);

  const existingContact = getContactById(contactId);

  if (!existingContact) {
    return <ContactNotFound />;
  }

  const handleSubmit = (values) => {
    setError("");

    try {
      const updatedContact = {
        id: existingContact.id,
        ...prepareContact(values),
      };

      updateContact(updatedContact);
      setIsEditing(false);
      message.success("Contact updated successfully!");
    } catch {
      setError("Unable to update contacts");
    }
  };

  const handleDelete = () => {
    setError("");

    try {
      deleteContact(existingContact.id);
      message.success("Contact deleted successfully!");
      navigate("/contacts");
    } catch {
      setError("Unable to delete contact!");
    }
  };

  return (
    <ContactForm
      initialValues={existingContact}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      error={error}
      onBack={() => navigate("/contacts")}
      onEdit={() => {
        setError("");
        setIsEditing(true);
      }}
      onCancel={() => {
        setError("");
        setIsEditing(false);
      }}
      isEditing={isEditing}
      title={"Contact details"}
      subtitle={"Edit the contact details below."}
    />
  );
}
