import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useSuppliers = () => {
    const queryClient = useQueryClient();

    const {
        data: suppliers,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: adminService.suppliers.getAll,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createSupplier = useMutation({
        mutationKey: ["createSupplier"],
        mutationFn: adminService.suppliers.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"]);
            toast.success("Supplier berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah supplier"),
    });

    const updateSupplier = useMutation({
        mutationKey: ["updateSupplier"],
        mutationFn: ({ id, data }) => adminService.suppliers.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"]);
            toast.success("Supplier berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui supplier"),
    });

    const deleteSupplier = useMutation({
        mutationKey: ["deleteSupplier"],
        mutationFn: adminService.suppliers.delete,
        onSuccess: () => {
            queryClient.invalidateQueries(["suppliers"]);
            toast.success("Supplier berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus supplier"),
    });

    return {
        suppliers,
        isLoading,
        error,
        refetch,
        createSupplier,
        updateSupplier,
        deleteSupplier,
    };
};
