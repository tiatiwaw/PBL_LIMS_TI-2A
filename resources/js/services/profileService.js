import { serviceMethods } from "./baseService";

export const profileService = {
    profile: serviceMethods("/profile"),
    changePassword: serviceMethods("/profile/change-password", {useFormData: false,}),
};
