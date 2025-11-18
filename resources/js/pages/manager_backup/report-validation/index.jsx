import DashboardLayout from "../../../components/layouts/dashboard-layout";
import { useMemo, useState } from "react";
import { usePage } from "@inertiajs/react";
import { getReportsColumns } from "@/components/shared/manager/report-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import ReportDetailsDialog from "@/components/shared/dialog/report-validation-dialog";

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

    const columns = useMemo(() => getReportsColumns({ onShowDetail: handleShowDetail }), []);

    const page = usePage();
    const currentUser = auth?.user || page?.props?.auth?.user || { name: "Manager", role: "Manager" };
    const parameters = reportData || page?.props?.reportData || [];

    return (
        <DashboardLayout
            title="Validasi Laporan"
            user={currentUser}
            header="Validasi Laporan"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                searchColumn="sample"
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
