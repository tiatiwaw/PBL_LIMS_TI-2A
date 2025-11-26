import { formatCurrency } from "@/utils/formatters";

export const buildTransactionsSection = (analytics) => {
    const rows = [];

    rows.push(["DATA TREN PENDAPATAN"]);
    rows.push(["Periode", "Pendapatan"]);
    rows.push(
        ...analytics.trendChartData.map((i) => [
            i.name,
            formatCurrency(i.revenue),
        ])
    );
    rows.push([""]);

    rows.push(["ANALISIS PERFORMA METODE"]);
    rows.push(["Nama Metode", "Jumlah Penggunaan", "Total Pendapatan"]);

    const revenueMap = {};
    analytics.methodRevenueData.forEach((m) => {
        revenueMap[m.name] = m.value;
    });

    rows.push(
        ...analytics.methodDistributionData.map((m) => [
            m.name,
            m.value,
            formatCurrency(revenueMap[m.name] || 0),
        ])
    );
    rows.push([""]);

    rows.push(["DETAIL TRANSAKSI"]);
    rows.push([
        "No",
        "No. Order",
        "Klien",
        "Tipe Order",
        "Tanggal",
        "Jml Metode",
        "Pendapatan",
    ]);

    rows.push(
        ...analytics.detailedOrders.map((order, index) => [
            index + 1,
            order.order_number,
            order.client_name,
            order.order_type,
            order.order_date,
            order.method_count,
            formatCurrency(order.revenue),
        ])
    );

    return rows;
};
