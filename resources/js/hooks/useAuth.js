import { useState, useCallback } from "react";
import { toast } from "sonner";
import { router, usePage } from "@inertiajs/react";
import { authService, extractErrorMessage } from "@/services/authService";
import { ERROR_MESSAGES } from "@/utils/constant/auth";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const { props } = usePage();

    const login = useCallback(async (credentials) => {
        setLoading(true);

        try {
            const response = await authService.login(credentials);

            if (!response.success) {
                const errorMsg = response.message || ERROR_MESSAGES.LOGIN_FAILED;
                toast.error(errorMsg);
                throw new Error(errorMsg);
            }

            toast.success(ERROR_MESSAGES.SUCCESSFUL_LOGIN);

            const targetUrl = response.data?.redirect_url || "/";

            window.location.href = targetUrl;

            return response;
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            toast.error(errorMessage);
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
            const errorMessage = extractErrorMessage(error);
            toast.error(errorMessage);
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
