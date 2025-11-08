import api from "@/lib/api";

export const authService = {
    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        if (response.data.success) {
            localStorage.setItem("auth_token", response.data.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.data.user)
            );
        }
        return response.data;
    },

    logout: async () => {
        await api.post("/auth/logout");

        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
    },

    getUser: async () => {
        const response = await api.get("/auth/user");
        return response.data;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem("auth_token");
    },

    getUserRole: () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        return user.role;
    },
};
