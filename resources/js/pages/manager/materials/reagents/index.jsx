import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getReagentsColumns } from "@/components/shared/admin/material-columns";
import ReagentsDetailSheet from "@/components/shared/sheet/reagen_detail_sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useMemo, useState } from "react";
import Loading from "@/components/ui/loading";
import { useGrades, useReagents, useSuppliers } from "@/hooks/useManager";

export default function ManagerReagentsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReagents, setSelectedReagents] = useState(null);

    const handleShowDetail = (materials) => {
        setSelectedReagents(materials);
        setIsOpen(true);
    };

    const { data: grades, isLoading: gradesLoading, error: gradesError } = useGrades();
    const { data: suppliers, isLoading: suppliersLoading, error: suppliersError } = useSuppliers();
    const { data: reagents, isLoading: regeantsLoading, error: regeantsError } = useReagents();

    const columns = useMemo(() => getReagentsColumns({ onShowDetail: handleShowDetail }), []);

    if (gradesLoading || suppliersLoading || regeantsLoading) {
        return (
            <DashboardLayout title="Dashboard Manager"  header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (regeantsError || suppliersError || gradesError) {
        return (
            <DashboardLayout title="Dashboard Manager"  header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {"Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Reagen"
            header="Manajemen Reagen"
        >
            <ManagedDataTable
                data={reagents}
                columns={columns}
                createTitle="Tambah Reagent"
                editTitle="Edit Reagent"
                deleteTitle="Hapus Reagent"
            />
            <ReagentsDetailSheet data={selectedReagents} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}