import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/supervisor/orders-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useOrders } from "@/hooks/useSupervisor";
import { router } from "@inertiajs/react";
import { useMemo } from "react";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "received", label: "Diterima" },
    { value: "paid", label: "Dibayar" },
    { value: "received_test", label: "Selesai Pengujian" },
];

export default function OrdersPage() {
    const { data: orders, isLoading, error } = useOrders();

    const handleShowDetail = (data) => {
        router.visit(route("supervisor.order.detail", data.id));
    };

    const columns = useMemo(
        () => getOrdersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Orders" header="Orders">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Orders" header="Orders">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Orders" header="Orders">
            <ManagedDataTable
                data={orders}
                columns={columns}
                showSearch={true}
                showFilter={true}
                showCreate={false}
                filterColumn="status"
                filterOptions={filterData}
            />
        </DashboardLayout>
    );
}
