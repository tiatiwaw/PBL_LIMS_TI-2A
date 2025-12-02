import {
    createPDFDoc,
    addPDFHeader,
    addDataTable,
    savePDF
} from "../pdfSections";
import { buildUnitSection } from "../section/build-unit-value-section";


export const exportUnitReportPDF = (units) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Data Nilai Satuan", "Daftar seluruh nilai satuan yang tersedia");
    // Siapkan Data Tabel
    const tableConfig = buildUnitSection(units);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Nilai_Unit_Laboo_${new Date().toISOString().slice(0, 10)}`);
};