import { useMemo } from "react";
import { safeGet } from "@/utils/report-helpers";
import { STATUS_CONFIG, TYPE_LABELS } from "@/utils/constant/report";

export const useOrdersAnalytics = (orders = [], dateFilter) => {
    return useMemo(() => {
        const filteredOrders = orders.filter((order) => {
            const orderDate = order.order_date;
            if (!orderDate) return false;

            const date = new Date(orderDate);
            if (isNaN(date.getTime())) return false;

            return dateFilter(orderDate);
        });

        const stats = {
            totalOrders: filteredOrders.length,
            completedOrders: 0,
            totalSamples: 0,
            totalAnalysisMethods: 0,
            totalMethods: 0,
            totalParameters: 0,
            typeCounts: { internal: 0, regular: 0, external: 0, urgent: 0 },
            statusDist: {},
            typeDist: {},
            samplesPerOrder: [],
            methodsRank: {},
            categoryDist: {},
            equipmentRank: {},
            supplierRank: {},
        };

        Object.keys(STATUS_CONFIG).forEach((key) => {
            stats.statusDist[STATUS_CONFIG[key].label] = 0;
        });

        const methodStats = {};
        const paramStats = {};

        const updateStat = (collection, name, timestamp) => {
            if (!name) return;

            if (!collection[name]) {
                collection[name] = { count: 0, firstSeen: timestamp };
            }

            collection[name].count += 1;

            if (timestamp < collection[name].firstSeen) {
                collection[name].firstSeen = timestamp;
            }
        };

        filteredOrders.forEach((order) => {
            const orderTs = new Date(order.order_date).getTime();

            if (stats.typeCounts.hasOwnProperty(order.order_type)) {
                stats.typeCounts[order.order_type]++;
            }

            if (order.status === "completed") {
                stats.completedOrders++;
            }

            const sampleCount = order.samples?.length || 0;
            stats.totalSamples += sampleCount;
            stats.samplesPerOrder.push({
                order: order.order_number,
                count: sampleCount,
            });

            const statusLabel =
                STATUS_CONFIG[order.status]?.label || order.status;
            stats.statusDist[statusLabel] =
                (stats.statusDist[statusLabel] || 0) + 1;

            const typeLabel = TYPE_LABELS[order.order_type] || order.order_type;
            stats.typeDist[typeLabel] = (stats.typeDist[typeLabel] || 0) + 1;

            order.analyses_methods?.forEach((method) => {
                stats.totalAnalysisMethods++;
                const methodName =
                    method.analyses_method || "Metode Tidak Diketahui";
                stats.methodsRank[methodName] =
                    (stats.methodsRank[methodName] || 0) + 1;
            });

            order.samples?.forEach((sample) => {
                const categoryName = safeGet(
                    sample,
                    "sample_categories.name",
                    "Tanpa Kategori"
                );
                stats.categoryDist[categoryName] =
                    (stats.categoryDist[categoryName] || 0) + 1;

                let rawData = sample.n_parameter_methods;
                const pmList = Array.isArray(rawData)
                    ? rawData
                    : rawData
                    ? [rawData]
                    : [];

                pmList.forEach((pm) => {
                    if (pm.test_parameters?.name) {
                        updateStat(
                            paramStats,
                            pm.test_parameters.name,
                            orderTs
                        );
                    }

                    if (pm.test_methods?.name) {
                        updateStat(methodStats, pm.test_methods.name, orderTs);
                    }
                });
            });
        });

        const formatForChart = (obj, limit = 5) => {
            return Object.entries(obj)
                .map(([name, value]) => ({ name, value }))
                .filter((item) => item.value > 0)
                .sort((a, b) => b.value - a.value)
                .slice(0, limit);
        };

        const getSortedList = (collection, limit = 5) => {
            return Object.entries(collection)
                .sort(([, a], [, b]) => {
                    if (b.count !== a.count) {
                        return b.count - a.count;
                    }
                    return a.firstSeen - b.firstSeen;
                })
                .slice(0, limit)
                .map(([name]) => name);
        };

        const statusChart = formatForChart(stats.statusDist, 9);
        const typeChart = formatForChart(stats.typeDist, 4);
        const methodChart = formatForChart(stats.methodsRank, 7);
        const categoryChart = formatForChart(stats.categoryDist, 6);
        const equipmentChart = formatForChart(stats.equipmentRank, 5);
        const supplierChart = formatForChart(stats.supplierRank, 5);

        return {
            totalOrders: stats.totalOrders,
            completedOrders: stats.completedOrders,
            totalSamples: stats.totalSamples,
            totalAnalysisMethods: stats.totalAnalysisMethods,

            topTestParameters: getSortedList(paramStats),
            topTestMethods: getSortedList(methodStats),

            typeCounts: stats.typeCounts,

            statusChart,
            typeChart,
            methodChart,
            categoryChart,
            equipmentChart,
            supplierChart,
            samplesPerOrder: stats.samplesPerOrder.slice(0, 10),

            filteredOrders,
        };
    }, [orders, dateFilter]);
};
