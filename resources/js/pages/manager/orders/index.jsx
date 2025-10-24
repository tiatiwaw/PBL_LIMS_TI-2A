import { useState } from "react";
import { orders } from "@/data/manager/orders";
import { getColumns } from "@/components/shared/manager/order-columns";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import DataTable from "@/components/shared/tabel/data-tabels";
import OrderDetailsDialog from "@/components/shared/manager/order-detail-dialog";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Disapproved", label: "Disapproved" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received" },
];

export default function OrdersPage({ auth, ordersData }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleShowDetail = (order) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    const columns = getColumns({ onShowDetail: handleShowDetail });

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const currentOrders = ordersData || orders;

    return (
        <DashboardLayout title="Orders" user={currentUser} header="Orders">
            <DataTable
                columns={columns}
                data={currentOrders}
                pageSize={10}
                showSearch={true}
                searchColumn="user"
                showFilter={true}
                filterColumn="status"
                filterOptions={filterData}
            />
            <OrderDetailsDialog
                order={selectedOrder}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </DashboardLayout>
    );
}
