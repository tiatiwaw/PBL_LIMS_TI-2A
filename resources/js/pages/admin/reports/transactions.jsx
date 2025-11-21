import { useState } from "react";
import {
    TrendingUp,
    Package,
    Activity,
    Wallet,
    Users,
    CreditCard,
    Search,
} from "lucide-react";

import { useTransactionReports } from "@/hooks/useAdmin";
import { useReportFilters } from "@/hooks/useReportFilters";
import { useTransactionsAnalytics } from "@/hooks/analytics/useTransactionsAnalytics";
import { MONTHS } from "@/utils/constant/report";
import { formatCurrency } from "@/utils/formatters";

import {
    DistributionPieChart,
    KPICard,
    RankingBarChart,
    TransactionTable,
    TrendAreaChart,
} from "@/components/shared/admin/report-components";
import ReportLayout from "@/components/layouts/report-layout";

export default function SalesReportDashboard() {
    const { data: orders = [], isLoading, error } = useTransactionReports();
    const [page, setPage] = useState(1);

    const filters = useReportFilters([orders], ["order_date"]);
    const analytics = useTransactionsAnalytics(
        orders,
        filters.dateFilter,
        filters.isYearlyView
    );

    const handleExport = () => console.log("Export transaction data");

    const getTruncatedClientName = (name) =>
        name.length > 18 ? name.substring(0, 18) + "..." : name;

    return (
        <ReportLayout
            title="Laporan Keuangan"
            headerTitle="Laporan Keuangan"
            subtitle="Analisis real-time metrik pendapatan laboratorium."
            isLoading={isLoading}
            error={error}
            hasData={analytics.totalOrders > 0}
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
            emptyStateDescription="Coba sesuaikan filter tahun, bulan, atau kata kunci pencarian Anda."
            kpiContent={
                <>
                    <KPICard
                        icon={Wallet}
                        title="Total Pendapatan"
                        value={formatCurrency(analytics.totalRevenue)}
                        subtitle={`Dari ${analytics.totalOrders} transaksi`}
                        delay={0.1}
                    />
                    <KPICard
                        icon={TrendingUp}
                        title="Order Tertinggi"
                        value={formatCurrency(analytics.maxSingleOrderRevenue)}
                        subtitle="Nilai transaksi tunggal maks"
                        delay={0.2}
                    />
                    <KPICard
                        icon={Users}
                        title="Pelanggan Top"
                        value={getTruncatedClientName(analytics.topClient.name)}
                        subtitle={`Total: ${formatCurrency(
                            analytics.topClient.revenue
                        )}`}
                        delay={0.3}
                    />
                    <KPICard
                        icon={Package}
                        title="Metode Favorit"
                        value={analytics.topMethod.name}
                        subtitle={`${
                            analytics.topMethod.count
                        }x order (~${formatCurrency(
                            analytics.topMethodAvgPrice
                        )})`}
                        delay={0.4}
                    />
                    <KPICard
                        icon={Activity}
                        title="Rerata Order"
                        value={formatCurrency(analytics.avgRevenuePerOrder)}
                        subtitle="Nilai rata-rata per invoice"
                        delay={0.5}
                    />
                    <KPICard
                        icon={CreditCard}
                        title={
                            analytics.isYearlyView
                                ? "Pendapatan Total"
                                : `Pendapatan ${MONTHS[filters.selectedMonth]}`
                        }
                        value={formatCurrency(analytics.totalRevenue)}
                        subtitle="Periode terpilih"
                        delay={0.6}
                    />
                </>
            }
            chartContent={
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <TrendAreaChart
                            title="Tren Pendapatan"
                            data={analytics.trendChartData}
                            dataKey="revenue"
                            tooltipFormatter={formatCurrency}
                            className="col-span-1 lg:col-span-2"
                            delay={0.1}
                        />
                        <DistributionPieChart
                            title="Distribusi Metode"
                            data={analytics.methodDistributionData}
                            innerRadius={65}
                            outerRadius={85}
                            delay={0.2}
                        />
                    </div>

                    <RankingBarChart
                        title="Pendapatan per Metode Analisis (Top 8)"
                        data={analytics.methodRevenueData}
                        dataKey="value"
                        height={350}
                        delay={0.3}
                    />

                    <TransactionTable
                        data={analytics.detailedOrders}
                        page={page}
                        setPage={setPage}
                        pageSize={10}
                    />
                </>
            }
        />
    );
}
