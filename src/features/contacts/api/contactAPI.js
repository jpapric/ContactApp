export function saveContact(contact) {
  const storedContacts = localStorage.getItem("contacts");
  const contacts = storedContacts ? JSON.parse(storedContacts) : [];
  localStorage.setItem("contacts", JSON.stringify([...contacts, contact]));
}
