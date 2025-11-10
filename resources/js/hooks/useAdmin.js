import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useAdmin = () => {
    const {
        data: dashboard,
        isLoading: loading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["admin"],
        queryFn: async () => {
            try {
                const response = await adminService.dashboard.getAll();
                return response.data;
            } catch (err) {
                const message =
                    err.response?.data?.message || "Failed to fetch dashboard";
                toast.error(message);
                throw new Error(message);
            }
        },
        refetchOnWindowFocus: false,
    });

    return {
        dashboard,
        loading,
        error,
        refetch,
    };
};
