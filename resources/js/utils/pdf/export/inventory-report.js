import {
    createPDFDoc,
    addPDFHeader,
    addKPISection,
    addChartTables,
    savePDF
} from "../pdfSections"; // Import helper PDF
import { prepareInventoryTables } from "../section/build-inventory-section"; // Import builder konten

export const exportInventoryReportPDF = (analytics) => {
    const doc = createPDFDoc();

    let currentY = addPDFHeader(doc, "LAPORAN INVENTORI LABORATORIUM", "Data per " + new Date().toLocaleDateString("id-ID"));

    // 3. Siapkan Data KPI
    const kpiList = [
        {
            label: "Total Equipment",
            value: analytics.totalEquipment,
            description: `Avail: ${analytics.statusCounts.available} | Broken: ${analytics.statusCounts.broken}`,
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
    ];

    // 4. Tambah Bagian KPI ke PDF
    currentY = addKPISection(doc, currentY, kpiList);

    // 5. Siapkan & Tambah Data Tabel (dari grafik)
    const chartTables = prepareInventoryTables(analytics);
    addChartTables(doc, currentY, chartTables);

    // 6. Simpan File
    savePDF(doc, `Laporan_Inventori_Laboo_${new Date().toISOString().slice(0, 10)}`);
};