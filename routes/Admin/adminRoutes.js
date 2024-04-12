const express = require('express')
const router = express.Router()

const { createAdmin, getAdmins, getAdmin, deleteAdmin, updateAdmin, updatePassword, getAdminByEmail } = require('../../controllers/Admin/adminSignupController')
const { createAccount, getAccount, getAccounts, updateAccount, deleteAccount, getAccountsList, getAccountsShortCode } = require('../../controllers/Admin/accountDetailsController')


//*******************ADMIN SIGNUP START********************* */
//GET all adminsignup 

router.get('/adminsignup', getAdmins)

//GET single adminsignup 

router.get('/adminsignup/:id', getAdmin)

//POST a new adminsignup

router.post('/adminsignup', createAdmin)

//DELETE a adminsignup 

router.delete('/adminsignup/:id', deleteAdmin)

//PATCH UPDATE a adminsignup 

router.patch('/adminsignup/:id', updateAdmin)

//PATCH UPDATE a Password 

router.get('/adminsignup/adminbyemail', getAdminByEmail)

router.patch('/adminsignup/updatepassword', updatePassword)

//*******************ADMIN SIGNUP END********************* */


//*******************ACCOUNT DETAILS START********************* */

//GET all accountdetails 

router.get('/accountdetails', getAccounts)

//GET single accountdetails 

router.get('/accountdetails/:id', getAccount)

//POST a new adminsignup

router.post('/accountdetails', createAccount)


// router.post('/accountdetails', upload.single('file'), async (req, res) => {
// createAccount
// });

//DELETE a adminsignup 

router.delete('/accountdetails/:id', deleteAccount)

//PATCH UPDATE a adminsignup 

router.patch('/accountdetails/:id', updateAccount)

//GET accountdetails List

router.get('/account/accountdetailslist/', getAccountsList)


//GET accountdetails List
router.get('/accountdetails/accountshortcode/:_id', getAccountsShortCode)

//*******************ACCOUNT DETAILS END********************* */



module.exports = router

