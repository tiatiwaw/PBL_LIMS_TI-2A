import { useMemo, useState } from "react";
import { orders } from "@/data/manager/orders";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/manager/order-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import OrderDetailsDialog from "@/components/shared/dialog/order-detail-dialog";

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

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = ordersData || orders;

    const columns = useMemo(() => getOrdersColumns({  onShowDetail: handleShowDetail}), []);

    return (
        <DashboardLayout title="Orders" user={currentUser} header="Orders">
            <ManagedDataTable
                data={parameters}
                columns={columns}
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
