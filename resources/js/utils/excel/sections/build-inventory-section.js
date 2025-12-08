export const buildInventorySection = (charts = {}) => {
    const rows = [];

    const statusData = charts.status || [];
    const brandData = charts.brands || [];
    const supplierData = charts.suppliers || [];
    const gradeData = charts.grades || [];
    const trendData = charts.trend || [];

    rows.push(["STATUS PERALATAN"]);
    rows.push(["Status", "Jumlah"]);
    rows.push(...statusData.map((item) => [item.name, item.value]));
    rows.push([""]);

    const maxRowBrandSupp = Math.max(brandData.length, supplierData.length);

    rows.push(["TOP BRAND PERALATAN", "", "", "TOP SUPPLIER REAGEN"]);
    rows.push(["Nama Brand", "Jumlah", "", "Nama Supplier", "Jumlah"]);

    for (let i = 0; i < maxRowBrandSupp; i++) {
        const brand = brandData[i] || { name: "", value: "" };
        const supplier = supplierData[i] || { name: "", value: "" };

        rows.push([brand.name, brand.value, "", supplier.name, supplier.value]);
    }
    rows.push([""]);

    rows.push(["DISTRIBUSI GRADE REAGEN"]);
    rows.push(["Nama Grade", "Jumlah"]);

    gradeData.forEach((grade) => {
        rows.push([grade.name, grade.value]);
    });
    rows.push([""]);

    rows.push(["TREN PENGADAAN ALAT"]);
    rows.push(["Tahun/Periode", "Jumlah Pengadaan"]);
    rows.push(...trendData.map((item) => [item.name, item.count]));

    return rows;
};
