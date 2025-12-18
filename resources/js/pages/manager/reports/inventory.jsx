import { useState } from "react";
import {
    Package,
    Beaker,
    Users,
    Tag,
    CheckCircle,
    ClipboardList,
} from "lucide-react";
import { useInventoryReports } from "@/hooks/useManager";
import { COLORS } from "@/utils/constant/report";
import {
    DistributionPieChart,
    KPICard,
    RankingBarChart,
    TrendLineChart,
} from "@/components/shared/admin/report-components";
import ReportLayout from "@/components/layouts/report-layout";
import { exportInventoryReport } from "@/utils/excel/export/inventories-report";

export default function ManagerReportInventory() {
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");

    const { data, isLoading, error } = useInventoryReports({
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
            title="Laporan Inventori"
            headerTitle="Laporan Inventori"
            subtitle={
                !isLoading
                    ? `Menampilkan data dari ${kpi.total_equipment} alat dan ${kpi.total_reagents} reagen.`
                    : "Memuat data..."
            }
            isLoading={isLoading}
            error={error}
            hasData={kpi.total_equipment > 0}
            filterProps={{
                selectedYear,
                selectedMonth,
                availableYears: meta.years || [],
                onYearChange: setSelectedYear,
                onMonthChange: setSelectedMonth,
                onClearFilters: handleClearFilters,
                onExport: () => exportInventoryReport(data),
            }}
            emptyStateIcon={Package}
            kpiContent={
                <>
                    <KPICard
                        icon={Package}
                        title="Total Equipment"
                        value={kpi.total_equipment}
                        subtitle={`Tersedia: ${kpi.available_equipment} | Dipakai: ${kpi.unavailable_equipment} | Perbaikan: ${kpi.maintenance_equipment} | Rusak: ${kpi.broken_equipment}`}
                        delay={0.1}
                    />
                    <KPICard
                        icon={CheckCircle}
                        title="Alat Sering Dipakai"
                        value={kpi.top_equipment?.name || "-"}
                        subtitle={`Digunakan ${
                            kpi.top_equipment?.count || 0
                        } kali`}
                        delay={0.2}
                    />
                    <KPICard
                        icon={ClipboardList}
                        title="Reagen Sering Dipakai"
                        value={kpi.top_reagent?.name || "-"}
                        subtitle={`Digunakan ${
                            kpi.top_reagent?.count || 0
                        } kali`}
                        delay={0.25}
                    />
                    <KPICard
                        icon={Beaker}
                        title="Total Item Reagen"
                        value={kpi.total_reagents}
                        subtitle="Item kimia terdaftar"
                        delay={0.3}
                    />
                    <KPICard
                        icon={Tag}
                        title="Total Brand"
                        value={kpi.total_brands}
                        subtitle="Master data merek"
                        delay={0.4}
                    />
                    <KPICard
                        icon={Users}
                        title="Total Supplier"
                        value={kpi.total_suppliers}
                        subtitle="Master data pemasok"
                        delay={0.6}
                    />
                </>
            }
            chartContent={
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <DistributionPieChart
                        title="Status Distribusi Peralatan"
                        data={charts.status || []}
                        delay={0.4}
                    />

                    <RankingBarChart
                        title="Top Brand Peralatan"
                        data={charts.brands || []}
                        dataKey="value"
                        colorMain={COLORS.primary.muda}
                        className="lg:col-span-2"
                        delay={0.5}
                    />

                    <div className="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RankingBarChart
                            title="Top Supplier Reagen"
                            data={charts.suppliers || []}
                            dataKey="value"
                            colorMain="#024D60"
                            delay={0.6}
                        />

                        <RankingBarChart
                            title="Distribusi Grade Reagen"
                            data={charts.grades || []}
                            dataKey="value"
                            colorMain="#024D60"
                            delay={0.6}
                        />
                    </div>

                    <TrendLineChart
                        title={`Tren Pengadaan Alat (${
                            selectedYear === "all"
                                ? "Tahunan"
                                : `Bulanan - ${selectedYear}`
                        })`}
                        data={charts.trend || []}
                        dataKey="count"
                        className="lg:col-span-3"
                        delay={0.8}
                    />

                    <TrendLineChart
                        title={`Tren Pengadaan Reagen (${
                            selectedMonth === "all"
                                ? "Bulanan"
                                : `Tahunan - ${selectedMonth}`
                        })`}
                        data={charts.reagent || []}
                        dataKey="count"
                        className="lg:col-span-3"
                        delay={0.85}
                    />
                </div>
            }
        />
    );
}
