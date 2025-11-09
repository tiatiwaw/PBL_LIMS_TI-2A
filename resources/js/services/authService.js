import api from "@/lib/api";

const handleAuthError = (error, defaultMessage = "Authentication error occurred") => {
    console.error("Auth service error:", error);
    const message = error.response?.data?.message || error.message || defaultMessage;
    throw new Error(message);
};

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post("/auth/login", credentials);
            return response.data;
        } catch (error) {
            handleAuthError(error, "Login failed");
        }
    },

    logout: async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.warn("Logout API failed:", error);
        }
    },

    getUser: async () => {
        try {
            const response = await api.get("/auth/user");
            return response.data;
        } catch (error) {
            handleAuthError(error, "Failed to fetch user data");
        }
    },

    async isAuthenticated() {
        try {
            await this.getUser();
            return true;
        } catch (error) {
            return false;
        }
    },
};