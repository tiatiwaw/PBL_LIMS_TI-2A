import { serviceMethods } from "./baseService";

// useFormData ditambahin buat kalo mau ada proses create, edit, delete aja

export const supervisorService = {
    orders: serviceMethods("/supervisor/orders", {
        useFormData: false,
    }),

    analysts: serviceMethods("/supervisor/analysts", {
        useFormData: false,
    }),
};
