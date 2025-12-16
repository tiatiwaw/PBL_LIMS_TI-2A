import { serviceMethods } from "./baseService";

export const staffService = {
    clients: serviceMethods("/staff/manage-clients", { useFormData: true }),
    makeOrders: serviceMethods("/staff/orders/make-order", {
        useFormData: false,
    }),
    allOrders: serviceMethods("/staff/orders/all-orders", {
        useFormData: false,
    }),
    samples: serviceMethods("staff/orders/samples", { useFormData: false }),
};
