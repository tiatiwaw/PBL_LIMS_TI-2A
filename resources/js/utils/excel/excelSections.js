import * as XLSX from "xlsx";

export const buildSummarySection = (title, kpiList) => [
    [title],
    [`Tanggal Export: ${new Date().toLocaleDateString("id-ID")}`],
    [""],
    ["RINGKASAN KPI"],
    ["Metric", "Nilai", "Keterangan"],
    ...kpiList.map((k) => [k.label, k.value, k.description]),
    [""],
];

export const buildChartSection = (charts = []) => {
    const aoa = [];

    charts.forEach((chart, index) => {
        aoa.push([chart.title]);
        aoa.push(chart.columns);
        aoa.push(...chart.rows.map((r) => [r.name, r.value]));
        if (index < charts.length - 1) aoa.push([""]);
    });

    return aoa;
};

export const exportWorkbook = (
    aoa,
    filename,
    sheetName = "Report",
    columnWidths
) => {
    const sheet = XLSX.utils.aoa_to_sheet(aoa);

    if (columnWidths) sheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};
