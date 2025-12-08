import { serviceMethods } from "./baseService";

export const clientService = {
    dashboard: serviceMethods("/client", {
        useFormData: false,
    }),
    order: serviceMethods("/client/orders", { 
        useFormData: false,
    }),
    history: serviceMethods("/client/orders/status", { 
        useFormData: false,
    }),
    payment: serviceMethods("/client/orders/payment", { 
            useFormData: false,
    }),
    transaction: serviceMethods("/client/orders/transaction", { 
            useFormData: false,
    }),
    receipt: serviceMethods("/client/orders/download-receipt", { 
            useFormData: false,
    }),
};
