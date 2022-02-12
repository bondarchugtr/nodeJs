const fs = require("fs/promises");
const { randomUUID } = require("crypto");
const path = require("path");

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "./db/contacts.json"),
    "utf8"
  );
  const result = JSON.parse(content);
  return result;
};

async function listContacts() {
  return await readContent();
}

async function getContactById(contactId) {
  const contacts = await readContent();
  const contact = contacts.find((el) => el.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContent();
  const contact = contacts.find((el) => el.id === contactId);
  if (contact) {
    const newContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(
      path.join(__dirname, "./db/contacts.json"),
      JSON.stringify(newContacts)
    );
  } else {
    console.log("not found");
  }
  return contact;
}

async function addContact(name, email, phone) {
  const contact = await readContent();
  const newContact = { id: randomUUID(), name, email, phone };
  contact.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "./db/contacts.json"),
    JSON.stringify(contact, null, 2)
  );
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
