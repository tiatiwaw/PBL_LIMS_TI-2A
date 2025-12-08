import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export const useForgotPassword = () => {
    const forgotPasswordMutation = useMutation({
        mutationFn: async (email) => {
            const response = await api.post("/auth/forgot-password", {
                email,
            });
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(
                data.message ||
                    "Link reset password telah dikirim ke email Anda"
            );
        },
        onError: (error) => {
            const message =
                error.response?.data?.message ||
                "Gagal mengirim link reset password";
            toast.error(message);
        },
    });

    return {
        forgotPassword: async (email) => {
            return forgotPasswordMutation.mutateAsync(email);
        },
        loading: forgotPasswordMutation.isPending,
        error: forgotPasswordMutation.error,
    };
};

export const useResetPassword = () => {
    const resetPasswordMutation = useMutation({
        mutationFn: async (data) => {
            const response = await api.post("/auth/reset-password", {
                email: data.email,
                token: data.token,
                password: data.password,
                password_confirmation: data.passwordConfirmation,
            });
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Password berhasil direset");
        },
        onError: (error) => {
            const message =
                error.response?.data?.message || "Gagal mereset password";
            toast.error(message);
        },
    });

    return {
        resetPassword: async (data) => {
            return resetPasswordMutation.mutateAsync(data);
        },
        loading: resetPasswordMutation.isPending,
        error: resetPasswordMutation.error,
    };
};
