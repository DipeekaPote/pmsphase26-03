
const express = require("express");
const sendEmail = require("../../controllers/middlewares/emailService");
const router = express.Router();
const nodemailer = require("nodemailer");
const secretKey = process.env.TOKEN_KEY;
const Account = require('../../models/Admin/accountDetailsModel.js');
const EmailTemplate = require('../../models/Workflow/emailTemplate.js');
const { ConnectionStates } = require("mongoose");

router.post("/templatemailsend", async (req, res) => {

    const { email, emailtemplateid, accountid, emailbody, emailsubject } = req.body;

    if (!email || !emailtemplateid || !accountid) {
        res.status(400).json({ status: 400, message: "Please provide all data." })
    }

    const account = await Account.findById(accountid);
    const EmailTemp = await EmailTemplate.findById(emailtemplateid);



    // Function to replace placeholders with actual data
    const replacePlaceholders = (template, data) => {
        // Example: Replace [Account_Name] with actual data
        return template.replace(/\[([\w\s]+)\]/g, (match, placeholder) => {
            return data[placeholder.trim()] || ''; // Trim placeholder to remove leading/trailing spaces
        });
    };

    // Get the current date
    const currentDate = new Date();

    const lastDay = new Date(currentDate);
    lastDay.setDate(lastDay.getDate() - 1); // Subtract 1 day to get the last day

    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1); // Add 1 day to get the next day

    // Define options for formatting date
    const options = {
        weekday: 'long',          // Full name of the day of the week (e.g., "Monday")
        day: '2-digit',          // Two-digit day of the month (01 through 31)
        month: 'long',           // Full name of the month (e.g., "January")
        year: 'numeric',         // Four-digit year (e.g., 2022)
        week: 'numeric',         // ISO week of the year (1 through 53)
        monthNumber: '2-digit',  // Two-digit month number (01 through 12)
        quarter: 'numeric',      // Quarter of the year (1 through 4)
    };


    // Format the current date using options
    const currentFullDate = currentDate.toLocaleDateString('en-US', options);
    const currentDayNumber = currentDate.getDate();
    const currentDayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const currentWeek = currentDate.toLocaleDateString('en-US', { week: 'numeric' });
    const currentMonthNumber = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const currentMonthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
    const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3); // Calculate the quarter
    const currentYear = currentDate.getFullYear();

    // Format the last day using options
    const lastDayFullDate = lastDay.toLocaleDateString('en-US', options);
    const lastDayNumber = lastDay.getDate();
    const lastDayName = lastDay.toLocaleDateString('en-US', { weekday: 'long' });
    const lastWeek = lastDay.toLocaleDateString('en-US', { week: 'numeric' });
    const lastMonthNumber = lastDay.getMonth() + 1; // Months are zero-based, so add 1
    const lastMonthName = lastDay.toLocaleDateString('en-US', { month: 'long' });
    const lastQuarter = Math.floor((lastDay.getMonth() + 3) / 3); // Calculate the quarter
    const lastYear = lastDay.getFullYear();

    // Format the next day using options
    const nextDayFullDate = nextDay.toLocaleDateString('en-US', options);
    const nextDayNumber = nextDay.getDate();
    const nextDayName = nextDay.toLocaleDateString('en-US', { weekday: 'long' });
    const nextWeek = nextDay.toLocaleDateString('en-US', { week: 'numeric' });
    const nextMonthNumber = nextDay.getMonth() + 1; // Months are zero-based, so add 1
    const nextMonthName = nextDay.toLocaleDateString('en-US', { month: 'long' });
    const nextQuarter = Math.floor((nextDay.getMonth() + 3) / 3); // Calculate the quarter
    const nextYear = nextDay.getFullYear();

    // Replace placeholders in the email body
    const mailBody = replacePlaceholders(emailbody, {
        ACCOUNT_NAME: account.accountName,

        FIRST_NAME: account.accountName,

        CURRENT_DAY_FULL_DATE: currentFullDate,
        CURRENT_DAY_NUMBER: currentDayNumber,
        CURRENT_DAY_NAME: currentDayName,
        CURRENT_WEEK: currentWeek,
        CURRENT_MONTH_NUMBER: currentMonthNumber,
        CURRENT_MONTH_NAME: currentMonthName,
        CURRENT_QUARTER: currentQuarter,
        CURRENT_YEAR: currentYear,
        LAST_DAY_FULL_DATE: lastDayFullDate,
        LAST_DAY_NUMBER: lastDayNumber,
        LAST_DAY_NAME: lastDayName,
        LAST_WEEK: lastWeek,
        LAST_MONTH_NUMBER: lastMonthNumber,
        LAST_MONTH_NAME: lastMonthName,
        LAST_QUARTER: lastQuarter,
        LAST_YEAR: lastYear,
        NEXT_DAY_FULL_DATE: nextDayFullDate,
        NEXT_DAY_NUMBER: nextDayNumber,
        NEXT_DAY_NAME: nextDayName,
        NEXT_WEEK: nextWeek,
        NEXT_MONTH_NUMBER: nextMonthNumber,
        NEXT_MONTH_NAME: nextMonthName,
        NEXT_QUARTER: nextQuarter,
        NEXT_YEAR: nextYear,
    });

    // Replace placeholders in the email body
    const mailSubject = replacePlaceholders(emailsubject, {
        ACCOUNT_NAME: account.accountName,

        FIRST_NAME: account.accountName,

        CURRENT_DAY_FULL_DATE: currentFullDate,
        CURRENT_DAY_NUMBER: currentDayNumber,
        CURRENT_DAY_NAME: currentDayName,
        CURRENT_WEEK: currentWeek,
        CURRENT_MONTH_NUMBER: currentMonthNumber,
        CURRENT_MONTH_NAME: currentMonthName,
        CURRENT_QUARTER: currentQuarter,
        CURRENT_YEAR: currentYear,
        LAST_DAY_FULL_DATE: lastDayFullDate,
        LAST_DAY_NUMBER: lastDayNumber,
        LAST_DAY_NAME: lastDayName,
        LAST_WEEK: lastWeek,
        LAST_MONTH_NUMBER: lastMonthNumber,
        LAST_MONTH_NAME: lastMonthName,
        LAST_QUARTER: lastQuarter,
        LAST_YEAR: lastYear,
        NEXT_DAY_FULL_DATE: nextDayFullDate,
        NEXT_DAY_NUMBER: nextDayNumber,
        NEXT_DAY_NAME: nextDayName,
        NEXT_WEEK: nextWeek,
        NEXT_MONTH_NUMBER: nextMonthNumber,
        NEXT_MONTH_NAME: nextMonthName,
        NEXT_QUARTER: nextQuarter,
        NEXT_YEAR: nextYear,
        // Add more data here as needed
    });

    const result = mailBody;

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
            ${mailBody} <!-- Include mailBody here -->
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

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
            res.status(200).json({ status: 200, result });

            // res.status(200).json({status:200, result });        
        }
    });
});

module.exports = router;
