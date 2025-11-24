import { useMemo } from 'react';
import { MONTHS } from '@/utils/constant/report';
import { safeGet } from '@/utils/report-helpers';
import { formatDate } from '@/utils/formatters';

export const useTransactionsAnalytics = (orders = [], dateFilter, isYearlyView) => {
    return useMemo(() => {
        const filteredOrders = orders.filter(order =>
            dateFilter(order.order_date)
        );

        let totalRevenue = 0;
        let maxSingleOrderRevenue = 0;
        let totalMethodsUsed = 0;

        const clientRevenueMap = {};
        const methodUsageMap = {};
        const methodRevenueMap = {};
        const trendMap = {};

        filteredOrders.forEach(order => {
            let currentOrderRevenue = 0;

            order.analyses_methods?.forEach(method => {
                const price = parseFloat(safeGet(method, 'pivot.price', 0));
                const methodName = method.analyses_method || 'Metode Tidak Diketahui';

                currentOrderRevenue += price;
                totalMethodsUsed++;

                methodUsageMap[methodName] = (methodUsageMap[methodName] || 0) + 1;
                methodRevenueMap[methodName] = (methodRevenueMap[methodName] || 0) + price;
            });

            totalRevenue += currentOrderRevenue;
            if (currentOrderRevenue > maxSingleOrderRevenue) {
                maxSingleOrderRevenue = currentOrderRevenue;
            }

            const clientName = safeGet(order, 'clients.name', 'Umum/Tunai');
            clientRevenueMap[clientName] = (clientRevenueMap[clientName] || 0) + currentOrderRevenue;

            if (order.order_date) {
                const date = new Date(order.order_date);
                const key = isYearlyView
                    ? date.getFullYear()
                    : MONTHS[date.getMonth()];
                trendMap[key] = (trendMap[key] || 0) + currentOrderRevenue;
            }
        });

        const sortedClients = Object.entries(clientRevenueMap)
            .map(([name, revenue]) => ({ name, revenue }))
            .sort((a, b) => b.revenue - a.revenue);

        const topClient = sortedClients[0] || { name: '-', revenue: 0 };

        const sortedMethodsByUsage = Object.entries(methodUsageMap)
            .map(([name, count]) => ({
                name,
                count,
                totalRev: methodRevenueMap[name] || 0
            }))
            .sort((a, b) => b.count - a.count);

        const topMethod = sortedMethodsByUsage[0] || {
            name: '-',
            count: 0,
            totalRev: 0
        };

        const topMethodAvgPrice = topMethod.count > 0
            ? (topMethod.totalRev / topMethod.count)
            : 0;

        const avgRevenuePerOrder = filteredOrders.length > 0
            ? totalRevenue / filteredOrders.length
            : 0;

        let trendChartData;
        if (isYearlyView) {
            trendChartData = Object.entries(trendMap)
                .map(([year, revenue]) => ({
                    name: year.toString(),
                    revenue
                }))
                .sort((a, b) => parseInt(a.name) - parseInt(b.name));
        } else {
            trendChartData = MONTHS.map(month => ({
                name: month.substring(0, 3),
                fullName: month,
                revenue: trendMap[month] || 0
            }));
        }

        const methodDistributionData = sortedMethodsByUsage
            .slice(0, 5)
            .map(m => ({ name: m.name, value: m.count }));

        const methodRevenueData = Object.entries(methodRevenueMap)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8);

        const detailedOrders = filteredOrders
            .map(order => {
                const revenue = order.analyses_methods?.reduce(
                    (acc, curr) => acc + parseFloat(safeGet(curr, 'pivot.price', 0)),
                    0
                ) || 0;

                return {
                    id: order.id,
                    order_number: order.order_number,
                    client_name: safeGet(order, 'clients.name', '-'),
                    order_type: order.order_type,
                    order_date: formatDate(order.order_date),
                    method_count: order.analyses_methods?.length || 0,
                    revenue
                };
            })
            .sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

        return {
            totalRevenue,
            maxSingleOrderRevenue,
            topClient,
            topMethod,
            topMethodAvgPrice,
            avgRevenuePerOrder,
            totalOrders: filteredOrders.length,

            trendChartData,
            methodDistributionData,
            methodRevenueData,

            detailedOrders,

            isYearlyView
        };
    }, [orders, dateFilter, isYearlyView]);
};