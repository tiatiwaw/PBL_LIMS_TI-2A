import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/adminService";
import { toast } from "sonner";


export const useMethods = () => {
    const queryClient = useQueryClient();

    const {
        data: methods, 
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["methods"], 
        queryFn: adminService.methods.getAll, 
        staleTime: 5 * 60 * 1000, 
        retry: 1,
    });

    // --- 2. MEMBUAT DATA (CREATE / POST) ---
    const createMethod = useMutation({
        mutationKey: ["createMethod"],
        mutationFn: adminService.methods.create, // Memanggil "Pelayan"
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["methods"] });
            toast.success("Metode Uji berhasil ditambahkan");
        },
        onError: (err) => toast.error(err?.message || "Gagal menambah metode"),
    });

    // --- 3. MENGUPDATE DATA (UPDATE / PUT) ---
    const updateMethod = useMutation({
        mutationKey: ["updateMethod"],
        mutationFn: ({ id, data }) => adminService.methods.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["methods"] });
            toast.success("Metode Uji berhasil diperbarui");
        },
        onError: (err) =>
            toast.error(err?.message || "Gagal memperbarui metode"),
    });

    // --- 4. MENGHAPUS DATA (DELETE) ---
    const deleteMethod = useMutation({
        mutationKey: ["deleteMethod"],
        mutationFn: adminService.methods.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["methods"] });
            toast.success("Metode Uji berhasil dihapus");
        },
        onError: (err) => toast.error(err?.message || "Gagal menghapus metode"),
    });

    // --- 5. MEMBERIKAN "ALAT" KE KOMPONEN ---
    return {
        methods,
        isLoading,
        error,
        refetch,
        createMethod,
        updateMethod,
        deleteMethod,
    };
};