interface AppointmentDetails {
    petName: string;
    ownerName: string;
    doctorName: string;
    appointmentType: string;
    appointmentDate: string; 
    appointmentTime: string; 
}

export const MailTemplate = (
    details: AppointmentDetails
): string => {
    
    const title = 'Confirmação do Agendamento'; 
    const contentHTML = `
        <p style="margin-bottom: 20px;">
            Olá <strong>${details.ownerName}</strong>,
        </p>
        <p style="margin-bottom: 20px;">
            Este é o comprovante da sua consulta veterinária. Por favor, guarde estas informações:
        </p>
        
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Detalhes da Consulta</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 8px;"><strong>Pet:</strong> ${details.petName}</li>
                <li style="margin-bottom: 8px;"><strong>Tutor:</strong> ${details.ownerName}</li>
                <li style="margin-bottom: 8px;"><strong>Tipo:</strong> ${details.appointmentType}</li>
                <li style="margin-bottom: 8px;"><strong>Médico:</strong> ${details.doctorName}</li>
                <li style="margin-bottom: 8px;"><strong>Data e Hora:</strong> ${details.appointmentDate} às ${details.appointmentTime}</li>
            </ul>
        </div>
        
        <p style="margin-top: 20px;">
            Aguardamos você!
        </p>
    `;
    return contentHTML;
};
