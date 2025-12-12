import DashboardLayout from "@/components/layouts/dashboard-layout";
import StatCard from "@/components/shared/card/stat-card";
import { BookText, Wallet, TrendingUp } from "lucide-react";
import {
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
    AreaChart,
} from "recharts";
import Loading from "@/components/ui/loading";
import { useDashboard } from "@/hooks/useManager";

const CHART_CONFIG = {
    margin: { left: 40, top: 5, right: 30, bottom: 5 },
    cartesianGrid: {
        strokeDasharray: "3 3",
        stroke: "#f0f0f0",
    },
    axis: {
        stroke: "#9ca3af",
    },
    tooltip: {
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
    label: {
        textAnchor: "middle",
        fontWeight: "bold",
        fill: "black",
        fontSize: "15px",
    },
};

const formatCurrency = (amount) => `Rp ${amount.toLocaleString()}`;

const transformRevenueData = (chart = []) =>
    chart.map((item) => ({
        month: item.month,
        penjualan: item.revenue,
    }));

const transformOrderData = (chart = []) =>
    chart.map((item) => ({
        months: item.month,
        pesanan: item.orders,
    }));

const ChartWrapper = ({ title, subtitle, icon, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            </div>
            {icon}
        </div>
        {children}
    </div>
);

const YAxisLabel = ({ value }) => (
    <Label
        value={value}
        angle={-90}
        position="left"
        offset={30}
        style={CHART_CONFIG.label}
    />
);

const RevenueChart = ({ data }) => (
    <ChartWrapper
        title="Pendapatan"
        subtitle="Data 6 bulan terakhir"
        icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
    >
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={CHART_CONFIG.margin}>
                <CartesianGrid strokeDasharray="3 8" stroke="#594f4fff" />
                <XAxis dataKey="month" stroke={CHART_CONFIG.axis.stroke} />
                <YAxis stroke={CHART_CONFIG.axis.stroke}>
                    <YAxisLabel value="Total Pendapatan (IDR)" />
                </YAxis>
                <Tooltip contentStyle={CHART_CONFIG.tooltip} />
                <Line
                    type="monotone"
                    dataKey="penjualan"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Pendapatan"
                    dot={{ fill: "#8b5cf6", r: 4 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    </ChartWrapper>
);

const OrderChart = ({ data }) => (
    <ChartWrapper title="Total Order" subtitle="Total pesanan per bulan">
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={CHART_CONFIG.margin}>
                <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                <XAxis dataKey="months" stroke={CHART_CONFIG.axis.stroke} />
                <YAxis stroke={CHART_CONFIG.axis.stroke}>
                    <YAxisLabel value="Jumlah Pesanan" />
                </YAxis>
                <Tooltip contentStyle={CHART_CONFIG.tooltip} />
                <Bar
                    dataKey="pesanan"
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                    name="Pesanan"
                />
            </BarChart>
        </ResponsiveContainer>
    </ChartWrapper>
);

const ErrorMessage = ({ message }) => (
    <div className="text-center text-red-500 py-8">
        {message || "Terjadi kesalahan saat memuat data"}
    </div>
);

export default function ManagerPage() {
    const { data: dashboard, isLoading, error } = useDashboard();

    const stats = [
        {
            title: "Total Orders",
            value: dashboard?.total_orders ?? 0,
            subtitle: "Increased from last month",
            icon: BookText,
        },
        {
            title: "Pendapatan",
            value: formatCurrency(dashboard?.total_revenue ?? 0),
            subtitle: "Increased from last month",
            icon: Wallet,
        },
    ];

    const revenueData = transformRevenueData(dashboard?.chart);
    const orderData = transformOrderData(dashboard?.chart);

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <ErrorMessage message={error.message} />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Dashboard Manager"
            header="Selamat Datang, Manager!"
        >
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>
                <RevenueChart data={revenueData} />
                <OrderChart data={orderData} />
            </div>
        </DashboardLayout>
    );
}
