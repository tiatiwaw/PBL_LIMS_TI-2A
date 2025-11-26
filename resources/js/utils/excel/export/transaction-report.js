import { formatCurrency } from "@/utils/formatters";
import {
    buildSummarySection,
    buildChartSection,
    exportWorkbook,
} from "../excelSections";
import { buildTransactionsSection } from "../sections/build-transaction-section";

export const exportTransactionsReport = (analytics) => {
    const summary = buildSummarySection("LAPORAN KEUANGAN & TRANSAKSI", [
        {
            label: "Total Pendapatan",
            value: formatCurrency(analytics.totalRevenue),
            description: `Dari ${analytics.totalOrders} transaksi`,
        },
        {
            label: "Order Tertinggi",
            value: formatCurrency(analytics.maxSingleOrderRevenue),
            description: "Nilai transaksi tunggal tertinggi",
        },
        {
            label: "Pelanggan Top",
            value: analytics.topClient.name,
            description: `Total: ${formatCurrency(
                analytics.topClient.revenue
            )}`,
        },
        {
            label: "Metode Favorit",
            value: analytics.topMethod.name,
            description: `${analytics.topMethod.count}x (~${formatCurrency(
                analytics.topMethodAvgPrice
            )})`,
        },
        {
            label: "Rerata Order",
            value: formatCurrency(analytics.avgRevenuePerOrder),
            description: "Nilai rata-rata per invoice",
        },
        {
            label: "Pendapatan Tipe Terbanyak",
            value: formatCurrency(analytics.mostCommonOrderTypeRevenue),
            description: `Dari tipe: ${analytics.mostCommonOrderTypeName}`,
        },
    ]);

    const charts = buildChartSection([
        {
            title: "Tren Pendapatan",
            columns: ["Periode", "Pendapatan"],
            rows: analytics.trendChartData.map((i) => ({
                name: i.name,
                value: i.revenue,
            })),
        },
        {
            title: "Distribusi Penggunaan Metode",
            columns: ["Metode", "Jumlah Penggunaan"],
            rows: analytics.methodDistributionData,
        },
    ]);

    const table = buildTransactionsSection(analytics);

    const aoa = [...summary, ...charts, ...table];

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
