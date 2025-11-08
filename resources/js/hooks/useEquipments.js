import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useEquipments = () => {
    const queryClient = useQueryClient();

    const {
        data: equipments,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["equipments"],
        queryFn: adminService.equipments.getAll,
    });

    const createBrand = useMutation({
        mutationFn: adminService.equipments.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["equipments"]);
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah brand"),
    });

    const updateBrand = useMutation({
        mutationFn: ({ id, data }) => adminService.equipments.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["equipments"]);
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui brand"),
    });

    const deleteBrand = useMutation({
        mutationFn: adminService.equipments.delete,
        onSuccess: () => {
            queryClient.invalidateQueries(["equipments"]);
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus brand"),
    });

    return {
        equipments,
        isLoading,
        error,
        refetch,
        createBrand,
        updateBrand,
        deleteBrand,
    };
};
