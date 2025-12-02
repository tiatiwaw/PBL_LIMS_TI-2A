import {
    createPDFDoc,
    addPDFHeader,
    addDataTable,
    savePDF
} from "../pdfSections";
import { buildParameterSection } from "../section/build-parameter-section";

export const exportParameterReportPDF = (parameters) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Laporan Data Parameter", "Daftar seluruh parameter pengujian aktif");

    // Siapkan Data Tabel
    const tableConfig = buildParameterSection(parameters);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Parameter_Laboo_${new Date().toISOString().slice(0, 10)}`);
};