const Tags = require('../../models/Common/tagModel')
const mongoose = require('mongoose')

//GET all tags 
const getTags = async (req, res) => {
    try {
        const tags = await Tags.find({}).sort({ createdAt: -1 });
        res.status(200).json({ message: "Tags retrieved successfully", tags });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//GET a single tags
const getTag = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Tag ID" });
    }

    try {
        const tag = await Tags.findById(id);

        if (!tag) {
            return res.status(404).json({ error: "No such Tag" });
        }

        res.status(200).json({ message: "Tag retrieved successfully", tag });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//POST create a new tags

const createTag = async (req, res) => {
    const { tagName, tagColour, active} = req.body;

    try {
        const existingTag = await Tags.findOne({ tagName });

        if (existingTag) {
            return res.status(400).json({ message: "Tag with this TagName already exists" });
        }

        const newTag = await Tags.create({ tagName, tagColour, active });
        res.status(200).json({ message: "Tag created successfully", tag: newTag });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//delete a tags

const deleteTag = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Tag ID" });
    }

    try {
        const deletedTag = await Tags.findByIdAndDelete({ _id: id });

        if (!deletedTag) {
            return res.status(404).json({ error: "No such Tag" });
        }

        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// update a new tags
const updateTag = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Tag ID" });
    }

    try {
        const updatedTag = await Tags.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // This option ensures that the updated document is returned
        );

        if (!updatedTag) {
            return res.status(404).json({ error: "No such Tag" });
        }

        res.status(200).json({ message: "Tag updated successfully", tag: updatedTag });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createTag,
    getTag,
    getTags,
    deleteTag,
    updateTag
}

