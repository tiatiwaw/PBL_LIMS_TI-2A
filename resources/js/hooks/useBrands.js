import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useBrands = () => {
    const queryClient = useQueryClient();

    const {
        data: brands,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["brands"],
        queryFn: adminService.brands.getAll,
    });

    const createBrand = useMutation({
        mutationFn: adminService.brands.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah brand"),
    });

    const updateBrand = useMutation({
        mutationFn: ({ id, data }) => adminService.brands.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui brand"),
    });

    const deleteBrand = useMutation({
        mutationFn: adminService.brands.delete,
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus brand"),
    });

    return {
        brands,
        isLoading,
        error,
        refetch,
        createBrand,
        updateBrand,
        deleteBrand,
    };
};
