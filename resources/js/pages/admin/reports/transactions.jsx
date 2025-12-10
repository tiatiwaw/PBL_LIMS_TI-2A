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

import {
    DistributionPieChart,
    KPICard,
    RankingBarChart,
    TransactionTable,
    TrendAreaChart,
} from "@/components/shared/admin/report-components";
import ReportLayout from "@/components/layouts/report-layout";
import { exportTransactionsReport } from "@/utils/excel/export/transaction-report";
import { formatCurrency } from "@/utils/formatters";

export default function AdminReportTransactions() {
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [page, setPage] = useState(1);

    const { data, isLoading, error } = useTransactionReports({
        year: selectedYear,
        month: selectedMonth,
    });

    const kpi = data?.kpi || {};
    const charts = data?.charts || {};
    const meta = data?.meta || {};
    const ordersList = data?.orders || [];

    const handleClearFilters = () => {
        setSelectedYear("all");
        setSelectedMonth("all");
    };

    const getTruncatedClientName = (name) => {
        if (!name) return "-";
        return name.length > 18 ? name.substring(0, 18) + "..." : name;
    };

    const formattedOrders = ordersList.map((order) => ({
        ...order,
        order_date: new Date(order.order_date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),
    }));

    return (
        <ReportLayout
            title="Laporan Keuangan"
            headerTitle="Laporan Keuangan"
            subtitle="Analisis real-time metrik pendapatan laboratorium."
            isLoading={isLoading}
            error={error}
            hasData={kpi.total_orders > 0}
            filterProps={{
                selectedYear,
                selectedMonth,
                availableYears: meta.years || [],
                onYearChange: setSelectedYear,
                onMonthChange: setSelectedMonth,
                onClearFilters: handleClearFilters,
                onExport: () => exportTransactionsReport(data),
            }}
            emptyStateIcon={Search}
            emptyStateDescription="Coba sesuaikan filter tahun, bulan, atau belum ada transaksi."
            kpiContent={
                <>
                    <KPICard
                        icon={Wallet}
                        title="Total Pendapatan"
                        value={formatCurrency(kpi.total_revenue || 0)}
                        subtitle={`Dari ${kpi.total_orders || 0} transaksi`}
                        delay={0.1}
                    />
                    <KPICard
                        icon={TrendingUp}
                        title="Order Tertinggi"
                        value={formatCurrency(kpi.max_single_order || 0)}
                        subtitle="Nilai transaksi tunggal maks"
                        delay={0.2}
                    />
                    <KPICard
                        icon={Users}
                        title="Pelanggan Top"
                        value={getTruncatedClientName(kpi.top_client?.name)}
                        subtitle={`Total: ${formatCurrency(
                            kpi.top_client?.revenue || 0
                        )}`}
                        delay={0.3}
                    />
                    <KPICard
                        icon={Package}
                        title="Metode Favorit"
                        value={kpi.top_method?.name || "-"}
                        subtitle={`${
                            kpi.top_method?.count || 0
                        }x order (~${formatCurrency(
                            kpi.top_method?.avg_price || 0
                        )})`}
                        delay={0.4}
                    />
                    <KPICard
                        icon={Activity}
                        title="Rerata Order"
                        value={formatCurrency(kpi.avg_revenue_order || 0)}
                        subtitle="Nilai rata-rata per invoice"
                        delay={0.5}
                    />
                    <KPICard
                        icon={CreditCard}
                        title="Pendapatan Tipe Order Terbanyak"
                        value={formatCurrency(kpi.top_order_type?.revenue || 0)}
                        subtitle={`Dari tipe order ${
                            kpi.top_order_type?.name || "-"
                        }`}
                        delay={0.6}
                    />
                </>
            }
            chartContent={
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <TrendAreaChart
                            title="Tren Pendapatan"
                            data={charts.trend || []}
                            dataKey="revenue"
                            tooltipFormatter={formatCurrency}
                            className="col-span-1 lg:col-span-2"
                            delay={0.1}
                        />
                        <DistributionPieChart
                            title="Distribusi Metode"
                            data={charts.method_distribution || []}
                            innerRadius={65}
                            outerRadius={85}
                            delay={0.2}
                        />
                    </div>

                    <RankingBarChart
                        title="Pendapatan per Metode Analisis (Top 8)"
                        data={charts.method_revenue || []}
                        dataKey="value"
                        height={350}
                        delay={0.3}
                    />

                    <TransactionTable
                        data={formattedOrders}
                        page={page}
                        setPage={setPage}
                        pageSize={10}
                    />
                </>
            }
        />
    );
}
