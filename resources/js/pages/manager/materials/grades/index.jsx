import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getGradesColumns } from "@/components/shared/manager/material-columns";
import GradeDetailSheet from "@/components/shared/sheet/grade-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useGrades } from "@/hooks/useManager";
import { exportGradesReportPDF } from "@/utils/pdf/export/tools-export";
import { useMemo, useState } from "react";

export default function ManagerGradesPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGrades, setSelectedGrades] = useState(null);

    const { data: grades, isLoading, error } = useGrades();

    const handleShowDetail = (materials) => {
        setSelectedGrades(materials);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getGradesColumns({ onShowDetail: handleShowDetail }),
        []
    );

    const handleExport = () => exportGradesReportPDF(grades);

    const handleDelete = async (id) => deleteGrade.mutateAsync(id);

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
            title="Manajemen Jenis Grade"
            header="Manajemen Jenis Grade"
        >
            <ManagedDataTable
                data={grades}
                columns={columns}
                onExport={handleExport}
                showExport={true}
                showCreate={false}
            />
            <GradeDetailSheet
                data={selectedGrades}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
