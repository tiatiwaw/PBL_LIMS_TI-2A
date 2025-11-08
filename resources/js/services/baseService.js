import api from "@/lib/api";

export const serviceMethods = (baseUrl) => ({
    getAll: (params = {}) =>
        api.get(baseUrl, { params }).then((res) => res.data),
    getById: (id) => api.get(`${baseUrl}/${id}`).then((res) => res.data),
    create: (data) => api.post(baseUrl, data).then((res) => res.data),
    update: (id, data) =>
        api.put(`${baseUrl}/${id}`, data).then((res) => res.data),
    delete: (id) => api.delete(`${baseUrl}/${id}`).then((res) => res.data),
});
