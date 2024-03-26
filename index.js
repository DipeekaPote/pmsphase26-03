const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const https = require("https")

// Read from .env if not available then defaults to 4000
const port = process.env.PORT || 2000;
const secretKey = process.env.TOKEN_KEY;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false
}))

//Cors Polycy 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Set the header to 'true' to allow credentials
  next();
});

// connect to the db
const connectToDatabase = require("../pmsbackend/config/connectDb");
const dbConStatus = connectToDatabase();


//! Common Routes
const commonRoutes = require("../pmsbackend/routes/Common/commonRoutes");
app.use("/common", commonRoutes);


//! Admin Routes
const adminRoutes = require("../pmsbackend/routes/Admin/adminRoutes");
app.use("/admin", adminRoutes);


//! otp
const otpController = require("../pmsbackend/controllers/middlewares/otpController");
app.use("/", otpController);


//! resetpassword
const resetpassword = require("../pmsbackend/controllers/middlewares/resetPasswordController");
app.use("/", resetpassword);


//! copy-paste folder
const copyPasteFolder = require("../pmsbackend/controllers/middlewares/copypastefolderController");
app.use("/", copyPasteFolder);


//! Workfolw Routes
const workflowRoutes = require("../pmsbackend/routes/Workflow/pipelineRoute");
app.use("/workflow", workflowRoutes);






app.listen(port, () => {
  console.log(`Server is running on port http://127.0.0.1:${port}`);
});

app.get('/current-timestamp', (req, res) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
  res.send(`Current timestamp is: ${currentTimestamp}`);
});




// //********************************CREATE FOLDER ************************** */


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
//     // Check if folder name is provided in request body
//     if (req.body.folderName) {
//       const folderPath = path.join(uploadDir, req.body.folderName);
//       // Create the folder if it doesn't exist
//       if (!fs.existsSync(folderPath)) {
//         fs.mkdirSync(folderPath);
     
//       }
//       cb(null, folderPath);
//       console.log(folderPath)

//     } else {
//       cb(null, uploadDir);
//     }
//   },
//   filename: function (req, file, cb) {
//     // Define the filename for uploaded files
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// // Create a Multer instance with the specified storage configuration
// const upload = multer({ storage: storage });

// // Route handler for file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.send('File uploaded successfully');
// });




// //******************SSL Certificate */
// const fs = require('fs');

// // Load SSL certificate and private key
// const options = {
//   key: fs.readFileSync("C:/Windows/System32/server.key"),
//   cert: fs.readFileSync('C:/Windows/System32/server.cert')
// };

// // Define your routes
// app.get('/', (req, res) => {
//   res.send('Hello, HTTPS!');
// });


// // Ignore SSL certificate errors
// const agent = new https.Agent({
//   rejectUnauthorized: false
// });

// // Make HTTPS request with custom agent
// https.get({
//   hostname: 'example.com',
//   path: '/',
//   agent // Use the custom agent
// }, (response) => {
//   // Handle response
// });

// // Create HTTPS server
// const server = https.createServer(options, app);

// // Start the server
// const PORT = 443; // HTTPS default port
// server.listen(PORT, () => {
//   console.log(`Server running on port http://127.0.0.1:${PORT}`);
// });
// //******************SSL Certificate */

