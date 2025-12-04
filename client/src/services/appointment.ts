import api from "./api";

export async function getAppointments() {
    try {
        const response = await api.get(`/appointments`);
        return response.data;
    } catch(error) {
        console.error('Error getting appointment data:', error);
        return null;
    }
}

export async function getAppointmentById(id: number) {
    try {
        const response = await api.get(`/appointments/${id}`);
        return response.data;
    } catch(error) {
        console.error('Error getting appointment data by id:', error);
        return null;
    }
}

export async function createAppointment(appointmentData: any) {
    try {
        const response = await api.post(`/appointments`, appointmentData);
        return response.data;
    } catch(error) {
        console.error('Error creating appointment data:', error);
        return null;
    }
}

export async function deleteAppointment(id: number) {
    try {
        const response = await api.delete(`/appointments/${id}`);
        return response.data;
    } catch(error) {
        console.error('Error deleting appointment data:', error);
        return null;
    }
}

export async function updateAppointment(id: number, updateData: any) {
    try {
        const response = await api.put(`/appointments/${id}`, updateData);
        return response.data;
    } catch(error) {
        console.error('Error updating appointment data:', error);
        return null;
    }
}


export async function sendAppointmentConfirmation(data: any) {
    try {
        const response = await api.post('/mail', data);
        return response.data;
    } catch (error) {
        console.error('Error sending email', error);
        throw new Error('Falha na comunicação com o serviço de e-mail.');
    }
}