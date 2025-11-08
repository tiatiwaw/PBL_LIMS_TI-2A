import { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useAdmin = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const data = await adminService.getDashboard();
            setDashboard(data.data);
            setError(null);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to fetch dashboard"
            );
            toast.error("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return {
        dashboard,
        loading,
        error,
        refetch: fetchDashboard,
    };
};
