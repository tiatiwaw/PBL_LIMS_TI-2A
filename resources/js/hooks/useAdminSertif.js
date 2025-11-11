import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService"; 
import { toast } from "sonner";

export const useSertif = () => {
    const queryClient = useQueryClient();

    const {
        data: sertif, 
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["sertif"], 
        queryFn: adminService.sertif.getAll, 
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createSertif = useMutation({
        mutationKey: ["createSertif"],
        mutationFn: adminService.sertif.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sertif"] });
            toast.success("Sertifikat berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah sertifikat"),
    });

    const updateSertif = useMutation({
        mutationKey: ["updateSertif"],
        mutationFn: ({ id, data }) => adminService.sertif.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sertif"] });
            toast.success("Sertifikat berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui sertifikat"),
    });

    const deleteSertif = useMutation({
        mutationKey: ["deleteSertif"],
        mutationFn: adminService.sertif.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sertif"] });
            toast.success("Sertifikat berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus sertifikat"),
    });

    return {
        sertif,
        isLoading,
        error,
        refetch,
        createUnit,
        updateUnit,
        deleteUnit,
    };
};