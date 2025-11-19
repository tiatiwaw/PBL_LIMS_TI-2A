import DashboardLayout from "../../../components/layouts/dashboard-layout";
import { useMemo, useEffect, useState } from "react";
import { getReportsColumns } from "@/components/shared/manager/report-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { router } from "@inertiajs/react";

const filterData = [
    { value: "all", label: "All Report" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Disapproved", label: "Disapproved" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received" },
];

export default function ReportValidationPage({ auth }) {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        fetch("/api/v1/manager/report-validations")
            .then(res => res.json())
            .then(json => setReportData(json.data ?? []));
    }, []);

    const handleShowDetail = () => {
        router.visit(route("manager.report.detail"));
    };

    const columns = useMemo(
        () => getReportsColumns({ onShowDetail: handleShowDetail }),
        []
    );

    return (
        <DashboardLayout
            title="Validasi Laporan"
            header="Validasi Laporan"
            user={auth.user}
        >
            <ManagedDataTable
                data={reportData}
                columns={columns}
                showFilter={true}
                filterColumn="status"
                filterOptions={filterData}
            />
        </DashboardLayout>
    );
}
