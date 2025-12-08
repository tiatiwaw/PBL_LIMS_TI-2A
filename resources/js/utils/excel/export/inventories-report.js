import {
    buildSummarySection,
    buildChartSection,
    exportWorkbook,
} from "../excelSections";
import { buildInventorySection } from "../sections/build-inventory-section";

export const exportInventoryReport = (apiData) => {
    const kpi = apiData?.kpi || {};
    const charts = apiData?.charts || {};

    const summary = buildSummarySection("LAPORAN INVENTORI LABORATORIUM", [
        {
            label: "Total Equipment",
            value: kpi.total_equipment || 0,
            description: `Avail: ${kpi.active_equipment || 0} | Maint: ${
                kpi.maintenance_equipment || 0
            } | Broken: ${kpi.broken_equipment || 0}`,
        },
        {
            label: "Total Reagen",
            value: kpi.total_reagents || 0,
            description: "Item kimia terdaftar",
        },
        {
            label: "Alat Sering Dipakai",
            value: kpi.top_equipment?.name || "-",
            description: `${kpi.top_equipment?.count || 0} kali`,
        },
        {
            label: "Reagen Sering Dipakai",
            value: kpi.top_reagent?.name || "-",
            description: `${kpi.top_reagent?.count || 0} kali`,
        },
        {
            label: "Total Brand",
            value: kpi.total_brands || 0,
            description: "Master data merek",
        },
        {
            label: "Total Supplier",
            value: kpi.total_suppliers || 0,
            description: "Master data pemasok",
        },
    ]);

    const chartSection = buildChartSection([
        {
            title: "Distribusi Status Peralatan",
            columns: ["Status", "Jumlah"],
            rows: charts.status || [],
        },
    ]);

    const extraTables = buildInventorySection(charts);

    const aoa = [...summary, ...chartSection, ...extraTables];

    exportWorkbook(
        aoa,
        `Laporan_Inventori_Lab_${new Date().toISOString().slice(0, 10)}`,
        "Inventory",
        [{ wch: 30 }, { wch: 15 }, { wch: 5 }, { wch: 30 }, { wch: 15 }]
    );
};
