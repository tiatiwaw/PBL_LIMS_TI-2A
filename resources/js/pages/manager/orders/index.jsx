import { useMemo } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/manager/order-columns";
import { router } from "@inertiajs/react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useOrders } from "@/hooks/useManager";
import { filterStatusOrder } from "@/utils/statusUtils";

export default function AdminOrdersPage() {
    const { data: orders, isLoading, error } = useOrders();

    const handleShowDetail = (id) => {
        router.visit(route("manager.orders.show", id));
    };

    const columns = useMemo(
        () => getOrdersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout
                title="Manajemen Orderan"
                header="Manajemen Orderan"
            >
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout
                title="Manajemen Orderan"
                header="Manajemen Orderan"
            >
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Orderan" header="Manajemen Orderan">
            <ManagedDataTable
                data={orders}
                columns={columns}
                showFilter={true}
                showCreate={false}
                filterColumn="status"
                filterOptions={filterStatusOrder}
            />
        </DashboardLayout>
    );
}
