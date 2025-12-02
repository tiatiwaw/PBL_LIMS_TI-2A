import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Membuat dokumen PDF baru
 */
export const createPDFDoc = () => {
    const doc = new jsPDF();
    return doc;
};

/**
 * Menambahkan Judul dan Info Header ke PDF
 */
export const addPDFHeader = (doc, title, subtitle) => {
    // Judul Utama
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(title, 14, 20);

    // Sub-judul / Tanggal
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const dateStr = `Tanggal Export: ${new Date().toLocaleDateString("id-ID")}`;
    doc.text(dateStr, 14, 28);
    
    if (subtitle) {
        doc.text(subtitle, 14, 34);
        return 40; // Mengembalikan posisi Y terakhir
    }
    
    return 34; // Mengembalikan posisi Y terakhir
};

/**
 * Menambahkan Tabel Ringkasan KPI
 */
export const addKPISection = (doc, startY, kpiList) => {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Ringkasan KPI", 14, startY);

    // Siapkan data untuk tabel
    const tableData = kpiList.map(k => [k.label, k.value, k.description]);

    autoTable(doc, {
        startY: startY + 5,
        head: [['Metric', 'Nilai', 'Keterangan']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [2, 77, 96] }, // Warna Hijau Tua (mirip tema aplikasimu)
        styles: { fontSize: 10, cellPadding: 3 },
    });

    return doc.lastAutoTable.finalY + 15; // Kembalikan posisi Y setelah tabel
};

/**
 * Menambahkan Tabel Chart (Data dari Grafik)
 */
export const addChartTables = (doc, startY, charts = []) => {
    let currentY = startY;

    charts.forEach((chart) => {
        // Cek apakah halaman cukup, jika tidak tambah halaman baru
        if (currentY > 250) {
            doc.addPage();
            currentY = 20;
        }

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(chart.title, 14, currentY);

        const tableData = chart.rows.map(r => [r.name, r.value]);

        autoTable(doc, {
            startY: currentY + 5,
            head: [chart.columns], // Contoh: ["Status", "Jumlah"]
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [44, 172, 173] }, // Warna Hijau Muda
            styles: { fontSize: 10 },
            margin: { left: 14 },
        });

        currentY = doc.lastAutoTable.finalY + 15;
    });

    return currentY;
};

export const addDataTable = (doc, startY, tableConfig) => {
    autoTable(doc, {
        startY: startY,
        head: [tableConfig.columns],
        body: tableConfig.rows,
        theme: 'striped',
        headStyles: { fillColor: [2, 77, 96] },
        styles: { fontSize: 10, cellPadding: 3 },
        margin: { top: 20 },
    });
};

/**
 * Menyimpan file PDF
 */
export const savePDF = (doc, filename) => {
    doc.save(`${filename}.pdf`);
};