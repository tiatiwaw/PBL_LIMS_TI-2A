import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSuppliersColumns } from "@/components/shared/admin/material-columns";
import SupplierDetailSheet from "@/components/shared/sheet/supplier-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { useSuppliers } from "@/hooks/useSupplier";
import { editSupplierFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function SuppliersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const { user, loading: authLoading } = useAuth();
    const { suppliers, isLoading: suppliersLoading, error: suppliersError, createSupplier, updateSupplier, deleteSupplier } = useSuppliers();
    
    const handleShowDetail = (materials) => {
            setSelectedSupplier(materials);
            setIsOpen(true);
    };

    const currentUser = user || { name: "Admin", role: "Admin" };

    const columns = useMemo(() => getSuppliersColumns({ onShowDetail: handleShowDetail }), []);
    
    const handleCreate = async (formData) => createSupplier.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateSupplier.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteSupplier.mutateAsync(id);

    if (suppliersLoading || authLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (suppliersError) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {suppliersError.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Pemasok Reagent"
            user={currentUser}
            header="Manajemen Pemasok Reagent"
        >
            <ManagedDataTable
                data={suppliers}
                columns={columns}
                editFields={editSupplierFields}
                onCreate={handleCreate}
                onDelete={handleDelete}
                onEdit={handleEdit}
                createTitle="Tambah Pemasok"
                editTitle="Edit Pemasok"
                deleteTitle="Hapus Pemasok"
            />
        <SupplierDetailSheet data={selectedSupplier} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}
