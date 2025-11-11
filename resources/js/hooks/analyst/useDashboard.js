import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { analystService } from "@/services/analystService";

export const useDashboard = () => {
    return useQuery({
        queryKey: ["analyst-dashboard"],
        queryFn: analystService.dashboard.getAll,
        onError: (err) => toast.error(err?.message || "Gagal memuat dashboard"),
    });
};
