import { useMemo } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/manager/order-columns";
import { router } from "@inertiajs/react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useAllOrders } from "@/hooks/useStaff";
import { filterStatusOrder } from "@/utils/statusUtils";

export default function StaffOrdersPage() {
    const { data: orders, isLoading, error } = useAllOrders();

    const handleShowDetail = (data) => {
        router.visit(route("staff.order.show", data));
    };

    const columns = useMemo(
        () => getOrdersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Semua Order" header="Semua Order">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Semua Order" header="Semua Order">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Semua Order" header="Semua Order">
            <ManagedDataTable
                data={orders || []}
                columns={columns}
                showFilter={true}
                showCreate={false}
                filterColumn="status"
                filterOptions={filterStatusOrder}
            />
        </DashboardLayout>
    );
}
