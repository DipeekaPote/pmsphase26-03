// models/otpModel.js
const mongoose = require('mongoose');

const copypastefolderSchema = new mongoose.Schema({
  sourceFolder: { type: String, required: true },
  destinationFolder: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const CopyPasteFolder = mongoose.model('CopyPasteFolder', copypastefolderSchema);

module.exports = CopyPasteFolder;
