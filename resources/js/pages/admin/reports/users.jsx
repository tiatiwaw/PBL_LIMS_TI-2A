import {
    Users,
    UserCheck,
    ShoppingBag,
    Microscope,
    Activity,
    ShieldAlert,
} from "lucide-react";
import { useUserReports } from "@/hooks/useAdmin";
import { useReportFilters } from "@/hooks/useReportFilters";
import { useUsersAnalytics } from "@/hooks/analytics/useUsersAnalytics";
import {
    DistributionPieChart,
    KPICard,
    RankingBarChart,
    SimpleBarChart,
    SummaryTable,
} from "@/components/shared/admin/report-components";
import ReportLayout from "@/components/layouts/report-layout";
import { exportUsersReport } from "@/utils/excel/export/users-report";

export default function UserReportDashboard() {
    const { data: apiData, isLoading, error } = useUserReports();
    const { users = [], orders = [] } = apiData || {};

    const filters = useReportFilters(
        [users, orders],
        ["created_at", "order_date"]
    );
    const isAllPeriod =
        filters.selectedYear === "all" && filters.selectedMonth === "all";

    const analytics = useUsersAnalytics(
        apiData,
        filters.dateFilter,
        isAllPeriod
    );

    const analystTableData = analytics.analystActivityData.map((i) => ({
        name: i.name,
        value: i.tests,
    }));
    const clientTableData = analytics.clientRankingData.map((i) => ({
        name: i.name,
        value: i.orders,
    }));

    const handleExport = () => exportUsersReport(analytics);
    console.log(analytics);

    return (
        <ReportLayout
            title="Laporan Pengguna"
            headerTitle="Laporan Pengguna"
            subtitle="Wawasan detail mengenai keterlibatan pengguna & kinerja tim."
            isLoading={isLoading}
            error={error}
            hasData={analytics.totalNonAdmins > 0}
            filterProps={{
                selectedYear: filters.selectedYear,
                selectedMonth: filters.selectedMonth,
                availableYears: filters.availableYears,
                onYearChange: filters.setSelectedYear,
                onMonthChange: filters.setSelectedMonth,
                onClearFilters: filters.clearFilters,
                onExport: handleExport,
            }}
            emptyStateIcon={Users}
            kpiContent={
                <>
                    <KPICard
                        icon={Microscope}
                        title="Total Analis"
                        value={analytics.totalAnalysts}
                        subtitle="Pengguna role Analyst"
                        delay={0.1}
                    />
                    <KPICard
                        icon={Users}
                        title="Total Pelanggan"
                        value={analytics.totalClients}
                        subtitle="Pengguna role Client"
                        delay={0.2}
                    />
                    <KPICard
                        icon={ShoppingBag}
                        title="Top Pelanggan"
                        value={analytics.topClient.name}
                        subtitle={`${analytics.topClient.orders} Order`}
                        delay={0.3}
                    />
                    <KPICard
                        icon={UserCheck}
                        title="Top Analis"
                        value={analytics.topAnalyst.name}
                        subtitle={`${analytics.topAnalyst.tests} Sampel`}
                        delay={0.4}
                    />
                    <KPICard
                        icon={Activity}
                        title="Rerata Tim / Order"
                        value={analytics.avgAnalystsPerOrder}
                        subtitle="Analis per order"
                        delay={0.5}
                    />
                    <KPICard
                        icon={ShieldAlert}
                        title="Total User (Non-Admin)"
                        value={analytics.totalNonAdmins}
                        subtitle="Client, Analyst, dll"
                        delay={0.6}
                    />
                </>
            }
            chartContent={
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <RankingBarChart
                            title="Top Pelanggan (Volume Order)"
                            data={analytics.clientRankingData}
                            dataKey="orders"
                            className="col-span-1 lg:col-span-2"
                            delay={0.1}
                        />
                        <DistributionPieChart
                            title="Distribusi Role Pengguna"
                            data={analytics.roleDistribution}
                            delay={0.2}
                        />
                    </div>

                    <SimpleBarChart
                        title="Keterlibatan Analis (Jumlah Sampel Ditangani)"
                        data={analytics.analystActivityData}
                        categoryKey="name"
                        dataKey="tests"
                        color="#2CACAD"
                        delay={0.3}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SummaryTable
                            title="Performa Analis"
                            badgeText="Top 5"
                            columns={[
                                { label: "Nama Analis" },
                                { label: "Total Sampel", align: "right" },
                            ]}
                            data={analystTableData}
                            emptyMessage="Tidak ada aktivitas analis"
                        />
                        <SummaryTable
                            title="Aktivitas Pelanggan"
                            badgeText="Order Terbanyak"
                            columns={[
                                { label: "Nama Klien" },
                                { label: "Total Order", align: "right" },
                            ]}
                            data={clientTableData}
                            emptyMessage="Tidak ada aktivitas order"
                        />
                    </div>
                </>
            }
        />
    );
}
