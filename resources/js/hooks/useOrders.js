import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { staffService } from "@/services/staffService";

export const useOrders = () => {
    const queryClient = useQueryClient();

    const {
        data: data,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: staffService.orders.getAll,
    });

    const { clients, methods, samples, categories, orderNumber } = data || {};

    const createOrder = useMutation({
        mutationFn: staffService.orders.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            toast.success("Order berhasil dibuat");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah Order"),
    });

    const createSample = useMutation({
        mutationFn: staffService.samples.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            toast.success("Sampel berhasil dibuat");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah Sampel"),
    });

    return {
        clients,
        methods,
        samples,
        categories,
        orderNumber,
        isLoading,
        error,
        refetch,
        createOrder,
        createSample,
    };
};
