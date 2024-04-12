const Contact = require('../../models/Common/contactModel');
const mongoose = require("mongoose");

//get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json({ message: "Contacts retrieved successfully", contacts });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

//Get a single Account
const getContact = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Account ID" });
    }

    try {
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ error: "No such Contact" });
        }

        res.status(200).json({ message: "Contact retrieved successfully", contact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//POST a new account 
const createContact = async (req, res) => {
    const { firstName, middleName, lastName, contactName, companyName, note, ssn, email, login, notify, emailSync, tags, country, streetAddress, city, state, postalCode, phoneNumbers, active } = req.body;
    try {

        const newContact = await Contact.create({ firstName, middleName, lastName, contactName, companyName, note, ssn, email, login, notify, emailSync, tags, country, streetAddress, city, state, postalCode, phoneNumbers, active })
        res.status(200).json({ message: "Contact created successfully", newContact });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete a Account

const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Contact ID" });
    }

    try {
        const deletedContact = await Contact.findByIdAndDelete({ _id: id });
        if (!deletedContact) {
            return res.status(404).json({ error: "No such Contact" });
        }
        res.status(200).json({ message: "Contact deleted successfully", deletedContact });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//update a new Account 
const updateContact = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Account ID" });
    }

    try {
        const updatedContact = await Contact.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: "No such Contact" });
        }

        res.status(200).json({ message: "Contact Updated successfully", updatedContact });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


//get all contacts
const getContactsList = async (req, res) => {
    try {

        const contacts = await Contact.find({})
        .populate({ path: 'tags', model: 'tag' })
        const contactlist = contacts.map(contact => {
        
            // Find the primary phone number
            const primaryPhoneNumber = contact.phoneNumbers.find(number => number[0]);

            return {
                id: contact._id,
                Name: contact.contactName,
                Email: contact.email,
                phoneNumber: primaryPhoneNumber,
                companyName: contact.companyName,
                Tags: contact.tags,
            };
        });

        res.status(200).json({ message: "Contacts list retrieved successfully", contactlist });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};



module.exports = {
    createContact,
    getContact,
    getContacts,
    deleteContact,
    updateContact,
    getContactsList
}