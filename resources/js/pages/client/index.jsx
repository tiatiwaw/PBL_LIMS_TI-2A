import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useMemo } from "react";
import StatCard from "@/components/shared/card/stat-card";
import { CheckIcon, ClipboardList, Clock10Icon } from "lucide-react";
import { getOrdersColumns } from "@/components/shared/client/order-columns";
import Loading from "@/components/ui/loading";
import { router } from "@inertiajs/react";
import { useDashboard } from "@/hooks/useClient";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Disapproved", label: "Disapproved" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received" },
];

export default function ClientPage({ auth }) {

    const { 
        data: dashboard, 
        isLoading,
        error,
    } = useDashboard();

    const handleShowDetail = (orders) => {
        router.visit(route('client.orders.show', { id: orders.id }));
    };
    const handleShowHistory = (orders) => {
        router.visit(route('client.orders.status', { id: orders.id }));
    };
    const handlePayment = (orders) => {
        router.visit(route('client.orders.payment', { id: orders.id }));
    };
    const handleDownload = (orders) => {
        router.visit(route('client.orders.download', { id: orders.id }));
    };

    const columns = useMemo(
        () => getOrdersColumns({
            onShowDetail: handleShowDetail, 
            onShowHistory: handleShowHistory,
            onPayment: handlePayment,
            onDownload: handleDownload,
        }),
        []
    );
    const stats = [
        { 
            title: 'Total Order', 
            value: dashboard?.data?.stats?.total_orders || 0, 
            subtitle: 'Semua order terdaftar', 
            IconComponent: ClipboardList 
        },
        { 
            title: 'Sedang Diuji', 
            value: dashboard?.data?.stats?.processing_orders || 0, 
            subtitle: 'Order dalam proses', 
            IconComponent: Clock10Icon 
        },
        { 
            title: 'Selesai', 
            value: dashboard?.data?.stats?.completed_orders || 0, 
            subtitle: 'Order telah selesai', 
            IconComponent: CheckIcon 
        },
    ];

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Client"  header="Selamat Datang, Client!">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Client"  header="Selamat Datang, Client!">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Gagal memuat dashboard."}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Dashboard Client"  header="Selamat Datang, Client!">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Riwayat Order</h2>
                            <p className="text-sm text-gray-500 mt-1">Status order dan progres terbaru</p>
                        </div>
                    </div>
                    <ManagedDataTable
                        data={dashboard?.data?.orders || []}
                        columns={columns}
                        showFilter={true}
                        showCreate={false}
                        filterColumn="status"
                        filterOptions={filterData}
                    />
                </div>

            </div>
        </DashboardLayout>
    )
}