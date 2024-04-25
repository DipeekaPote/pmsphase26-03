const User = require("../../models/Common/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const secretKey = process.env.TOKEN_KEY;


//todo Handle admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const token = req.headers.authorization; 

  try {
    const user = await User.login({ email, password });

    if (!user) {
      res.status(400).json({ error: "Invalid Details" })
    }

else{
  res.status(200).json({status:200, user });  
  console.log("Login Successfull.") 
} 
  }
   catch (error) {
  res.status(404).json({ error: error.message });
}
};


const generatetoken = async (req, res) => {
  const { email, password, expiryTime } = req.body;
  try {
    const user = await User.login({ email, password });

  

    if (!user) {
      res.status(422).json({ error: "Invalid Details" })
    }

    else{

      let expiresIn;
      switch(expiryTime){
        case expiryTime:
          expiresIn= expiryTime * 60 * 100;
      }


      const payload = {
        id: user._id,
        role: user.role
        // Add any other data you want to include in the payload
    };
    
      jwt.sign(payload, secretKey, { expiresIn: expiryTime }, (err, token) => {

      const result = {
        token
      }

       //cookigenerate
      res.cookie('usercookie', result, {
        httpOnly: true,
       
    });

      res.status(200).json({status:200, result });  
    
  res.send('JWT token is set as a cookie');
    console.log(req.body);
  });
} 
  }
   catch (error) {
  res.status(404).json({ error: error.message });
}
};


module.exports = { adminLogin, generatetoken };


