import {
    CheckCircle,
    FlaskConical,
    Activity,
    Search,
    ListTodo,
} from "lucide-react";

import { useOrderReports } from "@/hooks/useAdmin";
import { useReportFilters } from "@/hooks/useReportFilters";
import { useOrdersAnalytics } from "@/hooks/analytics/useOrdersAnalytics";
import { COLORS, STATUS_CONFIG } from "@/utils/constant/report";

import {
    DistributionPieChart,
    KPICard,
    RankingBarChart,
    SimpleBarChart,
} from "@/components/shared/admin/report-components";
import ReportLayout from "@/components/layouts/report-layout";

export default function OrdersReportDashboard() {
    const { data: orders = [], isLoading, error } = useOrderReports();
    const filters = useReportFilters([orders], ["order_date"]);
    const analytics = useOrdersAnalytics(orders, filters.dateFilter);

    const handleExport = () => console.log("Export orders data");

    const enhancedStatusChart = analytics.statusChart.map((entry, index) => {
        const statusKey = Object.keys(STATUS_CONFIG).find(
            (k) => STATUS_CONFIG[k].label === entry.name
        );
        return {
            ...entry,
            color:
                STATUS_CONFIG[statusKey]?.color || COLORS.chartPalette[index],
        };
    });

    return (
        <ReportLayout
            title="Laporan Analisis Order"
            headerTitle="Laporan Analisis Order"
            subtitle={`Menampilkan data dari ${analytics.filteredOrders.length} order.`}
            isLoading={isLoading}
            error={error}
            hasData={analytics.filteredOrders.length > 0}
            filterProps={{
                selectedYear: filters.selectedYear,
                selectedMonth: filters.selectedMonth,
                availableYears: filters.availableYears,
                onYearChange: filters.setSelectedYear,
                onMonthChange: filters.setSelectedMonth,
                onClearFilters: filters.clearFilters,
                onExport: handleExport,
            }}
            emptyStateIcon={Search}
            emptyStateDescription="Coba sesuaikan filter atau kata kunci pencarian Anda."
            kpiContent={
                <>
                    <KPICard
                        icon={ListTodo}
                        title="Total Order Masuk"
                        value={analytics.totalOrders}
                        subtitle="Total order diregistrasi"
                        delay={0.1}
                    />
                    <KPICard
                        icon={CheckCircle}
                        title="Order Selesai"
                        value={analytics.completedOrders}
                        subtitle="Total order tervalidasi"
                        delay={0.15}
                    />
                    <KPICard
                        icon={FlaskConical}
                        title="Total Sampel Diuji"
                        value={analytics.totalSamples}
                        subtitle="Spesimen diregistrasi"
                        delay={0.2}
                    />
                    <KPICard
                        icon={Activity}
                        title="Metode Analisis Digunakan"
                        value={analytics.totalAnalysisMethods}
                        subtitle="Frekuensi penggunaan metode"
                        delay={0.25}
                    />
                    <KPICard
                        icon={Activity}
                        title="Metode Tes Digunakan"
                        value={analytics.totalMethods}
                        subtitle="Total metode tes aktif"
                        delay={0.3}
                    />
                    <KPICard
                        icon={CheckCircle}
                        title="Parameter Diterapkan"
                        value={analytics.totalParameters}
                        subtitle="Parameter pada sampel"
                        delay={0.35}
                    />
                </>
            }
            chartContent={
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <DistributionPieChart
                            title="Distribusi Status Order"
                            data={enhancedStatusChart}
                            innerRadius={60}
                            outerRadius={80}
                            delay={0.4}
                        />
                        <DistributionPieChart
                            title="Proporsi Tipe Order"
                            data={analytics.typeChart}
                            innerRadius={0}
                            outerRadius={80}
                            delay={0.45}
                        />
                        <SimpleBarChart
                            title="Jumlah Sampel Per Order"
                            data={analytics.samplesPerOrder}
                            dataKey="count"
                            categoryKey="order"
                            color={COLORS.primary.muda}
                            delay={0.5}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RankingBarChart
                            title="Top Metode Analisis (Paling Sering)"
                            data={analytics.methodChart}
                            dataKey="value"
                            delay={0.55}
                        />
                        <SimpleBarChart
                            title="Kategori Sampel Terbanyak"
                            data={analytics.categoryChart}
                            dataKey="value"
                            color="#2CACAD"
                            delay={0.6}
                        />
                    </div>
                </>
            }
        />
    );
}
