
const express = require("express");
const sendEmail = require("../../controllers/middlewares/emailService");
const router = express.Router();
const nodemailer = require("nodemailer");
const secretKey = process.env.TOKEN_KEY;
const User = require('../../models/Common/userModel.js');
const { ConnectionStates } = require("mongoose");

router.post("/usersavedemail", async (req, res) => {

    const { email } = req.body;

    if (!email) {
        res.status(400).json({ status: 400, message: "Please provide all data." })
    }

    const result = {
        email
      }

   const mailSubject =  "User created Successfully."

    const loginlink = `http://localhost:3000`
    // HTML content for the email body
    const htmlPage = `
  <!doctype html>
<html lang="en">
<style>
    p {
        color: #0f172a;
        font-size: 18px;
        line-height: 29px;
        font-weight: 400;
        margin: 8px 0 16px;
    }

    h1 {
        color: #5566e5;
        font-weight: 700;
        font-size: 40px;
        line-height: 44px;
        margin-bottom: 4px;
    }

    h2 {
        color: #1b235c;
        font-size: 100px;
        font-weight: 400;
        line-height: 120px;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .container {
        text-align: center;
    }
</style>

<body>
    <header>
        <!-- place navbar here -->
    </header>
    <main>

        <div class="container ">
            <h1> Welcome to PMS </h1>
            <p>Your Account has been created successfully.</p>
            <p>Please click <link> ${loginlink}</link> to Login your account.</p> <!-- Include mailBody here -->
            <h5>"Welcome to "SNP Tax & Financials", where tax management meets simplicity. Our advanced software
                streamlines tax processes for individuals, businesses, and professionals, ensuring accuracy and
                efficiency. Experience a new era of financial ease with SNP Tax & Financials."</h5>
        </div>

    </main>

</body>

</html>`;

    // Create transporter with Outlook service and authentication
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rohitkumbhar7009@gmail.com",
            pass: "vwjz zrbe rwbe dhnj",
        },
    });

    const mailOptions = {
        from: "rohitkumbhar7009@gmail.com",
        to: email,
        subject: mailSubject,
        html: htmlPage,
    };


    const adminEmail = "dipeeka.pote52@gmail.com"; // Replace with actual admin email
    const mailOptionsAdmin = {
        from: "rohitkumbhar7009@gmail.com",
        to: adminEmail,
        subject: "New User Created",
        text: `A new user has been created with the email: ${email}`,
    };


    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent to user:", info.response);
            // Send email to admin after successfully sending email to user
            transporter.sendMail(mailOptionsAdmin, (error, info) => {
                if (error) {
                    console.error("Error sending email to admin:", error);
                } else {
                    console.log("Email sent to admin:", info.response);
                }
            });
            res.status(200).json({ status: 200, result });
        }
    });
});

module.exports = router;
