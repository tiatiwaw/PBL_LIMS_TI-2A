import { useMemo } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/manager/order-columns";
import { router } from "@inertiajs/react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { orders } from "@/data/manager/detail";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/ui/loading";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "pending", label: "Pending" },
    { value: "disapproved", label: "Disapproved" },
    { value: "approved", label: "Approved" },
    { value: "received", label: "Received" },
];

export default function AdminOrdersPage({ ordersData }) {
    const { user, loading: authLoading } = useAuth();

    const handleShowDetail = (data) => {
        router.visit(route("admin.orders.detail", data.id));
    };

    const currentUser = user || { name: "Admin", role: "Admin" };
    const parameters = ordersData || orders;

    const columns = useMemo(() => getOrdersColumns({ onShowDetail: handleShowDetail }), []);

    if (authLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser}>
                <Loading />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Orderan" user={currentUser} header="Manajemen Orderan">
            <ManagedDataTable
                data={parameters}
                columns={columns}
                showFilter={true}
                showCreate={false}
                filterColumn="status"
                filterOptions={filterData}
            />
        </DashboardLayout>
    );
}
