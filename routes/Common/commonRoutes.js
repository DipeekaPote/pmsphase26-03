const express = require('express')
const router = express.Router()
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const { createRole, getRoles, getRole, deleteRole, updateRole } = require('../../controllers/Common/roleControler')
const { createTag, getTag, getTags, deleteTag, updateTag } = require('../../controllers/Common/tagController')
const { createAccessRight, getAccessRight, getAccessRights, deleteAccessRight, updateAccessRight } = require('../../controllers/Common/accessRightsController')
const { createContact, getContact, getContacts, deleteContact, updateContact, getContactsList } = require('../../controllers/Common/contactController')
const { createUser, getUsers, getUser, deleteUser, updateUser, adminSignup, getUserByEmail, updateUserPassword, updateLoginStatus, getUserListbyId } = require("../../controllers/Common/userController");
const { validateToken, logout, cleanupBlacklist } = require("../../controllers/middlewares/authJwt");
const { generatetoken } = require("../../controllers/Common/loginController");
const { adminLogin } = require("../../controllers/Common/loginController");
const { createFolderTemplate, getFolders, getFolder, deleteFolderTemplate, updateFolderTemplate,deleteFile, downloadfile, deleteFolder, downloadfolder, getFolderStructure, createfolder,defaultfolderStructure } = require("../../controllers/Common/folderTemplateController");
const { createSortJobsBy,  getSortJobsBy,  getSortJobBy,  deleteSortJobsBy,  updateSortJobsBy} = require("../../controllers/Common/sortJobsByController")
const { getAutomations,  getAutomation,  createAutomation,  deleteAutomation,  updateAutomation} = require("../../controllers/Common/automationsController");


//*******************ROLES START********************* */
router.get('/role',getRoles)
router.get('/role/:id',getRole)
router.post('/role',createRole)
router.delete('/role/:id',deleteRole)
router.patch('/role/:id',updateRole)
//*******************ROLES END********************* */

//*******************USER START********************* */
router.post("/login/generatetoken", generatetoken);
router.get('/login/verifytoken', validateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});
router.post('/login/logout', validateToken, logout)
router.post("/login", adminLogin);
router.post("/login/signup", adminSignup);     //It is also for create user
router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);
router.get("/user/email/getuserbyemail/:email", getUserByEmail);
router.post("/updateUserLoginStatus", updateLoginStatus);
router.get('/resetpassword/verifytoken', validateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});
router.patch("/user/password/updateuserpassword/", updateUserPassword);
router.get("/user/userlist/list/:id", getUserListbyId);

//*******************USER END********************* */


//*******************TAG START********************* */
router.get('/tag', getTags)
router.get('/tag/:id', getTag)
router.post('/tag', createTag)
router.delete('/tag/:id',deleteTag)
router.patch('/tag/:id',updateTag)

//*******************TAG END********************* */


//*******************ACCESS RIGHTS START********************* */
router.get('/accessright',getAccessRights)
router.get('/accessright/:id',getAccessRight)
router.post('/accessright',createAccessRight)
router.delete('/accessright/:id',deleteAccessRight)
router.patch('/accessright/:id', updateAccessRight)

//*******************ACCESS RIGHTS END********************* */


//*******************CONTACT START********************* */
router.get('/contact',getContacts)
router.get('/contact/:id', getContact)
router.post('/contact', createContact)
router.delete('/contact/:id', deleteContact)
router.patch('/contact/:id', updateContact)
router.get('/contact/contactlist/list/', getContactsList)

//*******************CONTACT END********************* */

//*******************Folders START********************* */

const storage = multer.diskStorage({

      destination: (req, file, cb) => {
      const folder = req.body.folder; // Get the folder from the request parameters

      console.log(req.body.folder);

      const uploadPath = path.join("uploads", req.body.folder);

      console.log(uploadPath);

      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, uploadPath);
        }
      });
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

router.get('/folder', getFolders)
router.post('/folder', createFolderTemplate)
router.get('/folder/:id', getFolder)
router.post("/upload/file/", upload.single("file"), (req, res) => {
    res.send("File uploaded successfully!");
});
router.post("/upload/folder/", upload.single("folder"), (req, res) => {
  res.send("Folder uploaded successfully!");
});
router.delete('/deleteFile/File', deleteFile)
router.delete('/deleteFolder', deleteFolder)
router.get("/download/:folder/:filename", downloadfile)
router.get("/download/:folder", downloadfolder)
router.delete("/folder/:id", deleteFolderTemplate)
router.patch("/folder/:id", updateFolderTemplate)
router.get('/folder-structure/:folderTemplateId', getFolderStructure);
router.get('/folder-structure', defaultfolderStructure);
router.post('/folder/createfolder', createfolder)

//*******************Folders END********************* */



//*******************Sory Jobs By START********************* */
router.get('/sortjobby', getSortJobsBy)
router.get('/sortjobby/:id', getSortJobBy)
router.post('/sortjobby', createSortJobsBy)
router.delete('/sortjobby/:id', deleteSortJobsBy)
router.patch('/sortjobby/:id', updateSortJobsBy)

//*******************Sory Jobs By END********************* */

//*******************Automations START********************* */
router.get('/automations', getAutomations)
router.get('/automations/:id', getAutomation)
router.post('/automations', createAutomation)
router.delete('/automations/:id', deleteAutomation)
router.patch('/automations/:id', updateAutomation)

//*******************Sory Jobs By END********************* */


module.exports = router

