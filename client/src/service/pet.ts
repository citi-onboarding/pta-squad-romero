import api from "./api";

export async function getPet() {
    try {
        const response = await api.get(`/pet`);
        return response.data;
    } catch(error) {
        console.error('Error getting pet data:', error);
        return null;
    }
}

export async function getPetById(id: number) {
    try {
        const response = await api.get(`/pet/${id}`);
        return response.data;
    } catch(error) {
        console.error('Error getting pet data by id:', error);
        return null;
    }
}

export async function createPet(petData: any) {
    try {
        const response = await api.post(`/pet`, petData);
        return response.data;
    } catch(error) {
        console.error('Error creating pet data:', error);
        return null;
    }
}

export async function deletePet(id: number) {
    try {
        const response = await api.delete(`/pet/${id}`);
        return response.data;
    } catch(error) {
        console.error('Error deleting pet data:', error);
        return null;
    }
}

export async function updatePet(id: number, updateData: any) {
    try {
        const response = await api.put(`/pet/${id}`, updateData);
        return response.data;
    } catch(error) {
        console.error('Error updating pet data:', error);
        return null;
    }
}