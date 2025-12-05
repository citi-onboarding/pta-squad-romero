import { MailHandler } from "src/service";
import { MailTemplate } from "src/service"; 
import { Request, Response } from "express";

export async function sendMail(req: Request, res: Response) {
    try{
        // Necessary Data
        const { userEmail, petName, ownerName, doctorName, appointmentType, appointmentDate, appointmentTime } = req.body;

        const appointmentDetails = {
            petName, ownerName, doctorName, appointmentType, appointmentDate, appointmentTime
        };

        const emailHTML = MailTemplate(appointmentDetails); 
        const emailConfig = {
            userEmail,
            userName: ownerName, 
            subjectText: `Confirmação de Agendamento - ${petName}`,
            html: emailHTML
        }

        // Send
        const mailResponse = await MailHandler(emailConfig);

        if (mailResponse){
            res.status(200).json({message: 'Email sent successfully'});
        } else {
            res.status(500).json({message: 'Error sending email'});
        }

    } catch(error){
        console.error('Erro ao enviar confirmação de consulta:', error);
        res.status(500).json({message: 'Error sending email'});
    };
}