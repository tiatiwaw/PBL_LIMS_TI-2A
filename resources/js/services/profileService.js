import { serviceMethods } from "./baseService";

export const profileService = {
    profile: serviceMethods("/profile"),
    changePassword: serviceMethods("/profile/change-password", {useFormData: false}),
    updateProfile: serviceMethods("/profile/update", {useFormData: true}),
    uploadSignature: serviceMethods("/profile/upload-signature", {useFormData: true}),
};
