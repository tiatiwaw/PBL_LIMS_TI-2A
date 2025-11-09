import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { staffService } from "@/services/staffService";

export const useClients = () => {
    const queryClient = useQueryClient();

    const {
        data: clients,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["clients"],
        queryFn: staffService.clients.getAll,
    });

    const createClient = useMutation({
        mutationFn: staffService.clients.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah Client"),
    });

    const updateClient = useMutation({
        mutationFn: ({ id, data }) => staffService.clients.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui Client"),
    });

    const deleteClient = useMutation({
        mutationFn: staffService.clients.delete,
        onSuccess: () => {
            queryClient.invalidateQueries(["clients"]);
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus Client"),
    });

    return {
        clients,
        isLoading,
        error,
        refetch,
        createClient,
        updateClient,
        deleteClient,
    };
};
