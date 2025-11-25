export const buildUsersSection = (analytics) => {
    const rows = [];

    const clients =
        analytics.sortedClients || analytics.clientRankingData || [];
    const analysts =
        analytics.sortedAnalysts || analytics.analystActivityData || [];

    const maxRows = Math.max(clients.length, analysts.length);

    rows.push([
        "PERFORMA PELANGGAN (ORDER)",
        "",
        "",
        "PERFORMA ANALIS (SAMPEL)",
    ]);
    rows.push([
        "Nama Pelanggan",
        "Total Order",
        "",
        "Nama Analis",
        "Total Sampel",
    ]);

    for (let i = 0; i < maxRows; i++) {
        const client = clients[i] || { name: "", orders: "" };
        const analyst = analysts[i] || { name: "", tests: "" };

        rows.push([
            client.name,
            client.orders,
            "",
            analyst.name,
            analyst.tests,
        ]);
    }

    return rows;
};
