import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "./ContactForm";
import { updateContact } from "../api/contactAPI";

export default function ContactDetails() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const storedContacts = localStorage.getItem("contacts");
  const contacts = storedContacts ? JSON.parse(storedContacts) : [];
  const existingContact = contacts.find((contact) => contact.id === contactId);

  if (!existingContact) {
    return <h1>Contact not found</h1>;
  }

  const handleSubmit = (values) => {
    setError("");

    try {
      const updatedContact = {
        id: existingContact.id,
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

      updateContact(updatedContact);
      navigate("/contacts");
    } catch {
      setError("Unable to update contacts");
    }
  };

  return (
    <ContactForm
      initialValues={existingContact}
      onSubmit={handleSubmit}
      error={error}
      onBack={() => navigate("/contacts")}
      title={"Contact details"}
      subtitle={"Edit the contact details below."}
    />
  );
}
