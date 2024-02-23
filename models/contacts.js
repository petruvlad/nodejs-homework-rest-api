const fs = require("fs/promises");

const filePath = "contacts.json";

const listContacts = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(
    filePath,
    JSON.stringify(updatedContacts, null, 2),
    "utf-8"
  );
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: contacts.length + 1,
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2), "utf-8");
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex !== -1) {
    const updatedContact = {
      ...contacts[contactIndex],
      ...body,
    };

    contacts[contactIndex] = updatedContact;
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2), "utf-8");
    return updatedContact;
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};