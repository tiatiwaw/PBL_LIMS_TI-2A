import { useMemo } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/manager/order-columns";
import { router } from "@inertiajs/react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/ui/loading";
import { useOrders } from "@/hooks/useOrders";

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
    const { user, loading: authLoading } = useAuth();
    const { orders, isLoadingOrders, errorOrders } = useOrders();

    const handleShowDetail = (data) => {
        router.visit(route("admin.order.show", data.id));
    };

    const currentUser = user || { name: "Admin", role: "Admin" };

    const columns = useMemo(() => getOrdersColumns({ onShowDetail: handleShowDetail }), []);

    if (isLoadingOrders || authLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (errorOrders) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {errorOrders.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Orderan" user={currentUser} header="Manajemen Orderan">
            <ManagedDataTable
                data={orders}
                columns={columns}
                showFilter={true}
                showCreate={false}
                filterColumn="status"
                filterOptions={filterData}
            />
        </DashboardLayout>
    );
}
