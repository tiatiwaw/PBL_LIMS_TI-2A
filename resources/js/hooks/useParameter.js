import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useParameters = () => {
    const queryClient = useQueryClient();
    const {
        data: parameters, // Nama datanya
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["parameters"], // Label unik untuk data ini
        queryFn: adminService.parameters.getAll,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createParameter = useMutation({
        mutationKey: ["createParameter"],
        mutationFn: adminService.parameters.create, // Memanggil "Pelayan"
        onSuccess: () => {
            // Otomatis refresh tabel setelah sukses
            queryClient.invalidateQueries({ queryKey: ["parameters"] });
            toast.success("Parameter berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah parameter"),
    });

    const updateParameter = useMutation({
        mutationKey: ["updateParameter"],
        mutationFn: ({ id, data }) => adminService.parameters.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["parameters"] });
            toast.success("Parameter berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui parameter"),
    });

    const deleteParameter = useMutation({
        mutationKey: ["deleteParameter"],
        mutationFn: adminService.parameters.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["parameters"] });
            toast.success("Parameter berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus parameter"),
    });

    return {
        parameters,
        isLoading,
        error,
        refetch,
        createParameter,
        updateParameter,
        deleteParameter,
    };
};