import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/supervisor/orders-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { supervisorService } from "@/services/supervisorService";
import { router } from "@inertiajs/react";
import { useMemo } from "react";

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const { orders, isLoading, error } = useOrders(
        supervisorService,
        "supervisor"
    );
    const currentUser = user || {
        name: "Indro",
        role: "Supervisor",
    };

    const handleShowDetail = (data) => {
        router.visit(route("supervisor.order.detail", data.id));
    };

    const columns = useMemo(
        () => getOrdersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading || authLoading) {
        return (
            <DashboardLayout title="Orders" header="Orders" user={currentUser}>
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Orders" header="Orders" user={currentUser}>
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Orders" header="Orders" user={currentUser}>
            <ManagedDataTable
                data={orders}
                columns={columns}
                showSearch={true}
                showFilter={false}
                showCreate={false}
            />
        </DashboardLayout>
    );
}
