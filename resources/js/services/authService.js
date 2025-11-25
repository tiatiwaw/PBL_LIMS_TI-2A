import api from "@/lib/api";

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
};