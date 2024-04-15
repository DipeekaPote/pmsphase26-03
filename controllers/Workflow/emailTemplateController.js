const EmailTemplate = require('../../models/Workflow/emailTemplate');
const mongoose = require("mongoose");

//get all JobTemplate
const getEmailTemplates = async (req, res) => {
    try {
        const emailTemplate = await EmailTemplate.find({}).sort({ createdAt: -1 });
        res.status(200).json({ message: "EmailTemplate retrieved successfully", emailTemplate });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//Get a single JobTemplate
const getEmailTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Emailtemplate ID" });
    }

    try {
        const emailTemplate = await EmailTemplate.findById(id)


        if (!emailTemplate) {
            return res.status(404).json({ error: "No such JobTemplate" });
        }

        res.status(200).json({ message: "EmailTemplate retrieved successfully", emailTemplate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//Get a single JobTemplate List
const getEmailTemplateList = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid JobTemplate ID" });
    }

    try {
        const emailTemplate = await EmailTemplate.findById(id)
         .populate({ path: 'from', model: 'User' });
                  
         
        if (!emailTemplate) {
            return res.status(404).json({ error: "No such emailTemplate" });
        }

        res.status(200).json({ message: "emailTemplate retrieved successfully", emailTemplate });
    } catch (error) {
        res.status(500).json({ error: error.message});
 }
};



//POST a new JobTemplate 
const createEmailTemplate = async (req, res) => {
    const { templatename, from, emailsubject, wysiwyg, html, emailbody, active } = req.body;

    try {
        // Check if a task template with similar properties already exists
        const existingTemplate = await EmailTemplate.findOne({
            templatename
        });

        if (existingTemplate) {
            return res.status(400).json({ error: "EmailTemplate  already exists" });
        }
        // If no existing template is found, create a new one
        const newEmailTemplate = await EmailTemplate.create({templatename, from, emailsubject, wysiwyg, html, emailbody, active
        });
        return res.status(201).json({ message: "EmailTemplate created successfully", newEmailTemplate });
    } catch (error) {
        console.error("Error creating JobTemplate:", error);
        return res.status(500).json({ error: "Error creating JobTemplate" });
    }
};


//delete a JobTemplate

const deleteEmailTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid EmailTemplate ID" });
    }

    try {
        const deletedEmailTemplate = await EmailTemplate.findByIdAndDelete({ _id: id });
        if (!deletedEmailTemplate) {
            return res.status(404).json({ error: "No such EmailTemplate" });
        }
        res.status(200).json({ message: "EmailTemplate deleted successfully", deletedEmailTemplate });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//update a new tasktemplate 
const updateEmailTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid EmailTemplate ID" });
    }

    try {
        const updatedEmailTemplate = await EmailTemplate.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        if (!updatedEmailTemplate) {
            return res.status(404).json({ error: "No such EmailTemplate" });
        }

        res.status(200).json({ message: "EmailTemplate Updated successfully", updatedEmailTemplate});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEmailTemplate,
    getEmailTemplates,
    getEmailTemplate,
    deleteEmailTemplate,
    updateEmailTemplate,
    getEmailTemplateList
}