import { useMethods } from "@/hooks/useMethod";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getMethodsColumns } from "@/components/shared/admin/test-columns";
import MethodDetailSheet from "@/components/shared/sheet/method-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { editMethodFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import { useReferences } from "@/hooks/useReference";

export default function MethodsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);

    const { user, loading: authLoading } = useAuth();
    const { methods, isLoading, error, createMethod, updateMethod, deleteMethod } = useMethods();
    const { references, isLoading: referenceLoading, error: referenceError } = useReferences();

    const handleShowDetail = (tests) => {
        setSelectedMethod(tests);
        setIsOpen(true);
    };

    const currentUser = user || { name: "Admin", role: "Admin" };

    const columns = useMemo(() => getMethodsColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => createMethod.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateMethod.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteMethod.mutateAsync(id);

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
            title="Manajemen Metode Uji"
            user={currentUser}
            header="Manajemen Metode Uji"
        >
            <ManagedDataTable
                data={methods}
                columns={columns}
                editFields={editMethodFields(references)}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                editTitle="Edit Metode Uji"
                deleteTitle="Hapus Metode Uji"
            />
            <MethodDetailSheet data={selectedMethod} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}