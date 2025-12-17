import { useState } from "react";
import {
    Users,
    UserCheck,
    ShoppingBag,
    Microscope,
    Activity,
    ShieldAlert,
} from "lucide-react";
import { useUserReports } from "@/hooks/useAdmin";
import {
    DistributionPieChart,
    KPICard,
    RankingBarChart,
    SimpleBarChart,
    SummaryTable,
    TrendLineChart,
} from "@/components/shared/admin/report-components";
import ReportLayout from "@/components/layouts/report-layout";
import { exportUsersReport } from "@/utils/excel/export/users-report";

export default function UserReportDashboard() {
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");

    const { data, isLoading, error } = useUserReports({
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

    const handleExport = () => exportUsersReport(data);

    return (
        <ReportLayout
            title="Laporan Pengguna"
            headerTitle="Laporan Pengguna"
            subtitle={
                !isLoading
                    ? `Menampilkan data dari ${kpi.total_pengguna || 0} Pengguna.`
                    : "Memuat data..."
            }
            isLoading={isLoading}
            error={error}
            hasData={kpi.total_karyawan_non_admin > 0}
            filterProps={{
                selectedYear,
                selectedMonth,
                availableYears: meta.years || [],
                onYearChange: setSelectedYear,
                onMonthChange: setSelectedMonth,
                onClearFilters: handleClearFilters,
                onExport: () => exportUsersReport(data),
            }}
            emptyStateIcon={Users}
            kpiContent={
                <>
                    <KPICard
                        icon={Microscope}
                        title="Total Analis"
                        value={kpi.total_analyst}
                        subtitle="Pengguna role Analyst"
                        delay={0.1}
                    />
                    <KPICard
                        icon={Users}
                        title="Total Pelanggan"
                        value={kpi.total_client}
                        subtitle="Pengguna role Client"
                        delay={0.2}
                    />
                    <KPICard
                        icon={ShoppingBag}
                        title="Top Pelanggan"
                        value={kpi.top_client?.name || "-"}
                        subtitle={`${kpi.top_client?.orders || 0} Order`}
                        delay={0.3}
                    />
                    <KPICard
                        icon={UserCheck}
                        title="Top Analis"
                        value={kpi.top_analyst?.name || "-"}
                        subtitle={`${kpi.top_analyst?.samples || 0} Sampel`}
                        delay={0.4}
                    />
                    <KPICard
                        icon={Activity}
                        title="Rerata Tim / Order"
                        value={kpi.avg_analyst_per_order}
                        subtitle="Analis per order"
                        delay={0.5}
                    />
                    <KPICard
                        icon={ShieldAlert}
                        title="Total User (Non-Admin)"
                        value={kpi.total_karyawan_non_admin}
                        subtitle="Analyst, dll"
                        delay={0.6}
                    />
                </>
            }
            chartContent={
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LINE CHART – TREND USER */}
                    <TrendLineChart
                        title={`Tren Registrasi User (${
                            selectedYear === "all"
                                ? "Tahunan"
                                : `Bulanan - ${selectedYear}`
                        })`}
                        data={charts.trend || []}
                        dataKey="count"
                        className="lg:col-span-3"
                        delay={0.1}
                    />

                    {/* BAR CHART – TRAINING ANALYST */}
                    <SimpleBarChart
                        title="Training Terbanyak oleh Analis"
                        data={
                            (charts.training_analyst || []).map((item) => ({
                                name: item.name,
                                value: item.total_training,
                            })) || []
                        }
                        dataKey="value"
                        className="lg:col-span-3"
                        delay={0.2}
                    />

                    {/* PIE CHART – KADALUARSA SERTIFIKAT */}
                    <DistributionPieChart
                        title="Status Sertifikat Analis"
                        data={[
                            { name: "Expired", value: charts.certificate_expiration?.expired || 0 },
                            { name: "Near Expired (<30 hari)", value: charts.certificate_expiration?.near_expired || 0 },
                            { name: "Valid", value: charts.certificate_expiration?.valid || 0 },
                        ]}
                        delay={0.3}
                    />

                    {/* TABEL DETAIL TRAINING & SERTIFIKAT */}
                    <SummaryTable
                        title="Detail Pelatihan & Kadaluarsa Sertifikat"
                        columns={[
                            { key: "analyst_name", label: "Nama Analis" },
                            { key: "training_name", label: "Nama Pelatihan" },
                            { key: "training_date", label: "Tanggal Pelatihan" },
                            { key: "expires_at", label: "Kadaluarsa" },
                            { key: "status", label: "Status" },
                        ]}
                        data={(charts.certificate_detail || []).map((row) => ({
                            ...row,
                            status:
                                row.status === "expired"
                                    ? "Kadaluarsa"
                                    : row.status === "near_expired"
                                    ? "Segera Kadaluarsa"
                                    : "Aktif",
                        }))}
                        className="lg:col-span-3"
                        delay={0.4}
                    />
                </div>
            }
        />
    );
}