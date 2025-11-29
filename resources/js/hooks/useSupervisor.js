import { supervisorService } from "@/services/supervisorService";
import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useOrders = () =>
    useCrud(supervisorService.orders, "orders", "orders", {
        only: ["getAll"],
    });

export const useAnalysts = () =>
    useCrud(supervisorService.analysts, "analysts", "analis", {
        only: ["getAll"],
    });

export const useOrder = (id) => {
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
    const queryClient = useQueryClient();

    // Query untuk fetch data parameters
    const query = useQuery({
        queryKey: ["orders", id, "parameters"],
        enabled: !!id,
        queryFn: () => supervisorService.orders.getRelated(id, "parameters"),
    });

    // Mutation untuk POST (create) parameters
    const createMutation = useMutation({
        mutationFn: (data) =>
            supervisorService.orders.postRelated(id, data, "parameters"),
        onSuccess: (response) => {
            toast.success("Parameter berhasil disimpan");
            setTimeout(() => {
                window.location.href = `/supervisor/orders/${id}/parameters`;
            }, 500);
        },
        onError: (error) => {
            toast.error(error.message || "Gagal menyimpan parameter");
        },
    });

    const createOrderMutation = useMutation({
        mutationFn: (data) =>
            supervisorService.orders.postRelated(id, data, "parameters/submit"),
        onSuccess: (response) => {
            toast.success("Order Parameter berhasil disimpan");
            setTimeout(() => {
                window.location.href = `/supervisor/orders`;
            }, 500);
        },
        onError: (error) => {
            toast.error(error.message || "Gagal menyimpan order parameter");
        },
    });

    // Mutation untuk PUT (update) parameters
    const updateMutation = useMutation({
        mutationFn: (data) =>
            supervisorService.orders.updateRelated(id, data, "parameters"),
        onSuccess: (response) => {
            toast.success("Parameter berhasil diperbarui");
            // Invalidate query untuk refresh data
            queryClient.invalidateQueries({
                queryKey: ["orders", id, "parameters"],
            });
            setTimeout(() => {
                window.location.href = `/supervisor/orders/${id}/parameters`;
            }, 500);
        },
        onError: (error) => {
            toast.error(error.message || "Gagal memperbarui parameter");
        },
    });

    return {
        // Query data
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,

        // Create mutation
        create: {
            mutate: createMutation.mutate,
            mutateAsync: createMutation.mutateAsync,
            isPending: createMutation.isPending,
            error: createMutation.error,
        },

        // Create order mutation
        createOrder: {
            mutate: createOrderMutation.mutate,
            mutateAsync: createOrderMutation.mutateAsync,
            isPending: createOrderMutation.isPending,
            error: createOrderMutation.error,
        },

        // Update mutation
        update: {
            mutate: updateMutation.mutate,
            mutateAsync: updateMutation.mutateAsync,
            isPending: updateMutation.isPending,
            error: updateMutation.error,
        },
    };
};
