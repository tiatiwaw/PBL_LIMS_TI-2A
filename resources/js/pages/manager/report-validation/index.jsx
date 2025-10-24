import DashboardLayout from "../../../components/layouts/dashboard-layout";
import DataTable from "../../../components/shared/tabel/data-tabels";
import { useState } from "react";
import { getColumns } from "@/components/shared/manager/report-columns";
import ReportDetailsDialog from "@/components/shared/manager/report-validation-dialog";
import { reports } from "@/data/manager/reports";

const filterData = [
    { value: "all", label: "All Report" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Disapproved", label: "Disapproved" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received" },
];

export default function ReportValidationPage({ auth, reportData }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleShowDetail = (order) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    const columns = getColumns({ onShowDetail: handleShowDetail });

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const currentOrders = reportData || reports;

    return (
        <DashboardLayout
            title="Validasi Laporan"
            user={currentUser}
            header="Validasi Laporan"
        >
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
            <ReportDetailsDialog
                order={selectedOrder}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </DashboardLayout>
    );
}
