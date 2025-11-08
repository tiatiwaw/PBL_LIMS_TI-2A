import api from "@/lib/api";

export const adminService = {
    getDashboard: async () => {
        const response = await api.get("/admin");
        return response.data;
    },

    // Users
    getUsers: async (params = {}) => {
        const response = await api.get("/admin/users", { params });
        return response.data;
    },

    createUser: async (data) => {
        const response = await api.post("/admin/users", data);
        return response.data;
    },

    updateUser: async (id, data) => {
        const response = await api.put(`/admin/users/${id}`, data);
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    },

    // Orders
    getOrders: async (params = {}) => {
        const response = await api.get("/admin/orders", { params });
        return response.data;
    },

    getOrder: async (id) => {
        const response = await api.get(`/admin/orders/${id}`);
        return response.data;
    },

    // Activities
    getActivities: async (params = {}) => {
        const response = await api.get("/admin/activities", { params });
        return response.data;
    },
};
