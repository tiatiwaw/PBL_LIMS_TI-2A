import { useMemo } from "react";
import { objectToChartData, safeGet } from "@/utils/report-helpers";
import { COLORS, MONTHS } from "@/utils/constant/report";

export const useInventoryAnalytics = (data = {}, dateFilter, isYearlyView) => {
    return useMemo(() => {
        const {
            equipments = [],
            reagents = [],
            brands = [],
            suppliers = [],
            grades = [],
            orders = []
        } = data;

        const filteredEquipments = equipments.filter(e => dateFilter(e.purchase_year));
        const filteredReagents = reagents.filter(r => dateFilter(r.created_at));
        const filteredOrders = orders.filter(o => dateFilter(o.order_date));

        const statusCounts = { active: 0, maintenance: 0, broken: 0 };
        filteredEquipments.forEach(e => {
            const status = e.status || "broken";
            if (statusCounts[status] !== undefined) statusCounts[status]++;
        });

        const equipmentUsage = {};
        const reagentUsage = {};

        filteredOrders.forEach(order => {
            order.samples?.forEach(sample => {
                const methods = Array.isArray(sample.n_parameter_methods)
                    ? sample.n_parameter_methods
                    : sample.n_parameter_methods
                        ? [sample.n_parameter_methods]
                        : [];

                methods.forEach(method => {
                    method.equipments?.forEach(eq => {
                        const name = eq.name || "Tanpa Nama";
                        equipmentUsage[name] = (equipmentUsage[name] || 0) + 1;
                    });
                    method.reagents?.forEach(rg => {
                        const name = rg.name || "Tanpa Nama";
                        reagentUsage[name] = (reagentUsage[name] || 0) + 1;
                    });
                });
            });
        });

        const getTopItem = (obj) => {
            const entries = Object.entries(obj);
            if (!entries.length) return { name: "-", count: 0 };
            const [name, count] = entries.sort((a, b) => b[1] - a[1])[0];
            return { name, count };
        };

        const statusChartData = [
            { name: "Active", value: statusCounts.active, color: "#2CACAD" },
            { name: "Maintenance", value: statusCounts.maintenance, color: "#024D60" },
            { name: "Broken", value: statusCounts.broken, color: "#02364B" }
        ].filter(d => d.value > 0);

        const brandChartData = objectToChartData(
            filteredEquipments.reduce((acc, e) => {
                const name = safeGet(e, "brand_types.name", "Unknown");
                if (name !== "Unknown") acc[name] = (acc[name] || 0) + 1;
                return acc;
            }, {}),
            10
        );

        const supplierChartData = objectToChartData(
            filteredReagents.reduce((acc, r) => {
                const name = safeGet(r, "suppliers.name", "Unknown");
                if (name !== "Unknown") acc[name] = (acc[name] || 0) + 1;
                return acc;
            }, {}),
            10
        );

        const gradeChartData = objectToChartData(
            filteredReagents.reduce((acc, r) => {
                const name = safeGet(r, "grades.name", "Unknown");
                if (name !== "Unknown") acc[name] = (acc[name] || 0) + 1;
                return acc;
            }, {})
        ).map((item, i) => ({
            ...item,
            color: COLORS.chartPalette[i % COLORS.chartPalette.length]
        }));

        const reagentUsageChartData = objectToChartData(reagentUsage, 10);

        const trendMap = {};
        filteredEquipments.forEach(e => {
            if (e.purchase_year) {
                const date = new Date(e.purchase_year);
                const key = isYearlyView ? date.getFullYear() : MONTHS[date.getMonth()];
                trendMap[key] = (trendMap[key] || 0) + 1;
            }
        });

        const trendChartData = isYearlyView
            ? Object.entries(trendMap)
                .map(([year, count]) => ({ year: +year, name: year, count }))
                .sort((a, b) => a.year - b.year)
            : MONTHS.map(month => ({
                name: month.slice(0, 3),
                fullName: month,
                count: trendMap[month] || 0
            }));

        return {
            totalEquipment: filteredEquipments.length,
            totalReagents: filteredReagents.length,
            totalBrands: brands.length,
            totalSuppliers: suppliers.length,
            totalGrades: grades.length,

            statusCounts,
            topEquipment: getTopItem(equipmentUsage),
            topReagent: getTopItem(reagentUsage),

            statusChartData,
            brandChartData,
            supplierChartData,
            gradeChartData,
            reagentUsageChartData,
            trendChartData,

            isYearlyView
        };
    }, [data, dateFilter, isYearlyView]);
};
