import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { authService } from "@/services/authService";

const ROLE_REDIRECT_MAP = {
    admin: "/admin",
    analyst: "/analyst",
    manager: "/manager",
    staff: "/staff/manage-clients",
    supervisor: "/supervisor",
    client: "/client",
};

const DEFAULT_REDIRECT_PATH = "/";

const ERROR_MESSAGES = {
    SESSION_EXPIRED: "Session telah berakhir. Silahkan login kembali.",
    LOGIN_FAILED: "Login gagal",
    LOGOUT_FAILED: "Logout gagal",
    SUCCESSFUL_LOGIN: "Berhasil login!",
    SUCCESSFUL_LOGOUT: "Berhasil logout!",
};

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);

            try {
                const authenticated = await authService.isAuthenticated();

                if (authenticated) {
                    const userDataResponse = await authService.getUser();
                    const fetchedUser = userDataResponse.data.user;
                    setUser(fetchedUser);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                setUser(null);
                setIsAuthenticated(false);
                toast.error(ERROR_MESSAGES.SESSION_EXPIRED);

                router.visit("/auth/login");
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = useCallback(async (credentials) => {
        setLoading(true);

        try {
            const response = await authService.login(credentials);
            const userData = response.data.user;

            setUser(userData);
            setIsAuthenticated(true);

            toast.success(ERROR_MESSAGES.SUCCESSFUL_LOGIN);

            const userRole = userData.role;
            const redirectPath = ROLE_REDIRECT_MAP[userRole] || DEFAULT_REDIRECT_PATH;

            router.visit(redirectPath);

            return response;
        } catch (error) {
            const errorMessage = error.message || ERROR_MESSAGES.LOGIN_FAILED;
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

            setUser(null);
            setIsAuthenticated(false);

            toast.success(ERROR_MESSAGES.SUCCESSFUL_LOGOUT);

            router.visit(route("auth.login.form"));
        } catch (error) {
            const errorMessage = error.message || ERROR_MESSAGES.LOGOUT_FAILED;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const authStatus = {
        user,
        loading,
        isAuthenticated,
    };

    return {
        ...authStatus,
        login,
        logout,
    };
};