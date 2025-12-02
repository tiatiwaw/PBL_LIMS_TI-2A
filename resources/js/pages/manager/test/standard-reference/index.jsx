import Loading from "@/components/ui/loading";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getStandardsColumns } from "@/components/shared/admin/test-columns";
import ReferenceDetailSheet from "@/components/shared/sheet/reference-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useMemo, useState } from "react";
import { useReferences } from "@/hooks/useManager";
import { exportReferenceReportPDF } from "@/utils/pdf/export/test-standart-reference";

export default function ManagerStandardsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReference, setSelectedReference] = useState(null);

    const { data: references, isLoading, error } = useReferences();

    const handleExport = () => exportReferenceReportPDF(references);
    const handleShowDetail = (tests) => {
        setSelectedReference(tests);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getStandardsColumns({ onShowDetail: handleShowDetail }),
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
            title="Manajemen Standar Referensi"
            header="Manajemen Standar Referensi"
        >
            <ManagedDataTable
                data={references}
                columns={columns}
                createTitle="Tambah Standar Referensi"
                editTitle="Edit Standar Referensi"
                deleteTitle="Hapus Standar Referensi"
                showCreate={false}
                showExport={true}
                onExport={handleExport}
            />
            <ReferenceDetailSheet
                data={selectedReference}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
