
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const fs=require('fs'); 
const nodemailer = require('nodemailer');

admin.initializeApp();

const gmailEmail = "erik@nomadpitstops.com";
const gmailPassword = "raspberry0258#";
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

var htmlmail = fs.readFileSync(__dirname+'/../html/welcome.html','utf-8').toString();

export const sendWelcomeEmailTrigger = functions.auth
    .user()
    .onCreate(async (user:any) => {
        const recipent_email = user.email; 
        return await sendWelcomeEmail(recipent_email);

    });

export const sendWelcomeEmail = async (email:string) => {
    const mailOptions = {
        from: `"Erik Badger" <${gmailEmail}>`,
        to: email,
        subject: 'Welcome To Nomad Pit Stops',
        html: htmlmail
    };

    try {
        await mailTransport.sendMail(mailOptions);
        console.log('mail send');

    } catch(error) {
        console.error('There was an error while sending the email:', error);
    }
    return null; 
}

export const logEmailString = () => console.log(htmlmail);
