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
    // selectedMonth akan menyimpan nilai 1-12 (untuk DB) atau "all"
    const [selectedMonth, setSelectedMonth] = useState("all");

    // PERBAIKAN: Fungsi untuk mengkonversi indeks bulan (0-11) dari dropdown menjadi angka bulan (1-12)
    const handleMonthChange = (monthValue) => {
        if (monthValue === "all") {
            setSelectedMonth("all");
        } else {
            // Mengubah nilai string/number 0-11 menjadi angka bulan 1-12
            const monthNumber = parseInt(monthValue);
            // Saya asumsikan backend/API Anda menerima angka bulan sebagai string, 
            // seperti yang terlihat di network inspect (users/year/2024&month=11)
            setSelectedMonth((monthNumber + 1).toString()); 
        }
    };

    const { data, isLoading, error } = useUserReports({
        year: selectedYear,
        month: selectedMonth, // Nilai yang dikirim sekarang adalah 1-12 (string) atau "all"
    });

    const kpi = data?.kpi || {};
    const charts = data?.charts || {};
    const meta = data?.meta || {};

    const analystTableData = charts.analystPerformance || [];
    const clientTableData = charts.clientActivity || [];

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
                // selectedMonth tidak perlu dikirimkan, karena ia sudah menjadi state
                selectedMonth,
                availableYears: meta.years || [],
                onYearChange: setSelectedYear,
                // PERBAIKAN: Menggunakan fungsi handleMonthChange yang sudah dikonversi
                onMonthChange: handleMonthChange, 
                onClearFilters: handleClearFilters,
                onExport: () => exportUsersReport(data),
            }}
            emptyStateIcon={Users}
            kpiContent={
                <>
                    <KPICard icon={Microscope} title="Total Analis" value={kpi.total_analyst} subtitle="Pengguna role Analyst" delay={0.1} />
                    <KPICard icon={Users} title="Total Pelanggan" value={kpi.total_client} subtitle="Pengguna role Client" delay={0.2} />
                    <KPICard icon={ShoppingBag} title="Top Pelanggan" value={kpi.top_client?.name || "-"} subtitle={`${kpi.top_client?.orders || 0} Order`} delay={0.3} />
                    <KPICard icon={UserCheck} title="Top Analis" value={kpi.top_analyst?.name || "-"} subtitle={`${kpi.top_analyst?.samples || 0} Sampel`} delay={0.4} />
                    <KPICard icon={Activity} title="Rerata Tim / Order" value={kpi.avg_analyst_per_order} subtitle="Analis per order" delay={0.5} />
                    <KPICard icon={ShieldAlert} title="Total User (Non-Admin)" value={kpi.total_karyawan_non_admin} subtitle="Analyst, dll" delay={0.6} />
                </>
            }
            chartContent={
                <>
                    {/* 1. Ranking Bar Chart & Distribusi Role (Grid 3 Kolom) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <RankingBarChart
                            title="Top Pelanggan (Volume Order)"
                            data={charts.clientRankingData || []}
                            dataKey="orders"
                            className="col-span-1 lg:col-span-2"
                            delay={0.1}
                        />
                        <DistributionPieChart
                            title="Distribusi Role Pengguna"
                            data={charts.roleDistribution || []}
                            delay={0.2}
                        />
                    </div>

                    {/* 2. Simple Bar Chart (Keterlibatan Analis) - Full Width */}
                    <SimpleBarChart
                        title="Keterlibatan Analis (Jumlah Sampel Ditangani)"
                        data={charts.analystActivityData || []}
                        categoryKey="name"
                        dataKey="tests"
                        color="#2CACAD"
                        delay={0.3}
                    />

                    {/* 3. Summary Tables (Performa Analis & Aktivitas Pelanggan) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SummaryTable
                            title="Performa Analis"
                            badgeText="Top 5"
                            columns={[
                                { label: "Nama Analis", key: "analyst_name" },
                                { label: "Total Sampel", key: "total_sample", align: "right" },
                            ]}
                            data={analystTableData}
                            emptyMessage="Tidak ada aktivitas analis"
                            delay={0.4}
                        />
                        <SummaryTable
                            title="Aktivitas Pelanggan"
                            badgeText="Order Terbanyak"
                            columns={[
                                { label: "Nama Klien", key: "client_name" },
                                { label: "Total Order", key: "total_order", align: "right" },
                            ]}
                            data={clientTableData}
                            emptyMessage="Tidak ada aktivitas order"
                            delay={0.5}
                        />
                    </div>
                    
                    {/* 4. Chart Trend User - Full Width */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LINE CHART – TREND USER */}
                    <TrendLineChart
                        title={`Tren Registrasi User (${selectedYear === "all"
                            ? "Tahunan"
                            : `Bulanan - ${selectedYear}`})`}
                        data={charts.trend || []}
                        dataKey="count"
                        className="lg:col-span-3"
                        delay={0.6}
                    />

                    {/* BAR CHART – TRAINING ANALYST */}
                    <SimpleBarChart
                        title="Training Terbanyak oleh Analis"
                        data={(charts.training_analyst || []).map((item) => ({
                            name: item.name,
                            value: item.total_training,
                        }))}
                        dataKey="value"
                        className="lg:col-span-3"
                        delay={0.7}
                    />
                    </div>
                    {/* PIE CHART – KADALUARSA SERTIFIKAT */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <DistributionPieChart
                        title="Status Sertifikat Analis"
                        data={[
                            { name: "Expired", value: charts.certificate_expiration?.expired || 0 },
                            { name: "Near Expired (<30 hari)", value: charts.certificate_expiration?.near_expired || 0 },
                            { name: "Valid", value: charts.certificate_expiration?.valid || 0 },
                        ]}
                        className="lg:col-span-1 w-full"
                        delay={0.8}
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
                        className="lg:col-span-2 w-full"
                        delay={0.9}
                    />
                    </div>
                </>
            }
        />
    );
}