
const FolderTemplate = require('../../models/Common/folderTemplateModel.js');

const fs = require('fs');
const fsPromises = require('fs').promises;
const mongoose = require("mongoose");
const path = require('path');
//const uploads = require('../../uploads')

// Create folder
const createFolderTemplate = async (req, res) => {
    const { templatename, active } = req.body;

    try {
        let newFolder;

        const existingFolderTemplate = await FolderTemplate.findOne({ templatename });

        if (existingFolderTemplate) {
            return res.status(400).json({ message: "Folder Template already exists" });
        }

         newFolder = await FolderTemplate.create({ templatename, active });

        // Create folder based on newAccount._id
        const folderTemplateIdFolder = `uploads/FolderTemplates/${newFolder._id}`;
        if (!fs.existsSync(folderTemplateIdFolder)) {
            fs.mkdirSync(folderTemplateIdFolder, { recursive: true });
        }

        console.log(folderTemplateIdFolder);

        // Update folderpath in newFolder object
        newFolder.folderpath = folderTemplateIdFolder;
        await newFolder.save();

        // Create subfolder under accountIdFolder
        const subFolder1 = `${folderTemplateIdFolder}/Client uploaded documents`; // Change 'subfolder' to your desired subfolder name
        if (!fs.existsSync(subFolder1)) {
            fs.mkdirSync(subFolder1);
        }
        fs.chmodSync(subFolder1, 0o755);   //Clients can view and edit files in this folder

        // Create subfolder under accountIdFolder
        const subFolder2 = `${folderTemplateIdFolder}/Firm docs shared with client`; // Change 'subfolder' to your desired subfolder name
        if (!fs.existsSync(subFolder2)) {
            fs.mkdirSync(subFolder2);
        }
        fs.chmodSync(subFolder2, 0o555);   //Clients can only view files in this folder

        // Create subfolder under accountIdFolder
        const subFolder3 = `${folderTemplateIdFolder}/Private`; // Change 'subfolder' to your desired subfolder name
        if (!fs.existsSync(subFolder3)) {
            fs.mkdirSync(subFolder3);
        }
        fs.chmodSync(subFolder3, 0o300);

        res.status(201).send(newFolder);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

};

// get all folder
const getFolders = async (req, res) => {

    try {
        const folderTemplates = await FolderTemplate.find();
        res.status(200).json({ message: "Folder Templates retrieved successfully", folderTemplates });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

};

// get folder
const getFolder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Folder Template ID" });
    }

    try {
        const folderTemplate = await FolderTemplate.findById(id);

        if (!folderTemplate) {
            return res.status(404).json({ error: "No such Folder Template" });
        }

        res.status(200).json({ message: "Folder Templates retrieved successfully", folderTemplate });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

};


//delete a FolderTemplate

const deleteFolderTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Folder Template ID" });
    }

    try {
        const deletedFolderTemplate = await FolderTemplate.findByIdAndDelete({ _id: id });
        if (!deletedFolderTemplate) {
            return res.status(404).json({ error: "No such Folder Template" });
        }
        res.status(200).json({ message: " Folder Template deleted successfully", deletedFolderTemplate });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// update a FolderTemplate
const updateFolderTemplate = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid  Folder Template ID" });
    }

    try {
        const updatedFolderTemplate  = await FolderTemplate.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // This option ensures that the updated document is returned
        );

        if (!updatedFolderTemplate) {
            return res.status(404).json({ error: "No such Folder Template" });
        }

        res.status(200).json({ message: "Folder Template updated successfully", FolderTemplate: updatedFolderTemplate });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete file

const deleteFile = async (req,res) =>{

  const folderName = req.body.folderName;
  const fileName = req.body.fileName;

  try {
      // Check if both folder and filename parameters are present
      if (!folderName || !fileName) {
          return res.status(400).json({ error: "Both folder and filename parameters are required" });
      }

      const filePath = path.join('uploads', folderName, fileName);

      // Check if the file exists before attempting to delete it
      if (!fs.existsSync(filePath)) {
          return res.status(404).json({ error: "File not found", details: `The file ${filePath} does not exist` });
      }

      // File exists, proceed with deletion
      fs.unlink(filePath, (err) => {
          if (err) {
              console.error("Error deleting file:", err);
              return res.status(500).json({ error: "Internal Server Error", details: err.message });
          }
          res.status(200).json({ message: "File deleted successfully" });
      });
  } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
  }

};


// Delete Folder
const deleteFolder =  async (req, res) => {
  const folderName = req.body.folderName;
  const folderpath = req.body.folderpath;

  try {
    const folderPath = path.join('uploads/FolderTemplates', folderpath, folderName);
      // Use recursive option to delete the folder and its contents
      await fs.rm(folderPath, { recursive: true }, (err) => {
          if (err) {
              console.error("Error deleting folder:", err);
              res.status(500).json({ error: "Internal Server Error", details: err.message });
              return;
          }
          res.status(200).json({ message: "Folder deleted successfully" });
      });
  } catch (error) {
      console.error("Error deleting folder:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};



// download file
const downloadfile = async (req, res) => {
    try {
      const fileName = req.params.filename;
      const folder = req.params.folder;
  
      // Sanitize file and folder names
      const sanitizedFileName = path.basename(fileName);
      const sanitizedFolder = path.basename(folder);
  
      const filePath = path.join("uploads", sanitizedFolder, sanitizedFileName);
  console.log(filePath)
      res.download(filePath, (err) => {
        if (err) {
          // Handle errors (e.g., file not found)
          res.status(404).send("File not found");
        }
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).send("Internal Server Error");
    }
  };


  // download folder
  const downloadfolder = async (req, res) => {
    const folderName = req.params.folder;
    const folderPath = path.join(__dirname, "uploads", folderName);
  
    try {
      const zipFilePath = path.join(__dirname, "temp", `${folderName}.zip`);
      const zip = new AdmZip();
  
      await addFilesToZip(zip, folderPath, folderName);
  
      zip.writeZip(zipFilePath);
  
      res.download(zipFilePath, `${folderName}.zip`, async () => {
        await fs.unlink(zipFilePath);
      });
    } catch (error) {
      console.error("Error creating zip file:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  const getFolderStructure = async (req, res) => {
    const { folderTemplateId } = req.params;

    try {
        // Find the folder template by its ID
        const folderTemplate = await FolderTemplate.findById(folderTemplateId);

        if (!folderTemplate) {
            return res.status(404).json({ message: "Folder Template not found" });
        }

        // Define the root folder path
        const rootFolder = `uploads/FolderTemplates/${folderTemplateId}`;

        // Define a function to recursively list the contents of a directory
        const listDirectory = (folderPath) => {
            const contents = fs.readdirSync(folderPath, { withFileTypes: true });

            return contents.map(item => {
                const fullPath = path.join(folderPath, item.name);
                return item.isDirectory() ? { name: item.name, children: listDirectory(fullPath) } : { name: item.name };
            });
        };

        // Get the folder structure recursively starting from the root folder
        const folderStructure = listDirectory(rootFolder);

        res.json({ folderTemplate, folderStructure });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



const defaultfolderStructure = async (req, res) => {
    try {
        // Define the default folder path
        const defaultFolderPath = 'uploads/FolderTemplates/Default_Folders';

        // Define a function to recursively list the contents of a directory
        const listDirectory = (folderPath) => {
            const contents = fs.readdirSync(folderPath, { withFileTypes: true });

            return contents.map(item => {
                const fullPath = path.join(folderPath, item.name);
                return item.isDirectory() ? { name: item.name, children: listDirectory(fullPath) } : { name: item.name };
            });
        };

        // Get the folder structure recursively starting from the default folder
        const folderStructure = listDirectory(defaultFolderPath);

        res.json({ folderStructure });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// Endpoint to create a folder
const createfolder = async (req, res) => {
    const foldername = req.body.foldername; // Assuming folderName is sent in the request body
    const folderpath = req.body.folderpath;

    const folderPath = path.join('uploads/FolderTemplates', folderpath, foldername);

    // Check if the folder already exists
    if (fs.existsSync(folderPath)) {
        return res.status(400).json({ message: 'Folder already exists' });
    }

    // Create the folder
    fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to create folder', error: err });
        }
        res.status(201).json({ message: 'Folder created successfully' });
    });
};



module.exports = {
    createFolderTemplate,
    getFolders,
    getFolder,
    deleteFolderTemplate,
    updateFolderTemplate,
    deleteFile,
    deleteFolder,
    downloadfile,
    downloadfolder,
    getFolderStructure,
    createfolder,
    defaultfolderStructure
}