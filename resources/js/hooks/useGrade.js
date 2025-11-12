import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";

export const useGrades = () => {
    const queryClient = useQueryClient();

    const {
        data: grades,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["grades"],
        queryFn: adminService.grades.getAll,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    const createGrade = useMutation({
        mutationKey: ["createGrade"],
        mutationFn: adminService.grades.create,
        onSuccess: () => {
            queryClient.invalidateQueries(["grades"]);
            toast.success("Grade berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah grade"),
    });

    const updateGrade = useMutation({
        mutationKey: ["updateGrade"],
        mutationFn: ({ id, data }) => adminService.grades.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["grades"]);
            toast.success("Grade berhasil diperbarui");
        },
        onError: (err) => toast.error(err?.message || "Gagal memperbarui grade"),
    });

    const deleteGrade = useMutation({
        mutationKey: ["deleteGrade"],
        mutationFn: adminService.grades.delete,
        onSuccess: () => {
            queryClient.invalidateQueries(["grades"]);
            toast.success("Grade berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus grade"),
    });

    return {
        grades,
        isLoading,
        error,
        refetch,
        createGrade,
        updateGrade,
        deleteGrade,
    };
};
