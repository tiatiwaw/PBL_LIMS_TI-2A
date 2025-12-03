import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useMemo } from "react";
import { getReportsColumns } from "@/components/shared/manager/report-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { router } from "@inertiajs/react";
import { useReportValidations } from "@/hooks/useManager";

export default function ReportValidationPage({ auth }) {
    const { data: order, isLoading: loading, error } = useReportValidations();
    
    const reportData = order?.data || [];

    const handleShowDetail = (id) => {
        console.log("Navigating to detail with ID:", id);
        router.visit(route("manager.report-validations.show", id));
    };

    const columns = useMemo(
        () => getReportsColumns({
            onShowDetail: handleShowDetail,
            data: reportData  
        }),
        [reportData]  
    );

    return (
        <DashboardLayout
            title="Validasi Laporan"
            header="Validasi Laporan"
            user={auth.user}
        >
            <ManagedDataTable
                data={reportData || []}
                columns={columns}
                loading={loading}
                showFilter={true}
                filterColumn="order_type" 
                filterOptions={[
                    { value: "all", label: "Semua" },
                    { value: "internal", label: "Internal" },
                    { value: "regular", label: "Regular" },
                    { value: "external", label: "External" },
                    { value: "urgent", label: "Urgent" },
                ]}
            />
        </DashboardLayout>
    );
}