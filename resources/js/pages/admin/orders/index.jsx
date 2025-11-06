import { useMemo } from "react";
import { orders } from "@/data/manager/orders";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/manager/order-columns";
import { router } from "@inertiajs/react";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Disapproved", label: "Disapproved" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received" },
];

export default function AdminOrdersPage({ auth, ordersData }) {
    const handleShowDetail = () => {
        router.visit(route("manager.orders.detail"));
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = ordersData || orders;

    const columns = useMemo(() => getOrdersColumns({ onShowDetail: handleShowDetail }), []);

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
