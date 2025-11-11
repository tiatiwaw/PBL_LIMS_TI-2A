import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService"; 
import { toast } from "sonner";

export const useTraining = () => {
    const queryClient = useQueryClient();

    const {
        data: training, 
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["training"], 
        queryFn: adminService.training.getAll, 
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createTraining = useMutation({
        mutationKey: ["createTraining"],
        mutationFn: adminService.training.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["training"] });
            toast.success("Training berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah training"),
    });

    const updateTraining = useMutation({
        mutationKey: ["updateTraining"],
        mutationFn: ({ id, data }) => adminService.training.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["training"] });
            toast.success("Training berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui training"),
    });

    const deleteTraining = useMutation({
        mutationKey: ["deleteTraining"],
        mutationFn: adminService.training.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["training"] });
            toast.success("Training berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus training"),
    });

    return {
        training,
        isLoading,
        error,
        refetch,
        createUnit,
        updateUnit,
        deleteUnit,
    };
};