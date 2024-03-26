// const Folder = require('../../controllers/middlewares/folderModel');

// // // Function to create a default folder
// // async function createDefaultFolder(accountId) {
// //   try {
// //     // Create a default folder for the account
// //     await Folder.create({
// //       accountId: accountId,
// //       folderName: accountId,
// //       // Other default folder properties
// //     });
// //     console.log('Default folder created for account:', accountId);
// //   } catch (error) {
// //     console.error('Error creating default folder:', error);
// //   }
// // }




// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Define the destination folder for uploaded files
//     const uploadDir = 'uploads/';
//     // Create the upload directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }

//     const folderName = req.body; 

//     // Check if folder name is provided in request body
//     if (folderName) {
//       const folderPath = path.join(uploadDir, folderName);
//       // Create the folder if it doesn't exist
//       if (!fs.existsSync(folderPath)) {
//         fs.mkdirSync(folderPath);
//         console.log(folderPath)
//       }
//       cb(null, folderPath);
 

//     } else {
//       cb(null, uploadDir);
//     }
//   },
//   filename: function (req, file, cb) {

//     // Define the filename for uploaded files
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });


// module.exports = storage;

