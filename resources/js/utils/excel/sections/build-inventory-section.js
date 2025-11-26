export const buildInventorySection = (analytics) => {
    const rows = [];

    rows.push(["STATUS PERALATAN"]);
    rows.push(["Status", "Jumlah"]);
    rows.push(
        ...analytics.statusChartData.map((item) => [item.name, item.value])
    );
    rows.push([""]);

    const maxRowBrandSupp = Math.max(
        analytics.brandChartData.length,
        analytics.supplierChartData.length
    );

    rows.push(["TOP BRAND PERALATAN", "", "", "TOP SUPPLIER REAGEN"]);
    rows.push(["Nama Brand", "Jumlah", "", "Nama Supplier", "Jumlah"]);

    for (let i = 0; i < maxRowBrandSupp; i++) {
        const brand = analytics.brandChartData[i] || { name: "", value: "" };
        const supplier = analytics.supplierChartData[i] || {
            name: "",
            value: "",
        };

        rows.push([brand.name, brand.value, "", supplier.name, supplier.value]);
    }
    rows.push([""]);

    const maxRowGradeUsage = Math.max(
        analytics.gradeChartData.length,
        analytics.reagentUsageChartData.length
    );

    rows.push([
        "DISTRIBUSI GRADE REAGEN",
        "",
        "",
        "PENGGUNAAN REAGEN TERBANYAK",
    ]);
    rows.push(["Nama Grade", "Jumlah", "", "Nama Reagen", "Frekuensi Pakai"]);

    for (let i = 0; i < maxRowGradeUsage; i++) {
        const grade = analytics.gradeChartData[i] || { name: "", value: "" };
        const usage = analytics.reagentUsageChartData[i] || {
            name: "",
            value: "",
        };

        rows.push([grade.name, grade.value, "", usage.name, usage.value]);
    }
    rows.push([""]);

    rows.push(["TREN PENGADAAN ALAT"]);
    rows.push(["Tahun/Periode", "Jumlah Pengadaan"]);
    rows.push(
        ...analytics.trendChartData.map((item) => [item.name, item.count])
    );

    return rows;
};
