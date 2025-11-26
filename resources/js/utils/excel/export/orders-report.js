import {
    buildChartSection,
    buildSummarySection,
    exportWorkbook,
} from "../excelSections";
import { buildOrderSection } from "../sections/build-order-section";

export const exportOrdersReport = (analytics) => {
    const summary = buildSummarySection("LAPORAN ORDER", [
        {
            label: "Total Order",
            value: analytics.totalOrders,
            description: "Total order diregistrasi",
        },
        {
            label: "Order Selesai",
            value: analytics.completedOrders,
            description: "Order tervalidasi",
        },
        {
            label: "Total Sampel",
            value: analytics.totalSamples,
            description: "Spesimen diregistrasi",
        },
        {
            label: "Metode Analisis",
            value: analytics.totalAnalysisMethods,
            description: "Jumlah metode digunakan",
        },
        {
            label: "Metode Tes Paling Sering Digunakan",
            value: analytics.topTestMethods?.[0] ?? "-",
            description: "Metode tes yang paling sering digunakan",
        },
        {
            label: "Parameter Tes Paling Sering Digunakan",
            value: analytics.topTestParameters?.[0] ?? "-",
            description: "Parameter tes yang paling sering digunakan",
        },
    ]);

    const charts = buildChartSection([
        {
            title: "Distribusi Status Order",
            columns: ["Status", "Jumlah"],
            rows: analytics.statusChart,
        },
        {
            title: "Distribusi Tipe Order",
            columns: ["Tipe", "Jumlah"],
            rows: analytics.typeChart,
        },
    ]);

    const table = buildOrderSection(analytics);

    const aoa = [...summary, ...charts, ...table];

    exportWorkbook(
        aoa,
        `Laporan_Order_${new Date().toISOString().slice(0, 10)}`,
        "Orders",
        [{ wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 20 }, { wch: 15 }]
    );
};
