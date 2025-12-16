import Loading from "@/components/ui/loading";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getParametersColumns } from "@/components/shared/manager/test-columns";
import ParameterDetailSheet from "@/components/shared/sheet/parameter-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useMemo, useState } from "react";
import { useParameters } from "@/hooks/useManager";
import { exportParameterReportPDF } from "@/utils/pdf/export/test-export";

export default function ManagerParametersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedParameter, setSelectedParameter] = useState(null);

    const { data: parameters, isLoading, error } = useParameters();

    const handleExport = () => exportParameterReportPDF(parameters);
    const handleShowDetail = (brand) => {
        setSelectedParameter(brand);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getParametersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Tes Parameter"
            header="Manajemen Tes Parameter"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                showCreate={false}
                showExport={true}
                onExport={handleExport}
            />
            <ParameterDetailSheet
                data={selectedParameter}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
