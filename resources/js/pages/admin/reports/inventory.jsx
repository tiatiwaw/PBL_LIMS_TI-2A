import React, { useMemo } from "react";
import {
    Package,
    Beaker,
    Users,
    Tag,
    CheckCircle,
    ClipboardList,
} from "lucide-react";

import { useInventoryReports } from "@/hooks/useAdmin";
import { useReportFilters } from "@/hooks/useReportFilters";
import { useInventoryAnalytics } from "@/hooks/analytics/useInventoryAnalytics";
import { COLORS } from "@/utils/constant/report";

import {
    DistributionPieChart,
    KPICard,
    RankingBarChart,
    TrendLineChart,
} from "@/components/shared/admin/report-components";
import ReportLayout from "@/components/layouts/report-layout";
import { exportInventoryReport } from "@/utils/excel/export/inventories-report";
// import { exportInventoryReportPDF } from "@/utils/pdf/export/inventory-report";

export default function AdminReportInventory() {
    const filters = useReportFilters(
        [],
        ["purchase_year", "created_at", "order_date"]
    );

    const query = useMemo(
        () => ({
            ...(filters.selectedYear !== "all"
                ? { year: filters.selectedYear }
                : {}),
            ...(filters.selectedMonth !== "all"
                ? { month: String(parseInt(filters.selectedMonth) + 1) }
                : {}),
        }),
        [filters.selectedYear, filters.selectedMonth]
    );

    const { data: apiData, isLoading, error } = useInventoryReports(query);

    // Analytics expects already-filtered data from API; pass a no-op dateFilter
    const analytics = useInventoryAnalytics(
        apiData,
        () => true,
        filters.isYearlyView
    );

    console.log(analytics);

    const handleExport = () => exportInventoryReport(analytics);

    const hasData = analytics.totalEquipment > 0 || analytics.totalReagents > 0;

    return (
        <ReportLayout
            title="Laporan Inventori"
            headerTitle="Laporan Inventori"
            subtitle={`Menampilkan data dari ${analytics.totalEquipment} alat dan ${analytics.totalReagents} reagen.`}
            isLoading={isLoading}
            error={error}
            hasData={hasData}
            filterProps={{
                selectedYear: filters.selectedYear,
                selectedMonth: filters.selectedMonth,
                // Prefer available years returned from API, fallback to computed list
                availableYears:
                    apiData?.available_years?.all || filters.availableYears,
                onYearChange: filters.setSelectedYear,
                onMonthChange: filters.setSelectedMonth,
                onClearFilters: filters.clearFilters,
                onExport: handleExport,
            }}
            emptyStateIcon={Package}
            kpiContent={
                <>
                    <KPICard
                        icon={Package}
                        title="Total Equipment"
                        value={analytics.totalEquipment}
                        subtitle={`Avail: ${analytics.statusCounts.available} | Unavail: ${analytics.statusCounts.unavailable} | Maint: ${analytics.statusCounts.maintenance} | Broken: ${analytics.statusCounts.broken}`}
                        delay={0.1}
                    />
                    <KPICard
                        icon={CheckCircle}
                        title="Alat Sering Dipakai"
                        value={analytics.topEquipment.name}
                        subtitle={`Digunakan ${analytics.topEquipment.count} kali`}
                        delay={0.2}
                    />
                    <KPICard
                        icon={ClipboardList}
                        title="Reagen Sering Dipakai"
                        value={analytics.topReagent.name}
                        subtitle={`Digunakan ${analytics.topReagent.count} kali`}
                        delay={0.25}
                    />
                    <KPICard
                        icon={Beaker}
                        title="Total Stok Reagen"
                        value={analytics.totalReagents}
                        subtitle="Item kimia terdaftar"
                        delay={0.3}
                    />
                    <KPICard
                        icon={Tag}
                        title="Total Brand"
                        value={analytics.totalBrands}
                        subtitle="Master data merek"
                        delay={0.4}
                    />
                    <KPICard
                        icon={Users}
                        title="Total Supplier"
                        value={analytics.totalSuppliers}
                        subtitle="Master data pemasok"
                        delay={0.6}
                    />
                </>
            }
            chartContent={
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <DistributionPieChart
                        title="Status Distribusi Peralatan"
                        data={analytics.statusChartData}
                        delay={0.4}
                    />

                    <RankingBarChart
                        title="Top Brand Peralatan"
                        data={analytics.brandChartData}
                        dataKey="value"
                        colorMain={COLORS.primary.muda}
                        className="lg:col-span-2"
                        delay={0.5}
                    />

                    <RankingBarChart
                        title="Top Supplier Reagen"
                        data={analytics.supplierChartData}
                        dataKey="value"
                        colorMain="#024D60"
                        className="lg:col-span-2"
                        delay={0.6}
                    />

                    <DistributionPieChart
                        title="Distribusi Grade Reagen"
                        data={analytics.gradeChartData}
                        delay={0.7}
                    />

                    <TrendLineChart
                        title={`Tren Pengadaan Alat (${
                            analytics.isYearlyView
                                ? "Tahunan"
                                : `Bulanan - ${filters.selectedYear}`
                        })`}
                        data={analytics.trendChartData}
                        dataKey="count"
                        className="lg:col-span-3"
                        delay={0.8}
                    />
                </div>
            }
        />
    );
}
