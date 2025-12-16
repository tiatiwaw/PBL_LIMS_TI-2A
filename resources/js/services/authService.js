import api from "@/lib/api";
import { serviceMethods } from "./baseService";

const extractErrorMessage = (error) => {
    // Check if error response exists
    if (error.response?.data) {
        const data = error.response.data;
        
        // If server returns message
        if (data.message) {
            return data.message;
        }
        
        // If server returns validation errors
        if (data.errors) {
            const firstError = Object.values(data.errors)[0];
            if (Array.isArray(firstError)) {
                return firstError[0];
            }
            return firstError;
        }
    }
    
    // Default error messages by status
    if (error.response?.status === 401) {
        return "Kredensial yang Anda masukkan tidak valid.";
    }
    
    if (error.response?.status === 422) {
        return "Validasi data gagal. Silahkan periksa kembali input Anda.";
    }
    
    if (error.response?.status === 500) {
        return "Terjadi kesalahan server. Silahkan coba lagi nanti.";
    }
    
    if (error.message === "Network Error") {
        return "Gagal terhubung ke server. Periksa koneksi internet Anda.";
    }
    
    return error.message || "Terjadi kesalahan yang tidak diketahui.";
};

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

export { extractErrorMessage };