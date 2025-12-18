import { useGetById } from "./useGetById";
import { profileService, clientProfileService } from "@/services/profileService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";

export const getProfile = (id) => useGetById(profileService.profile, "profile", id);

export const useChangePassword = () => {
    return useMutation({
        mutationFn: ({ id, data }) => profileService.changePassword.update(id, data),
        onSuccess: () => {
            router.visit("/auth/login");
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => profileService.updateProfile.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["profile", variables.id] });
        },
    });
};

export const useUpdateEmail = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => clientProfileService.updateEmail.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["profile", variables.id] });
        },
    });
};

export const useUpdatePhone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => clientProfileService.updatePhone.create(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["profile", variables.id] });
        },
    });
};

export const useUploadSignature = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, signature }) => profileService.uploadSignature.create({ user_id: id, signature }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["profile", variables.id] });
        },
    });
};
