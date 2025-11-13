import { useParameters } from "@/hooks/useParameter";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getParametersColumns } from "@/components/shared/admin/test-columns";
import ParameterDetailSheet from "@/components/shared/sheet/parameter-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editParameterFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import { useUnits } from "@/hooks/useUnits";
import { useReferences } from "@/hooks/useReference";

export default function AdminParametersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedParameter, setSelectedParameter] = useState(null);

    const { user, loading: authLoading } = useAuth();
    const { parameters, isLoading, error, createParameter, updateParameter, deleteParameter, refetch } = useParameters();
    const { units, isLoading: unitLoading, error: unitError } = useUnits();
    const { references, isLoading: referenceLoading, error: referenceError } = useReferences();

    const handleShowDetail = (brand) => {
        setSelectedParameter(brand);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getParametersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    const currentUser = user || { name: "Admin", role: "Admin" };

    const handleCreate = async (formData) => createParameter.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateParameter.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteParameter.mutateAsync(id);

    if (isLoading || authLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Tes Parameter"
            user={currentUser}
            header="Manajemen Tes Parameter"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editParameterFields(units, references)}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Tes Parameter"
                editTitle="Edit Tes Parameter"
                deleteTitle="Hapus Tes Parameter"
            />
            <ParameterDetailSheet data={selectedParameter} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}