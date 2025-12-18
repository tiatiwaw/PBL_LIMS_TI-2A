import { serviceMethods } from "./baseService";

export const generalService = {
    notifications: serviceMethods("/notifications", {
        useFormData: false,
    }),
};
