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
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createBrand = useMutation({
        mutationKey: ["createBrand"],
        mutationFn: adminService.brands.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
            toast.success("Brand berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah brand"),
    });

    const updateBrand = useMutation({
        mutationKey: ["updateBrand"],
        mutationFn: ({ id, data }) => adminService.brands.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
            toast.success("Brand berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui brand"),
    });

    const deleteBrand = useMutation({
        mutationKey: ["deleteBrand"],
        mutationFn: adminService.brands.delete,
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
            toast.success("Brand berhasil dihapus");
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
