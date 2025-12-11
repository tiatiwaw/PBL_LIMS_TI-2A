import { useState } from "react";
import {
    CheckCircle,
    FlaskConical,
    Activity,
    Search,
    ListTodo,
} from "lucide-react";
import { useOrderReports } from "@/hooks/useAdmin";
import { COLORS } from "@/utils/constant/report";
import {
    DistributionPieChart,
    KPICard,
    RankingBarChart,
    SimpleBarChart,
} from "@/components/shared/admin/report-components";
import ReportLayout from "@/components/layouts/report-layout";
import { exportOrdersReport } from "@/utils/excel/export/orders-report";

export default function OrdersReportDashboard() {
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");

    const { data, isLoading, error } = useOrderReports({
        year: selectedYear,
        month: selectedMonth,
    });

    const kpi = data?.kpi || {};
    const charts = data?.charts || {};
    const meta = data?.meta || {};

    const handleClearFilters = () => {
        setSelectedYear("all");
        setSelectedMonth("all");
    };

    return (
        <ReportLayout
            title="Laporan Analisis Order"
            headerTitle="Laporan Analisis Order"
            subtitle={
                !isLoading
                    ? `Menampilkan data dari ${kpi.total_orders ?? 0} order.`
                    : "Memuat data..."
            }
            isLoading={isLoading}
            error={error}
            hasData={(kpi.total_orders ?? 0) > 0}
            filterProps={{
                selectedYear,
                selectedMonth,
                availableYears: meta.years || [],
                onYearChange: setSelectedYear,
                onMonthChange: setSelectedMonth,
                onClearFilters: handleClearFilters,
                onExport: () => exportOrdersReport(data),
            }}
            emptyStateIcon={Search}
            emptyStateDescription="Coba sesuaikan filter atau kata kunci pencarian Anda."
            kpiContent={
                <>
                    <KPICard
                        icon={ListTodo}
                        title="Total Order Masuk"
                        value={kpi.total_orders ?? 0}
                        subtitle="Total order diregistrasi"
                        delay={0.1}
                    />
                    <KPICard
                        icon={CheckCircle}
                        title="Order Selesai"
                        value={kpi.completed_orders ?? 0}
                        subtitle="Total order tervalidasi"
                        delay={0.15}
                    />
                    <KPICard
                        icon={FlaskConical}
                        title="Total Sampel Diuji"
                        value={kpi.total_samples ?? 0}
                        subtitle="Spesimen diregistrasi"
                        delay={0.2}
                    />
                    <KPICard
                        icon={Activity}
                        title="Metode Analisis Digunakan"
                        value={kpi.total_analysis_methods ?? 0}
                        subtitle="Frekuensi penggunaan metode"
                        delay={0.25}
                    />
                    <KPICard
                        icon={Activity}
                        title="Metode Tes Paling Sering Digunakan"
                        value={kpi.top_test_methods?.[0] ?? "-"}
                        subtitle={`${(kpi.top_test_methods || [])
                            .slice(0, 5)
                            .join(" | ")}`}
                        delay={0.3}
                    />
                    <KPICard
                        icon={CheckCircle}
                        title="Parameter Paling Sering Digunakan"
                        value={kpi.top_test_parameters?.[0] ?? "-"}
                        subtitle={`${(kpi.top_test_parameters || [])
                            .slice(0, 5)
                            .join(" | ")}`}
                        delay={0.35}
                    />
                </>
            }
            chartContent={
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <DistributionPieChart
                            title="Distribusi Status Order"
                            data={charts.status || []}
                            innerRadius={60}
                            outerRadius={80}
                            delay={0.4}
                        />
                        <DistributionPieChart
                            title="Proporsi Tipe Order"
                            data={charts.type || []}
                            innerRadius={0}
                            outerRadius={80}
                            delay={0.45}
                        />
                        <SimpleBarChart
                            title="Jumlah Sampel Per Order"
                            data={charts.samples_per_order || []}
                            dataKey="count"
                            categoryKey="order"
                            color={COLORS.primary.muda}
                            delay={0.5}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RankingBarChart
                            title="Top Metode Analisis (Paling Sering)"
                            data={charts.methods || []}
                            dataKey="value"
                            delay={0.55}
                        />
                        <SimpleBarChart
                            title="Kategori Sampel Terbanyak"
                            data={charts.categories || []}
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
