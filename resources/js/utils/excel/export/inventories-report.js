import {
    buildSummarySection,
    buildChartSection,
    exportWorkbook,
} from "../excelSections";
import { buildInventorySection } from "../sections/build-inventory-section";

export const exportInventoryReport = (analytics) => {
    const summary = buildSummarySection("LAPORAN INVENTORI LABORATORIUM", [
        {
            label: "Total Equipment",
            value: analytics.totalEquipment,
            description: `Avail: ${analytics.statusCounts.available} | Unavail: ${analytics.statusCounts.unavailable} | Maint: ${analytics.statusCounts.maintenance} | Broken: ${analytics.statusCounts.broken}`,
        },
        {
            label: "Total Reagen",
            value: analytics.totalReagents,
            description: "Item kimia terdaftar",
        },
        {
            label: "Alat Sering Dipakai",
            value: analytics.topEquipment.name,
            description: `${analytics.topEquipment.count} kali`,
        },
        {
            label: "Reagen Sering Dipakai",
            value: analytics.topReagent.name,
            description: `${analytics.topReagent.count} kali`,
        },
        {
            label: "Total Brand",
            value: analytics.totalBrands,
            description: "Master data merek",
        },
        {
            label: "Total Supplier",
            value: analytics.totalSuppliers,
            description: "Master data pemasok",
        },
    ]);

    const charts = buildChartSection([
        {
            title: "Distribusi Status Peralatan",
            columns: ["Status", "Jumlah"],
            rows: analytics.statusChartData,
        },
    ]);

    const extraTables = buildInventorySection(analytics);

    const aoa = [...summary, ...charts, ...extraTables];

    exportWorkbook(
        aoa,
        `Laporan_Inventori_Laboo_${new Date().toISOString().slice(0, 10)}`,
        "Inventory",
        [{ wch: 30 }, { wch: 15 }, { wch: 5 }, { wch: 30 }, { wch: 15 }]
    );
};
