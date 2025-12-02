import {
    createPDFDoc,
    addPDFHeader,
    addDataTable,
    savePDF
} from "../pdfSections";
import { buildMethodSection } from "../section/build-method-section";


export const exportMethodReportPDF = (methods) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Data Metode Uji", "Daftar seluruh metode uji");

    // Siapkan Data Tabel
    const tableConfig = buildMethodSection(methods);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Metode_Uji_Laboo_${new Date().toISOString().slice(0, 10)}`);
};