import {
    createPDFDoc,
    addPDFHeader,
    addDataTable,
    savePDF
} from "../pdfSections";
import { buildBrandsSection, buildEquipmentsSection, buildGradesSection, buildReagentsSection, buildSuppliersSection } from "../section/build-tools-section";

export const exportBrandReportPDF = (brands) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Laporan Data Brand", "Daftar seluruh brand");

    // Siapkan Data Tabel
    const tableConfig = buildBrandsSection(brands);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Brand_Laboo_${new Date().toISOString().slice(0, 10)}`);
};

export const exportGradesReportPDF = (grades) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Laporan Data Grade", "Daftar seluruh Grade");

    // Siapkan Data Tabel
    const tableConfig = buildGradesSection(grades);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Grades_Laboo_${new Date().toISOString().slice(0, 10)}`);
};

export const exportEquipmentReportPDF = (equipments) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Laporan Data Peralatan", "Daftar seluruh Peralatan");

    // Siapkan Data Tabel
    const tableConfig = buildEquipmentsSection(equipments);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Peralatan_Laboo_${new Date().toISOString().slice(0, 10)}`);
};

export const exportReagentReportPDF = (reagents) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Laporan Data Reagen", "Daftar seluruh Reagen");

    // Siapkan Data Tabel
    const tableConfig = buildReagentsSection(reagents);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Reagen_Laboo_${new Date().toISOString().slice(0, 10)}`);
};

export const exportSupplierReportPDF = (suppliers) => {
    const doc = createPDFDoc();
    const currentY = addPDFHeader(doc, "Laporan Data Supplier", "Daftar seluruh Supplier");

    // Siapkan Data Tabel
    const tableConfig = buildSuppliersSection(suppliers);

    // Gambar Tabel di PDF
    addDataTable(doc, currentY, tableConfig);

    savePDF(doc, `Laporan_Supplier_Laboo_${new Date().toISOString().slice(0, 10)}`);
};