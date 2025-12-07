import { analystService } from "@/services/analystService";
import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { router } from "@inertiajs/react";
import { authService } from "@/services/authService";


export const useDashboard = () =>
    useCrud(analystService.dashboard, "dashboard", "Dashboard", {
        only: ["getAll", "update"],
    });

export const useOrders = () =>
    useCrud(analystService.orders, "orders", "Orders");
    
export const useOrderDetail = (id) => useGetById(analystService.orderDetail, "order", id);

export const useConfirmSample = () =>
    useCrud(analystService.confirmSample, "confirmOrders", "Confirm Sample", {
        only: ["update"],
    });

export const useResult = () => {
    const queryClient = useQueryClient();

    const saveResultMutation = useMutation({
        mutationFn: ({ orderId, data }) =>
            analystService.saveResult.update(orderId, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ 
                queryKey: ["order", variables.orderId] 
            });
        },

        onError: (error) => {
            console.error("Save result failed:", error);
        },
    });

    return {
        // Sekarang pakai mutateAsync supaya bisa await di komponen
        saveResult: (orderId, data, options) =>
            saveResultMutation.mutateAsync({ orderId, data }, options),

        isSaving: saveResultMutation.isPending,
        isSavingError: saveResultMutation.isError,
        savingError: saveResultMutation.error,
    };
};

export const useProfile = () =>
    useCrud(analystService.profile, "profile", "profile");

export const useChangePassword = () => {
  const mutation = useMutation({
    mutationFn: (data) => analystService.changePassword.create(data),
    onSuccess: async () => {
      await authService.logout();
      router.visit("/auth/login");
    },
  });

  return {
    changePassword: mutation.mutateAsync,
    isChanging: mutation.isLoading,
    error: mutation.error,
  };
};

// Hook untuk save reagent usage
export const useSaveReagentUsage = () => {
  const mutation = useMutation({
    mutationFn: (data) => analystService.saveReagentUsage.create(data),
  });

  return {
    saveReagentUsage: mutation.mutateAsync,
    isSaving: mutation.isLoading,
    isSavingError: mutation.isError,
    savingError: mutation.error,
  };
};