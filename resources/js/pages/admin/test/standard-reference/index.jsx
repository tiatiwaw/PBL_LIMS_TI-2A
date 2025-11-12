import { useReferences } from "@/hooks/useReference";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getStandardsColumns } from "@/components/shared/admin/test-columns";
import ReferenceDetailSheet from "@/components/shared/sheet/reference-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { standards } from "@/data/admin/tests";
import { editStandardFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function StandardsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReference, setSelectedReference] = useState(null);

    const { user, loading: authLoading } = useAuth();
    const { references, isLoading, error, createReference, updateReference, deleteReference } = useReferences();

    const handleShowDetail = (tests) => {
        setSelectedReference(tests);
        setIsOpen(true);
    };

    const columns = useMemo(() => getStandardsColumns({ onShowDetail: handleShowDetail }), []);

    const currentUser = user || { name: "Admin", role: "Admin" };

    const handleCreate = async (formData) => createReference.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateReference.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteReference.mutateAsync(id);

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
            title="Manajemen Standar Referensi"
            user={currentUser}
            header="Manajemen Standar Referensi"
        >
            <ManagedDataTable
                data={references}
                columns={columns}
                editFields={editStandardFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                editTitle="Edit Pengguna"
                deleteTitle="Hapus Pengguna"
            />
            <ReferenceDetailSheet data={selectedReference} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}
