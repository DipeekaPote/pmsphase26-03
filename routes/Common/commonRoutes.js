const express = require('express')
const router = express.Router()
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const { createRole, getRoles, getRole, deleteRole, updateRole } = require('../../controllers/Common/roleControler')
const { createTag, getTag, getTags, deleteTag, updateTag } = require('../../controllers/Common/tagController')
const { createAccessRight, getAccessRight, getAccessRights, deleteAccessRight, updateAccessRight } = require('../../controllers/Common/accessRightsController')
const { createContact, getContact, getContacts, deleteContact, updateContact, getContactsList } = require('../../controllers/Common/contactController')
const { createUser, getUsers, getUser, deleteUser, updateUser, adminSignup, getUserByEmail, updateUserPassword, updateLoginStatus } = require("../../controllers/Common/userController");
const { validateToken } = require("../../controllers/middlewares/authJwt");
const { generatetoken } = require("../../controllers/Common/loginController");
const { adminLogin } = require("../../controllers/Common/loginController");
const { createFolderTemplate, getFolders, getFolder, deleteFolderTemplate, updateFolderTemplate,deleteFile, downloadfile, deleteFolder, downloadfolder, getFolderStructure, createfolder,defaultfolderStructure } = require("../../controllers/Common/folderTemplateController");
const { createSortJobsBy,  getSortJobsBy,  getSortJobBy,  deleteSortJobsBy,  updateSortJobsBy} = require("../../controllers/Common/sortJobsByController")
const { getAutomations,  getAutomation,  createAutomation,  deleteAutomation,  updateAutomation} = require("../../controllers/Common/automationsController")

//*******************ROLES START********************* */
//GET all roles 

router.get('/role',getRoles)

//GET single role 

router.get('/role/:id',getRole)

//POST a new role

router.post('/role',createRole)
    
//DELETE a role 

router.delete('/role/:id',deleteRole)

//PATCH UPDATE a role 

router.patch('/role/:id',updateRole)

//*******************ROLES END********************* */

//*******************USER START********************* */
//todo JWT token generate

router.post("/login/generatetoken", generatetoken);

//todo  JWT token Verify
router.get('/login/verifytoken', validateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

// user logout
router.get("/login/logout", validateToken, async(req,res)=>{

    const currentTimeUnix = Date.now();

if (req.user.exp === currentTimeUnix){
    res.status(400).json({status:400})
}
else{
    res.clearCookie("usercookie",{path:"/"});
    res.status(200).json({status:200})
    console.log("Logout Successfull")
}
 })

//todo Admin application Login
router.post("/login", adminLogin);

router.post("/login/signup", adminSignup);     //It is also for create user

//! sop api
//GET all Users

router.get("/user", getUsers);

//GET single Users

router.get("/user/:id", getUser);

//POST a new User

router.post("/user", createUser);

//DELETE a User

router.delete("/user/:id", deleteUser);

//PATCH UPDATE a User

router.patch("/user/:id", updateUser);

//Get a User by email

router.get("/user/email/getuserbyemail", getUserByEmail);

//Get a User by email

router.post("/updateUserLoginStatus", updateLoginStatus);

//todo  JWT token Verify for reset password
router.get('/resetpassword/verifytoken', validateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

//PATCH UPDATE a User

router.patch("/user/password/updateuserpassword/", updateUserPassword);


//*******************USER END********************* */


//*******************TAG START********************* */

//GET all tags 

router.get('/tag', getTags)

//GET single tag 

router.get('/tag/:id', getTag)
 
//POST a new tag

router.post('/tag', createTag)
    
//DELETE a tag 

router.delete('/tag/:id',deleteTag)

//PATCH UPDATE a tag 

router.patch('/tag/:id',updateTag)

//*******************TAG END********************* */


//*******************ACCESS RIGHTS START********************* */

//GET all accessright 

router.get('/accessright',getAccessRights)

//GET single accessright 

router.get('/accessright/:id',getAccessRight)

//POST a new accessright

router.post('/accessright',createAccessRight)
    
//DELETE a accessright 

router.delete('/accessright/:id',deleteAccessRight)

//PATCH UPDATE a accessright 

router.patch('/accessright/:id', updateAccessRight)

//*******************ACCESS RIGHTS END********************* */


//*******************CONTACT START********************* */

//GET all contact 

router.get('/contact',getContacts)

//GET single contact 

router.get('/contact/:id', getContact)

//POST a new contact

router.post('/contact', createContact)
    
//DELETE a contact 

router.delete('/contact/:id', deleteContact)

//PATCH UPDATE a contact 

router.patch('/contact/:id', updateContact)

//GET all contact  list

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

  //const uploadfolder = multer({ storage: storage }).array('file');

//GET all Folders 

router.get('/folder', getFolders)

//POST a new Folder

router.post('/folder', createFolderTemplate)

//GET single Folder 

router.get('/folder/:id', getFolder)
    
// Handle file uploads to a specific folder
router.post("/upload/file/", upload.single("file"), (req, res) => {
    res.send("File uploaded successfully!");
});

// Handle file uploads to a specific folder
router.post("/upload/folder/", upload.single("folder"), (req, res) => {
  res.send("Folder uploaded successfully!");
});


// // Handle folder uploads to a specific folder
// router.post("/upload/folder", (req, res) => {
//     uploadfolder(req, res, (err) => {
//         if (err) {
//           return res.status(500).send("Error uploading files: " + err);
//         }
//     res.send("File uploaded successfully!");
// });

// });

//delete single file 

router.delete('/deleteFile/File', deleteFile)

//delete single Folder 

router.delete('/deleteFolder', deleteFolder)

// download file
router.get("/download/:folder/:filename", downloadfile)

// download folder
router.get("/download/:folder", downloadfolder)


// delete Folder Template
router.delete("/folder/:id", deleteFolderTemplate)

//  update Folder Template
router.patch("/folder/:id", updateFolderTemplate)

//  getFolderStructure 
router.get('/folder-structure/:folderTemplateId', getFolderStructure);

//get defaultfolderstructure
router.get('/folder-structure', defaultfolderStructure);

//POST a new Folder

router.post('/folder/createfolder', createfolder)

//*******************Folders END********************* */



//*******************Sory Jobs By START********************* */

//GET all sortjobby 

router.get('/sortjobby', getSortJobsBy)

//GET single sortjobby 

router.get('/sortjobby/:id', getSortJobBy)

//POST a new sortjobby

router.post('/sortjobby', createSortJobsBy)
    
//DELETE a sortjobby 

router.delete('/sortjobby/:id', deleteSortJobsBy)

//PATCH UPDATE a sortjobby 

router.patch('/sortjobby/:id', updateSortJobsBy)

//*******************Sory Jobs By END********************* */



//*******************Automations START********************* */

//GET all automations 

router.get('/automations', getAutomations)

//GET single automations 

router.get('/automations/:id', getAutomation)

//POST a new automations

router.post('/automations', createAutomation)
    
//DELETE a sortjobby 

router.delete('/automations/:id', deleteAutomation)

//PATCH UPDATE a sortjobby 

router.patch('/automations/:id', updateAutomation)

//*******************Sory Jobs By END********************* */


module.exports = router

