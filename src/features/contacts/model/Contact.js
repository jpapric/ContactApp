export function createContact(values) {
  return {
    id: crypto.randomUUID(),
    name: values.name.trim(),
    surname: values.surname.trim(),
    address: values.address.trim(),
    contactMethods: values.contactMethods,
    phone: values.contactMethods.includes("phone") ? values.phone.trim() : "",
    email: values.contactMethods.includes("email") ? values.email.trim() : "",
    oib: values.oib.trim(),
  };
}
