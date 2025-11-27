import { supervisorService } from "@/services/supervisorService";
import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useOrders = () =>
    useCrud(supervisorService.orders, "orders", "orders", { only: ["getAll"] });

export const useAnalysts = () =>
    useCrud(supervisorService.analysts, "analysts", "analis", {
        only: ["getAll"],
    });

export const useOrder = (id) => {
    const queryClient = useQueryClient();

    // Get order data
    const query = useGetById(supervisorService.orders, "order", id);

    // Mutation untuk update order
    const updateMutation = useMutation({
        mutationFn: (data) => supervisorService.orders.update(id, data),
        onSuccess: (updatedData, variables) => {
            toast.success("Order berhasil diperbarui");

            // Redirect ke order index jika bukan FILL_PARAMETERS, VALIDATE_TEST, atau REPEAT_TEST
            const excludedActions = [
                "fill_parameters",
                "validate_test",
                "repeat_test",
            ];

            if (!excludedActions.includes(variables.action)) {
                // Full page reload untuk fresh data dari server
                setTimeout(() => {
                    window.location.href = route("supervisor.order.index");
                }, 500);
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal memperbarui order");
        },
    });

    return {
        // Data dan loading state dari query
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,

        // Update mutation
        update: {
            mutate: updateMutation.mutate,
            mutateAsync: updateMutation.mutateAsync,
            isPending: updateMutation.isPending,
            error: updateMutation.error,
        },
    };
};

export const useOrderParameters = (id) => {
    return useQuery({
        queryKey: ["orders", id, "parameters"],
        enabled: !!id,
        queryFn: () => supervisorService.orders.getRelated(id, "parameters"),
    });
};
