import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSuppliersColumns } from "@/components/shared/manager/material-columns";
import SupplierDetailSheet from "@/components/shared/sheet/supplier-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useSuppliers } from "@/hooks/useManager";
import { exportSupplierReportPDF } from "@/utils/pdf/export/tools-export";
import { useMemo, useState } from "react";

export default function ManagerSuppliersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const {
        data: suppliers,
        isLoading: suppliersLoading,
        error: suppliersError,
    } = useSuppliers();

    const handleShowDetail = (materials) => {
        setSelectedSupplier(materials);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getSuppliersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    const handleExport = () => exportSupplierReportPDF(suppliers);
    if (suppliersLoading) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (suppliersError) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {suppliersError.message ||
                        "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Pemasok Reagent"
            header="Manajemen Pemasok Reagent"
        >
            <ManagedDataTable
                data={suppliers}
                columns={columns}
                onExport={handleExport}
                showExport={true}
                showCreate={false}
            />
            <SupplierDetailSheet
                data={selectedSupplier}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
