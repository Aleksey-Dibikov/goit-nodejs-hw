const { Command } = require('commander');
const {
    listContacts,
    addContact,
    getContactById,
    removeContact
} = require('./contacts');

const program = new Command();

program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const contacts = await listContacts()
            console.table(contacts);
            break;

        case 'get':
            const contactById = await getContactById(id);
            console.log(contactById);
            break;

        case 'add':
            const contact = await addContact(name, email, phone);
            console.log(contact);
            break;

        case 'remove':
            const deleteContact = await removeContact(id);
            if (deleteContact) {
                console.table(deleteContact);
            } else {
                console.log("Incorrect id. Try again, please!");
            }
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

invokeAction(argv);