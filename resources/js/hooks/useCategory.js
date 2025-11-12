import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useSampleCategories = () => {
    const queryClient = useQueryClient();

    const {
        data: categories,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["sampleCategories"],
        queryFn: adminService.categories.getAll,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createCategory = useMutation({
        mutationKey: ["createSampleCategory"],
        mutationFn: adminService.categories.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sampleCategories"] });
            toast.success("Kategori berhasil ditambahkan");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal menambah kategori"),
    });

    const updateCategory = useMutation({
        mutationKey: ["updateSampleCategory"],
        mutationFn: ({ id, data }) => adminService.categories.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sampleCategories"] });
            toast.success("Kategori berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui kategori"),
    });

    const deleteCategory = useMutation({
        mutationKey: ["deleteSampleCategory"],
        mutationFn: adminService.categories.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sampleCategories"] });
            toast.success("Kategori berhasil dihapus");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal menghapus kategori"),
    });

    return {
        categories,
        isLoading,
        error,
        refetch,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};
