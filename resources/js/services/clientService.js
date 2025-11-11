import { serviceMethods } from "./baseService";

export const clientService = {
    dashboard: serviceMethods("/client", {
        useFormData: false,
    }),
    order: (id) => serviceMethods(`/client/orders/${id}`, { 
        useFormData: false,
    }),
    history: (id) => serviceMethods(`/client/orders/${id}/status`, {
        useFormData: false,
    }),

};
