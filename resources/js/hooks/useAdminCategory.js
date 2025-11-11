import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService"; 
import { toast } from "sonner"; // Asumsi sonner sudah di-setup

export const useSampleCategories = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["categories"], 
        queryFn: () => adminService.categories.getAll(), 
        staleTime: 5 * 60 * 1000, 
        retry: 1,
    });
    
    // Kirim 'data' di dalam properti data lagi agar konsisten
    // dengan BrandsPage ({ data: [...] })
    return { data: data, isLoading, isError, error, refetch };
};

export const useSampleCategoriesMutations = () => {
    const queryClient = useQueryClient();
    const onSuccess = (message) => {
        queryClient.invalidateQueries({ queryKey: ["sampleCategories"] });
        toast.success(message);
    };

    const onError = (err, defaultMessage) => {
        toast.error(err?.message || defaultMessage);
    };
    const createCategory = useMutation({
        mutationKey: ["createSampleCategory"],
        mutationFn: (newData) => adminService.categories.create(newData),
        onSuccess: () => onSuccess("Kategori berhasil ditambahkan"),
        onError: (err) => onError(err, "Gagal menambah kategori"),
    });

    const updateCategory = useMutation({
        mutationKey: ["updateSampleCategory"],
        mutationFn: ({ id, data }) => adminService.categories.update(id, data),
        onSuccess: () => onSuccess("Kategori berhasil diperbarui"),
        onError: (err) => onError(err, "Gagal memperbarui kategori"),
    });
    const deleteCategory = useMutation({
        mutationKey: ["deleteSampleCategory"],
        mutationFn: (id) => adminService.categories.delete(id),
        onSuccess: () => onSuccess("Kategori berhasil dihapus"),
        onError: (err) => onError(err, "Gagal menghapus kategori"),
    });

    return { createCategory, updateCategory, deleteCategory };
};