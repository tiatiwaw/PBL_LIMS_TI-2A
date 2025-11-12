import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService"; 
import { toast } from "sonner";

export const useUnits = () => {
    const queryClient = useQueryClient();

    const {
        data: units, 
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["units"], 
        queryFn: adminService.units.getAll, 
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createUnit = useMutation({
        mutationKey: ["createUnit"],
        mutationFn: adminService.units.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["units"] });
            toast.success("Satuan berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah satuan"),
    });

    const updateUnit = useMutation({
        mutationKey: ["updateUnit"],
        mutationFn: ({ id, data }) => adminService.units.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["units"] });
            toast.success("Satuan berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui satuan"),
    });

    const deleteUnit = useMutation({
        mutationKey: ["deleteUnit"],
        mutationFn: adminService.units.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["units"] });
            toast.success("Satuan berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus satuan"),
    });

    return {
        units,
        isLoading,
        error,
        refetch,
        createUnit,
        updateUnit,
        deleteUnit,
    };
};