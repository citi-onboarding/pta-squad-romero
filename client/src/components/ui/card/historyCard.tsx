interface AppointmentCardProps {
    appointmentDate: string;
    appointmentTime: string;
    doctorName: string;
    appointmentType: string;
}

export default function AppointmentCard({
    appointmentDate,
    appointmentTime,
    doctorName,
    appointmentType
}: AppointmentCardProps) {
    
    return (
    <div>
        <div className="p-4 border rounded bg-yellow-400 text-green-500">
            <p>{appointmentDate}</p>
            <p>{appointmentTime}</p>
            <p>{appointmentType}</p>
            <p>{doctorName}</p>
        </div>
    </div>)
    
}