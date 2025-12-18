import { formatCurrency } from "@/utils/formatters";
import {
    buildSummarySection,
    buildChartSection,
    exportWorkbook,
} from "../excelSections";
import { buildTransactionsSection } from "../sections/build-transaction-section";

export const exportTransactionsReport = (data) => {
    const kpi = data?.kpi || {};
    const charts = data?.charts || {};

    const summary = buildSummarySection("LAPORAN KEUANGAN & TRANSAKSI", [
        {
            label: "Total Pendapatan",
            value: formatCurrency(kpi.total_revenue || 0),
            description: `Dari ${kpi.total_orders || 0} transaksi`,
        },
        {
            label: "Order Tertinggi",
            value: formatCurrency(kpi.max_single_order || 0),
            description: "Nilai transaksi tunggal tertinggi",
        },
        {
            label: "Pelanggan Top",
            value: kpi.top_client?.name || "-",
            description: `Total: ${formatCurrency(
                kpi.top_client?.revenue || 0
            )}`,
        },
        {
            label: "Metode Favorit",
            value: kpi.top_method?.name || "-",
            description: `${kpi.top_method?.count || 0}x (~${formatCurrency(
                kpi.top_method?.avg_price || 0
            )})`,
        },
        {
            label: "Rerata Order",
            value: formatCurrency(kpi.avg_revenue_order || 0),
            description: "Nilai rata-rata per invoice",
        },
        {
            label: "Pendapatan Tipe Terbanyak",
            value: formatCurrency(kpi.top_order_type?.revenue || 0),
            description: `Dari tipe: ${kpi.top_order_type?.name || "-"}`,
        },
    ]);

    const chartSection = buildChartSection([
        {
            title: "Tren Pendapatan",
            columns: ["Periode", "Pendapatan"],
            rows: (charts.trend || []).map((i) => ({
                name: i.name,
                value: i.revenue,
            })),
        },
        {
            title: "Distribusi Penggunaan Metode",
            columns: ["Metode", "Jumlah Penggunaan"],
            rows: charts.method_distribution || [],
        },
    ]);

    const table = buildTransactionsSection(data);

    const aoa = [...summary, ...chartSection, ...table];

    exportWorkbook(
        aoa,
        `Laporan_Keuangan_Laboo_${new Date().toISOString().slice(0, 10)}`,
        "Transactions",
        [
            { wch: 5 },
            { wch: 20 },
            { wch: 30 },
            { wch: 20 },
            { wch: 20 },
            { wch: 15 },
            { wch: 20 },
        ]
    );
};
