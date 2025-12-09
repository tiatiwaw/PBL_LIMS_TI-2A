import { useGetById } from "./useGetById";
import { profileService } from "@/services/profileService";
import { useCrud } from "./useCrud";
import { useMutation } from "@tanstack/react-query";
import { router } from "@inertiajs/react";

export const getProfile = (id) => useGetById(profileService.profile, "profile", id);

export const useChangePassword = () =>
    useCrud(profileService.changePassword, "profile", "Profile", {only: ["update"]});
