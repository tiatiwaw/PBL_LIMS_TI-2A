import { getOrderStatusLabel } from "@/utils/statusUtils";

const formatDate = (v) => (v ? new Date(v).toLocaleDateString("id-ID") : "-");

export const buildOrderSection = (analytics) => {
    const header = [
        "No.",
        "No. Order",
        "Klien",
        "Tipe Order",
        "Status",
        "Tanggal Order",
        "Estimasi Selesai",
        "Jml. Sampel",
        "Analyst (Pertama)",
        "Nilai Hasil",
    ];

    const rows = analytics.filteredOrders.map((o, i) => [
        i + 1,
        o.order_number,
        o.clients?.users?.name || o.clients?.name || "-",
        o.order_type
            ? o.order_type[0].toUpperCase() + o.order_type.slice(1)
            : "-",
        getOrderStatusLabel(o.status),
        formatDate(o.order_date),
        formatDate(o.estimate_date),
        o.samples?.length ?? 0,
        o.analysts.map((a) => a.name).join(", ") || "-",
        o.result_value ?? "-",
    ]);

    return [["DETAIL DATA ORDER"], header, ...rows];
};
