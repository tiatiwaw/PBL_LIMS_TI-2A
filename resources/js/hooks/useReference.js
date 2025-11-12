import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService"; 
import { toast } from "sonner";

export const useReferences = () => {
    const queryClient = useQueryClient();

    const {
        data: references, 
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["references"], 
        queryFn: adminService.references.getAll, 
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createReference = useMutation({
        mutationKey: ["createReference"],
        mutationFn: adminService.references.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["references"] });
            toast.success("Referensi berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah referensi"),
    });

    const updateReference = useMutation({
        mutationKey: ["updateReference"],
        mutationFn: ({ id, data }) => adminService.references.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["references"] });
            toast.success("Referensi berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui referensi"),
    });

    const deleteReference = useMutation({
        mutationKey: ["deleteReference"],
        mutationFn: adminService.references.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["references"] });
            toast.success("Referensi berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus referensi"),
    });

    return {
        references,
        isLoading,
        error,
        refetch,
        createReference,
        updateReference,
        deleteReference
    };
};