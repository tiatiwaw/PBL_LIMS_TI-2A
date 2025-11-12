import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useReagents = () => {
    const queryClient = useQueryClient();

    const {
        data: reagents,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["reagents"],
        queryFn: adminService.reagents.getAll,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createReagent = useMutation({
        mutationKey: ["createReagent"],
        mutationFn: adminService.reagents.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["reagents"]);
            toast.success("Reagen berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah reagen"),
    });

    const updateReagent = useMutation({
        mutationKey: ["updateReagent"],
        mutationFn: ({ id, data }) => adminService.reagents.update(id, data), 
        onSuccess: () => {
            queryClient.invalidateQueries(["reagents"]);
            toast.success("Reagen berhasil diperbarui");
        },
        onError: (err) => toast.error(err?.message || "Gagal memperbarui reagen"),
    });

    const deleteReagent = useMutation({
        mutationKey: ["deleteReagent"],
        mutationFn: adminService.reagents.delete,
        onSuccess: () => {
            queryClient.invalidateQueries(["reagents"]);
            toast.success("Reagen berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus reagen"),
    });

    return {
        reagents,
        isLoading,
        error,
        refetch,
        createReagent,
        updateReagent,
        deleteReagent,
    };
};
