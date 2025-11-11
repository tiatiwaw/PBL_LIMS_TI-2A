import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { analystService } from "@/services/analystService";

export const useOrders = () => {

    return useQuery({
        queryKey: ["analyst-orders"],
        queryFn: analystService.orders.getAll,
        onError: (err) => toast.error(err?.message || "Gagal memuat pesanan"),
    });
};
