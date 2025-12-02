/**
 * Menyiapkan data chart untuk ditampilkan sebagai tabel di PDF
 */
export const prepareInventoryTables = (analytics) => {
    const tables = [];

    // 1. Tabel Status Peralatan
    tables.push({
        title: "Distribusi Status Peralatan",
        columns: ["Status", "Jumlah"],
        rows: analytics.statusChartData
    });

    // 2. Tabel Top Brand (Mengambil 5 teratas misalnya)
    tables.push({
        title: "Top Brand Peralatan",
        columns: ["Nama Brand", "Jumlah"],
        rows: analytics.brandChartData.slice(0, 10) // Ambil 10 teratas agar tidak kepanjangan
    });

    // 3. Tabel Top Supplier
    tables.push({
        title: "Top Supplier Reagen",
        columns: ["Nama Supplier", "Jumlah"],
        rows: analytics.supplierChartData.slice(0, 10)
    });

    // 4. Tabel Tren Pengadaan (Khusus ini kita format datanya sedikit)
    tables.push({
        title: "Tren Pengadaan Alat",
        columns: ["Periode", "Jumlah Pengadaan"],
        rows: analytics.trendChartData.map(item => ({
            name: item.name,
            value: item.count
        }))
    });

    return tables;
};