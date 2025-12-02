import {
    createPDFDoc,
    addPDFHeader,
    addDataTable,
    savePDF
} from "../pdfSections";
import { buildCategorySection } from "../section/build-category-section";

export const exportCategoryReportPDF = (categories) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Data Kategori", "Daftar seluruh kategori pengujian yang tersedia");
    // Siapkan Data Tabel
    const tableConfig = buildCategorySection(categories);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Kategori_Laboo_${new Date().toISOString().slice(0, 10)}`);
};