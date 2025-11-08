import { useState, useEffect } from "react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { authService } from "@/services/authService";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(
        authService.isAuthenticated()
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } else if (isAuthenticated) {
            setLoading(true);
            authService
                .getUser()
                .then((data) => {
                    const fetchedUser = data.data.user;
                    localStorage.setItem("user", JSON.stringify(fetchedUser));
                    setUser(fetchedUser);
                })
                .catch(() => {
                    toast.error("Session expired. Please login again.");
                    setIsAuthenticated(false);
                    router.visit("/auth/login");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const data = await authService.login(credentials);
            setUser(data.data.user);
            setIsAuthenticated(true);
            toast.success("Login successful!");

            const role = data.data.user.role;
            const redirectMap = {
                admin: "/admin",
                analyst: "/analyst",
                manager: "/manager",
                staff: "/staff/manage-clients",
                supervisor: "/supervisor",
                client: "/client",
            };

            router.visit(redirectMap[role] || "/");
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            toast.success("Logged out successfully");

            router.visit(route("auth.login.form"));
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
    };
};
