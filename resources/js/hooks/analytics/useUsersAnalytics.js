import { safeGet } from "@/utils/report-helpers";
import { useMemo } from "react";

export const useUsersAnalytics = (data, dateFilter, isAllPeriod) => {
    return useMemo(() => {
        const { users = [], orders = [] } = data || {};

        const filteredUsers = users.filter((u) => dateFilter(u.created_at));
        const filteredOrders = orders.filter((o) => dateFilter(o.order_date));

        const displayedUsers = isAllPeriod ? users : filteredUsers;

        const analysts = displayedUsers.filter((u) => u.role === "analyst");
        const clients = displayedUsers.filter((u) => u.role === "client");
        const staffs = displayedUsers.filter((u) => u.role === "staff");
        const supervisors = displayedUsers.filter(
            (u) => u.role === "supervisor"
        );
        const managers = displayedUsers.filter((u) => u.role === "manager");
        const nonAdmins = displayedUsers.filter((u) => u.role !== "admin");

        const clientOrderCounts = {};
        filteredOrders.forEach((order) => {
            const clientName = safeGet(order, "clients.name", "Unknown Client");
            clientOrderCounts[clientName] =
                (clientOrderCounts[clientName] || 0) + 1;
        });

        const analystTestCounts = {};
        let totalAnalystsAssigned = 0;
        let ordersWithAnalysts = 0;

        filteredOrders.forEach((order) => {
            const sampleCount = order.samples?.length || 0;
            const assignedAnalysts = order.analysts || [];

            if (assignedAnalysts.length > 0) {
                totalAnalystsAssigned += assignedAnalysts.length;
                ordersWithAnalysts++;

                assignedAnalysts.forEach((analyst) => {
                    const name = analyst.name || "Unknown Analyst";
                    analystTestCounts[name] =
                        (analystTestCounts[name] || 0) + sampleCount;
                });
            }
        });

        const sortedClients = Object.entries(clientOrderCounts)
            .map(([name, orders]) => ({ name, orders }))
            .sort((a, b) => b.orders - a.orders);

        const sortedAnalysts = Object.entries(analystTestCounts)
            .map(([name, tests]) => ({ name, tests }))
            .sort((a, b) => b.tests - a.tests);

        const topClient = sortedClients[0] || { name: "-", orders: 0 };
        const topAnalyst = sortedAnalysts[0] || { name: "-", tests: 0 };

        const avgAnalystsPerOrder =
            ordersWithAnalysts > 0
                ? (totalAnalystsAssigned / ordersWithAnalysts).toFixed(1)
                : 0;

        const roleDistribution = [
            { name: "Clients", value: clients.length },
            { name: "Analysts", value: analysts.length },
            { name: "Supervisors", value: supervisors.length },
            { name: "Managers", value: managers.length },
            { name: "Staffs", value: staffs.length },
        ].filter((d) => d.value > 0);

        const clientRankingData = sortedClients.slice(0, 5);
        const analystActivityData = sortedAnalysts.slice(0, 5);

        return {
            totalAnalysts: analysts.length,
            totalClients: clients.length,
            totalNonAdmins: nonAdmins.length,
            topClient,
            topAnalyst,
            avgAnalystsPerOrder,

            roleDistribution,
            clientRankingData,
            analystActivityData,

            sortedClients,
            sortedAnalysts,
        };
    }, [data, dateFilter, isAllPeriod]);
};
