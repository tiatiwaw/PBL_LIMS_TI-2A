import { useQuery } from "@tanstack/react-query";
import { clientService } from "@/services/clientService";

export const useClientHistory = (orderId) => {
    const {
        data: response,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["client", "history", orderId],
        queryFn: async () => {
            if (!orderId) throw new Error("ID order tidak ditemukan.");

            try {
                const res = await clientService.history.show(orderId);
                return res;
            } catch (err) {
                throw new Error(
                    err?.response?.data?.message ||
                    "Gagal mengambil riwayat order client."
                );
            }
        },
        enabled: !!orderId, // hanya jalan kalau orderId ada
    });

    // Ambil data sesuai response backend
    const { order, statuses } = response?.data?.data || {};

    const errorMessage = isError
        ? error?.message || "Terjadi kesalahan saat memuat data."
        : null;

    return {
        order,
        statuses,
        isLoading,
        isError,
        errorMessage,
        refetch,
    };
};
