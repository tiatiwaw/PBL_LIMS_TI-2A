import {
    createPDFDoc,
    addPDFHeader,
    addDataTable,
    savePDF
} from "../pdfSections";
import { buildReferenceSection } from "../section/build-standard-reference-section";


export const exportReferenceReportPDF = (references) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Laporan Data Standar Referensi", "Daftar seluruh standar referensi yang tersedia");

    // Siapkan Data Tabel
    const tableConfig = buildReferenceSection(references);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Standar_Referensi_Laboo_${new Date().toISOString().slice(0, 10)}`);
};