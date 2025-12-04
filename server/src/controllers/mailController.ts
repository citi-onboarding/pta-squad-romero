import { MailHandler } from "src/service";
import { MailTemplate } from "src/service";
import { Request, Response } from "express";

export async function sendMail(req: Request, res: Response) {
    try{
        const { userName, userEmail, subjectText } = req.body;

        const emailConfig = {
            userEmail,
            userName,
            subjectText,
            html: MailTemplate('xhsbsb', 'jsxvsjxvj', 'dhdscbvxsc', 'ajhdhd')
        }

        const mailResponse = await MailHandler(emailConfig);

        if (mailResponse){
            res.status(200).json({message: 'Email sent successfully'});
        } else {
            res.status(500).json({message: 'Error sending email'});
        }

    } catch(error){
        res.status(500).json({message: 'Error sending email'});
    };
}