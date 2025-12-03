import { safeGet } from "@/utils/report-helpers";
import { useMemo } from "react";

// CATATAN PENTING:
// Hook ini diubah untuk menerima data analitik yang sudah dihitung 
// di backend (totalAnalyst, totalCustomer) dan data mentah Order (orders)
// untuk perhitungan yang masih sensitif terhadap filter tanggal di frontend.
export const useUsersAnalytics = (data, dateFilter, isAllPeriod) => {
    return useMemo(() => {
        // Data yang sudah dihitung di Backend:
        const {
            totalAnalyst, // <--- Nilai dari Backend
            totalCustomer, // <--- Nilai dari Backend
            totalOrderNonAdmin, // <--- Nilai dari Backend (sekarang menjadi total filtered orders jika isAllPeriod false)
            topCustomer, // <--- Objek ringkas dari Backend (nama dan total orders)
            // Hapus 'users' mentah. Gunakan 'orders' untuk perhitungan activity.
            orders = [], 
        } = data || {};

        // ----------------------------------------------------
        // LOGIKA FILTER TANGGAL (Hanya diterapkan ke Orders, 
        // karena data Total Users dari backend sudah final).
        // ----------------------------------------------------
        const filteredOrders = orders.filter((o) => dateFilter(o.order_date));

        // ----------------------------------------------------
        // PENYESUAIAN METRIK PENGGUNA (Menggunakan nilai dari Backend)
        // ----------------------------------------------------
        
        // Asumsi: Backend hanya mengirim data total jika isAllPeriod=true. 
        // Jika filter tanggal diterapkan (isAllPeriod=false), 
        // kita tidak bisa menghitung total user yang dibuat pada periode itu
        // karena backend tidak mengirim data users mentah lagi.
        
        // Kita gunakan nilai dari backend jika isAllPeriod TRUE.
        // Jika FALSE, kita asumsikan metrik ini tidak terpengaruh filter tanggal 
        // (atau perlu penyesuaian di backend/API baru).
        const totalAnalysts = totalAnalyst || 0;
        const totalClients = totalCustomer || 0;
        // Karena users mentah sudah dihapus, kita tidak bisa menghitung role lain.
        // Kita hanya akan menampilkan total dari backend.
        
        // Total NonAdmins, jika diperlukan, seharusnya dihitung di backend juga.
        // Untuk sementara kita gunakan total clients + total analysts
        const totalNonAdmins = totalAnalysts + totalClients; 
        
        // ----------------------------------------------------
        // LOGIKA ANALISIS ORDER (Masih di Frontend karena filter tanggal)
        // ----------------------------------------------------

        // 1. Hitung total order yang difilter oleh tanggal
        const totalFilteredOrders = filteredOrders.length;
        
        // 2. Client Order Counts (Diperlukan untuk Top Client yang difilter tanggal)
        const clientOrderCounts = {};
        filteredOrders.forEach((order) => {
            const clientName = safeGet(order, "clients.name", "Unknown Client");
            clientOrderCounts[clientName] =
                (clientOrderCounts[clientName] || 0) + 1;
        });

        // 3. Analyst Activity Counts
        const analystTestCounts = {};
        let totalAnalystsAssigned = 0;
        let ordersWithAnalysts = 0;

        filteredOrders.forEach((order) => {
            const sampleCount = order.samples?.length || 0;
            const assignedAnalysts = order.analysts || [];

            if (assignedAnalysts.length > 0) {
                totalAnalystsAssigned += assignedAnalysts.length;
                ordersWithAnalysts++;

                assignedAnalysts.forEach((analyst) => {
                    const name = analyst.name || "Unknown Analyst";
                    analystTestCounts[name] =
                        (analystTestCounts[name] || 0) + sampleCount;
                });
            }
        });

        const sortedClients = Object.entries(clientOrderCounts)
            .map(([name, orders]) => ({ name, orders }))
            .sort((a, b) => b.orders - a.orders);

        const sortedAnalysts = Object.entries(analystTestCounts)
            .map(([name, tests]) => ({ name, tests }))
            .sort((a, b) => b.tests - a.tests);

        // Top Client sekarang diambil dari hasil filter tanggal frontend 
        // (bukan dari topCustomer yang dikirim backend).
        const topClientFiltered = sortedClients[0] || { name: "-", orders: 0 };
        const topAnalyst = sortedAnalysts[0] || { name: "-", tests: 0 };

        const avgAnalystsPerOrder =
            ordersWithAnalysts > 0
                ? (totalAnalystsAssigned / ordersWithAnalysts).toFixed(1)
                : 0;

        // Distribusi Role (Hanya menampilkan Total Analis dan Total Client dari Backend)
        // Jika role lain diperlukan, backend harus mengirimkan totalnya juga.
        const roleDistribution = [
            { name: "Clients", value: totalClients },
            { name: "Analysts", value: totalAnalysts },
            // Role lainnya tidak tersedia karena data users mentah sudah dihapus.
        ].filter((d) => d.value > 0);

        const clientRankingData = sortedClients.slice(0, 5);
        const analystActivityData = sortedAnalysts.slice(0, 5);

        return {
            totalAnalysts: totalAnalysts,
            totalClients: totalClients,
            // totalOrderNonAdmin kini merepresentasikan total order yang sudah difilter:
            totalOrders: totalFilteredOrders, 
            totalNonAdmins, 
            topClient: topClientFiltered, // Menggunakan hasil filter tanggal
            topAnalyst,
            avgAnalystsPerOrder,

            roleDistribution,
            clientRankingData,
            analystActivityData,

            sortedClients,
            sortedAnalysts,
        };
    }, [data, dateFilter, isAllPeriod]);
};