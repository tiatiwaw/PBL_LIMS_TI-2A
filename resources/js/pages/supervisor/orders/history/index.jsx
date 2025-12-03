import { useMemo } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { router } from "@inertiajs/react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useHistoryOrders } from "@/hooks/useSupervisor";
import { getOrdersColumns } from "@/components/shared/supervisor/orders-columns";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "pending", label: "Pending" },
    { value: "disapproved", label: "Disapproved" },
    { value: "approved", label: "Approved" },
    { value: "received", label: "Received" },
];

export default function AdminOrdersPage() {
    const { data: orders, isLoading, error } = useHistoryOrders();

    const handleShowDetail = (data) => {
        router.visit(route("supervisor.order.history.detail", data.id));
    };

    const columns = useMemo(
        () =>
            getOrdersColumns({ onShowDetail: handleShowDetail, history: true }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Riwayat Order" header="Riwayat Order">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Riwayat Order" header="Riwayat Order">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Riwayat Order" header="Riwayat Order">
            <ManagedDataTable
                data={orders || []}
                columns={columns}
                showFilter={true}
                showCreate={false}
                filterColumn="status"
                filterOptions={filterData}
            />
        </DashboardLayout>
    );
}
