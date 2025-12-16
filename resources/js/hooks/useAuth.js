import { useState, useCallback } from "react";
import { toast } from "sonner";
import { router, usePage } from "@inertiajs/react";
import { authService } from "@/services/authService";
import { ERROR_MESSAGES } from "@/utils/constant/auth";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const { props } = usePage();

    const login = useCallback(async (credentials) => {
        setLoading(true);

        try {
            const response = await authService.login(credentials);

            toast.success(ERROR_MESSAGES.SUCCESSFUL_LOGIN);

            const targetUrl = response.data?.redirect_url || "/";

            window.location.href = targetUrl;

            return response;
        } catch (error) {
            toast.error(error.message || ERROR_MESSAGES.LOGIN_FAILED);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setLoading(true);

        try {
            await authService.logout();

            toast.success(ERROR_MESSAGES.SUCCESSFUL_LOGOUT);

            window.location.href = "/auth/login";
        } catch (error) {
            toast.error(error.message || ERROR_MESSAGES.LOGOUT_FAILED);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user: props?.auth?.user || null,
        loading,
        login,
        logout,
    };
};
