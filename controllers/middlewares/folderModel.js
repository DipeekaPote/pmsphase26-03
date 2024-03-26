const mongoose = require('mongoose');

// Define folder schema

const folderSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },

    folderName:{ type: String },

    active: {
        type: Boolean,
        default: true, // Provide a default value if needed
    },

}, { timestamps: true });

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
