import {
    createPDFDoc,
    addPDFHeader,
    addDataTable,
    savePDF
} from "../pdfSections";
import { buildCategorySection, buildMethodSection, buildParameterSection, buildReferenceSection, buildUnitSection } from "../section/build-test";

export const exportCategoryReportPDF = (categories) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Data Kategori", "Daftar seluruh kategori pengujian yang tersedia");
    // Siapkan Data Tabel
    const tableConfig = buildCategorySection(categories);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Kategori_Laboo_${new Date().toISOString().slice(0, 10)}`);
};

export const exportMethodReportPDF = (methods) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Data Metode Uji", "Daftar seluruh metode uji");

    // Siapkan Data Tabel
    const tableConfig = buildMethodSection(methods);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Metode_Uji_Laboo_${new Date().toISOString().slice(0, 10)}`);
};

export const exportParameterReportPDF = (parameters) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Laporan Data Parameter", "Daftar seluruh parameter pengujian aktif");

    // Siapkan Data Tabel
    const tableConfig = buildParameterSection(parameters);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Parameter_Laboo_${new Date().toISOString().slice(0, 10)}`);
};

export const exportReferenceReportPDF = (references) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Laporan Data Standar Referensi", "Daftar seluruh standar referensi yang tersedia");

    // Siapkan Data Tabel
    const tableConfig = buildReferenceSection(references);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Standar_Referensi_Laboo_${new Date().toISOString().slice(0, 10)}`);
};

export const exportUnitReportPDF = (units) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Data Nilai Satuan", "Daftar seluruh nilai satuan yang tersedia");
    // Siapkan Data Tabel
    const tableConfig = buildUnitSection(units);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Nilai_Unit_Laboo_${new Date().toISOString().slice(0, 10)}`);
};