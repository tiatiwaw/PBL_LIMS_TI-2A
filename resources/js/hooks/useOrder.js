import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";

export const useOrder = (id) => {
    const {
        data: order,
        isLoading: isLoadingOrder,
        error: errorOrder,
        refetch: refetchOrder,
    } = useQuery({
        queryKey: ["order", id],
        enabled: !!id,
        queryFn: () => adminService.orders.getById(id),
    });

    return {
        order,
        isLoadingOrder,
        errorOrder,
        refetchOrder,
    };
};
