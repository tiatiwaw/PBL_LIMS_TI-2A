import Loading from "@/components/ui/loading";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getUnitsColumns } from "@/components/shared/manager/test-columns";
import UnitDetailSheet from "@/components/shared/sheet/unit-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useMemo, useState } from "react";
import { useUnits } from "@/hooks/useManager";
import { exportUnitReportPDF } from "@/utils/pdf/export/test-export";

export default function ManagerUnitsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);

    const { data: units, isLoading, error } = useUnits();

    const handleExport = () => exportUnitReportPDF(units);
    const handleShowDetail = (tests) => {
        setSelectedUnit(tests);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getUnitsColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Nilai Unit"
            header="Manajemen Nilai Unit"
        >
            <ManagedDataTable
                data={units}
                columns={columns}
                showCreate={false}
                showExport={true}
                onExport={handleExport}
            />
            <UnitDetailSheet
                data={selectedUnit}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
