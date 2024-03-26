const express = require("express");
const router = express.Router();
const fs = require('fs-extra');

const CopyPasteFolder = require("../../controllers/middlewares/copypastefolderModel");

router.post("/copy_pastefolder", async (req, res) => {
  try {
    
    const sourceFolder = req.body.sourceFolder;
    const destinationFolder = req.body.destinationFolder;  

    await fs.copy(sourceFolder, destinationFolder);

    res.json('Folder copied successfully!');

    const copyPasteFolder = await CopyPasteFolder.create({ sourceFolder: sourceFolder, destinationFolder: destinationFolder });
    console.log("Copy and Paste folder done", copyPasteFolder);
    res.status(200).json({ msg: "Copy and Paste folder done." });

  

  } catch (err) {
    console.error('Error handling request:', err);
    res.status(500).json('Error copying folder');
  }
});

module.exports = router;