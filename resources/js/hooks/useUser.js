import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useUser = () => {
    const queryClient = useQueryClient();

    const {
        data: users,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: adminService.users.getAll,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createUser = useMutation({
        mutationKey: ["createUser"],
        mutationFn: adminService.users.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("Satuan berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah satuan"),
    });

    const updateUser = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: ({ id, data }) => adminService.users.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("Satuan berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui satuan"),
    });

    const deleteUser = useMutation({
        mutationKey: ["deleteUser"],
        mutationFn: adminService.users.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("Satuan berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus satuan"),
    });

    return {
        users,
        isLoading,
        error,
        refetch,
        createUser,
        updateUser,
        deleteUser,
    };
};
