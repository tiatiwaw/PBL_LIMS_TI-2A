import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { analystService } from "@/services/analystService";

export const useOrderDetail = (orderId) => {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["analyst-order-detail", orderId],
        queryFn: () => analystService.orders.getById(orderId),
        enabled: !! orderId,
        onError: (err) => toast.error(err?.message || "Gagal memuat detail order"),
    });

    const acceptOrder = useMutation({
        mutationFn: (id) => analystService.orders.update(id, { action: "accept" }),
        onSuccess: () => {
            queryClient.invalidateQueries(["analyst-orders"]);
            toast.success("Order diterima");
        },
        onError: (err) => toast.error(err?.message || "Gagal menerima order"),
    });

    const confirmSample = useMutation({
        mutationFn: (id) => analystService.samples.update(id, { action: "confirm" }),
        onSuccess: () => {
            queryClient.invalidateQueries(["analyst-order-detail", orderId]);
            toast.success("Sampel dikonfirmasi");
        },
        onError: (err) => toast.error(err?.message || "Gagal konfirmasi sampel"),
    });

    const unconfirmSample = useMutation({
        mutationFn: (id) => analystService.samples.update(id, { action: "unconfirm" }),
        onSuccess: () => {
            queryClient.invalidateQueries(["analyst-order-detail", orderId]);
            toast.success("Status sampel dibatalkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal batalkan status sampel"),
    });

    return {
        order: data?.order,
        samples: data?.samples,
        isLoading,
        error,
        refetch,
        acceptOrder,
        confirmSample,
        unconfirmSample,
    };
};
