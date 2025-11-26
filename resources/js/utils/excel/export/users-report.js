import {
    buildSummarySection,
    buildChartSection,
    exportWorkbook,
} from "../excelSections";
import { buildUsersSection } from "../sections/build-user-section";

export const exportUsersReport = (analytics) => {
    const summary = buildSummarySection(
        "LAPORAN ANALISIS PENGGUNA & PERFORMA TIM",
        [
            {
                label: "Total Analis",
                value: analytics.totalAnalysts,
                description: "Pengguna role Analyst",
            },
            {
                label: "Total Pelanggan",
                value: analytics.totalClients,
                description: "Pengguna role Client",
            },
            {
                label: "Top Pelanggan",
                value: analytics.topClient.name,
                description: `${analytics.topClient.orders} Order`,
            },
            {
                label: "Top Analis",
                value: analytics.topAnalyst.name,
                description: `${analytics.topAnalyst.tests} Sampel Ditangani`,
            },
            {
                label: "Rerata Analis / Order",
                value: analytics.avgAnalystsPerOrder,
                description: "Rata-rata tim per project",
            },
            {
                label: "Total User (Non-Admin)",
                value: analytics.totalNonAdmins,
                description: "Client, Analyst, Staff, dll",
            },
        ]
    );

    const charts = buildChartSection([
        {
            title: "DISTRIBUSI ROLE PENGGUNA",
            columns: ["Role", "Jumlah User"],
            rows: analytics.roleDistribution,
        },
    ]);

    const table = buildUsersSection(analytics);

    const aoa = [...summary, ...charts, ...table];

    exportWorkbook(
        aoa,
        `Laporan_User_Laboo_${new Date().toISOString().slice(0, 10)}`,
        "Users",
        [{ wch: 30 }, { wch: 15 }, { wch: 5 }, { wch: 30 }, { wch: 15 }]
    );
};
