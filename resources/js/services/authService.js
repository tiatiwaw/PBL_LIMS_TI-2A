import api from "@/lib/api";
import { serviceMethods } from "./baseService";

export const authService = {
    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    },

    logout: async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.warn("Logout API failed:", error);
        }
    },

    downloadReport: async (orderId) => {
        try {
            const response = await api.get(`/orders/download-report/${orderId}`, {
                responseType: 'blob',
            });
            return response;
        } catch (error) {
            // Re-throw dengan info yang lebih lengkap
            throw error;
        }
    },
};