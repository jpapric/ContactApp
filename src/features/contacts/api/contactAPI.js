export function saveContact(contact) {
  const storedContacts = localStorage.getItem("contacts");
  const contacts = storedContacts ? JSON.parse(storedContacts) : [];
  localStorage.setItem("contacts", JSON.stringify([...contacts, contact]));
}

export function updateContact(updatedContact) {
  const storedContacts = localStorage.getItem("contacts");
  const contacts = storedContacts ? JSON.parse(storedContacts) : [];

  const updatedContacts = contacts.map((contact) =>
    contact.id === updatedContact.id ? updatedContact : contact,
  );

  localStorage.setItem("contacts", JSON.stringify(updatedContacts));
}
