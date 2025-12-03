import api from '../services/api'

export const getAppointments = async () => { // serch for all the appointments
    try {
        const response = await api.get('/appointments');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        return [];
    }
}