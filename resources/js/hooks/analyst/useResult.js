import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { analystService } from "@/services/analystService";

export const useResult = () => {
    const queryClient = useQueryClient();

    const saveResult = useMutation({
        mutationFn: ({ orderId, payload }) => {
            return analystService.saveResult.update(orderId, { results: payload }, { action: "saveResult" });
        },
        
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["analyst-order-detail", variables.orderId]);
            toast.success("Hasil berhasil disimpan.");
        },
        
        onError: (err) => toast.error(err?.message || "Gagal menyimpan hasil"),
    });

    const submitResult = useMutation({
        mutationFn: (orderId) => {
            return analystService.submitResult.update(
                orderId,
                {},
            );
        },
        onSuccess: (data, orderId) => {
            queryClient.invalidateQueries({
                queryKey: ["analyst-order-detail", orderId]
            });
            toast.success(data.message || "Laporan berhasil digenerate!");
        },
        onError: (err) => {
            const msg = err?.data?.message || err?.message || "Gagal generate laporan";
            toast.error(msg);
        },
    });

    const downloadResult = useMutation({
        mutationFn: (orderId) => {
            return analystService.downloadResult.getById(orderId, {
                responseType: 'blob', // axios otomatis handle
            });
        },
        onSuccess: (blob, orderId) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Laporan_Order_${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Download dimulai!");
        },
        onError: (err) => {
            const msg = err?.response?.data?.error || "Gagal download laporan";
            toast.error(msg);
        },
    });

    return {
        saveResult: saveResult.mutate,
        isSaving: saveResult.isPending,

        submitResult: submitResult.mutate,
        isSubmitting: submitResult.isPending,

        downloadResult: downloadResult.mutate,
        isDownloading: downloadResult.isPending,
    };
}