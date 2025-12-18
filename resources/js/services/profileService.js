import { serviceMethods } from "./baseService";

export const profileService = {
    profile: serviceMethods("/profile"),
    changePassword: serviceMethods("/profile/change-password", {useFormData: false}),
    updateProfile: serviceMethods("/profile/update", {useFormData: true}),
    uploadSignature: serviceMethods("/profile/upload-signature", {useFormData: true}),
};

// Client-specific profile service
export const clientProfileService = {
    updateEmail: serviceMethods("/client/profile/update-email", {useFormData: false}),
    updatePhone: serviceMethods("/client/profile/update-phone", {useFormData: false}),
};
