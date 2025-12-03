import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { error } from 'console';

dotenv.config();

async function MailHandler(emailConfig: {
    userName: string,
    userEmail: string,
    subjectText: string,
    html: string,
}){
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailConfig.userEmail,
            subject: emailConfig.subjectText,
            html: emailConfig.html,
        });
        return true;
    } catch(error){
        console.log(error);
        return false;
    };
}

export default MailHandler;