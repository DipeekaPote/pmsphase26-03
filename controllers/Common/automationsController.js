const Automations = require('../../models/Common/automationsModel')
const mongoose = require('mongoose')

//GET all Automations 
const getAutomations = async (req, res) => {
    try {
        const automations = await Automations.find({}).sort({ createdAt: -1 });
        res.status(200).json({ message: "Automations retrieved successfully", automations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//GET a single Automation
const getAutomation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Automation ID" });
    }
    try {
        const automation = await Automations.findById(id);
        if (!automation) {
            return res.status(404).json({ error: "No such Role" });
        }
        res.status(200).json({ message: "Automation retrieved successfully", automation});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//POST create a automations

const createAutomation = async (req, res) => {
    const { description } = req.body;
    try {
        const existingAutomations = await Automations.findOne({description});
        if (existingAutomations){
            return res.status(400).json({message: "Automations already exists"});
        }
        const newAutomations = await Automations.create({ description });

        res.status(200).json({ message: "Automations created successfully", Automations: newAutomations });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete a newAutomations

const deleteAutomation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Automations ID" });
    }
    try {
        const deletedAutomations = await Automations.findByIdAndDelete({ _id: id });

        if (!deletedAutomations) {
            return res.status(404).json({ error: "No such Automations" });
        }

        res.status(200).json({ message: "Automations deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// update a Automations
const updateAutomation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Automation ID" });
    }

    try {
        const updatedAutomations = await Automations.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // This option ensures that the updated document is returned
        );

        if (!updatedAutomations) {
            return res.status(404).json({ error: "No such Automations" });
        }

        res.status(200).json({ message: "Automations updated successfully", Automations: updatedAutomations });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAutomations,
    getAutomation,
    createAutomation,
    deleteAutomation,
    updateAutomation
}

