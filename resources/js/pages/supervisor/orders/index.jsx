import DashboardLayout from "@/components/layouts/dashboard-layout";
import OrderDetailSheet from "@/components/shared/sheet/orders-detail-sheet";
import { getOrderColumns } from "@/components/shared/supervisor/orders-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { orders } from "@/data/supervisor/orders";
import { useMemo, useState } from "react";

export default function OrdersPage({ Auth, dataOrder }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const currentUser = Auth?.user || {
        name: "Indro",
        role: "Supervisor",
    };

    const handleShowDetail = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    const parameter = dataOrder || orders;

    const columns = useMemo(
        () => getOrderColumns({ onShowDetail: handleShowDetail }),
        []
    );

    return (
        <DashboardLayout
            title="Analis"
            header="Manajemen Analis"
            user={currentUser}
        >
            <ManagedDataTable
                data={parameter}
                columns={columns}
                showSearch={true}
                showFilter={false}
                showCreate={false}
            />
            <OrderDetailSheet
                data={selectedOrder}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
