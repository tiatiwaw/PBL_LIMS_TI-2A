import { useUnits } from "@/hooks/useUnits";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getUnitsColumns } from "@/components/shared/admin/test-columns";
import UnitDetailSheet from "@/components/shared/sheet/unit-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { units } from "@/data/admin/tests";
import { editUnitFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function UnitsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);

    const { user, loading: authLoading } = useAuth();
    const { units, isLoading, error, createUnit, updateUnit, deleteUnit } = useUnits();

    const handleShowDetail = (tests) => {
        setSelectedUnit(tests);
        setIsOpen(true);
    };

    const columns = useMemo(() => getUnitsColumns({ onShowDetail: handleShowDetail }), []);

    const currentUser = user || { name: "Admin", role: "Admin" };

    const handleCreate = async (formData) => createUnit.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateUnit.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteUnit.mutateAsync(id);

    if (isLoading || authLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser}>
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser}>
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Nilai Unit"
            user={currentUser}
            header="Manajemen Nilai Unit"
        >
            <ManagedDataTable
                data={units}
                columns={columns}
                editFields={editUnitFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                editTitle="Edit Nilai Satuan"
                deleteTitle="Hapus Nilai Satuan"
            />
            <UnitDetailSheet data={selectedUnit} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}