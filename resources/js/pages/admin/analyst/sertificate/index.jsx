import { useSertif } from "@/hooks/useSertificate";
import Loading from "@/components/ui/loading"; 
import { useAuth } from "@/hooks/useAuth"; 
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSertifColumns } from "@/components/shared/admin/test-columns";//
import SertifDetailSheet from "@/components/shared/sheet/sertif-detail-sheets";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { sampleSertificates } from "@/data/admin/tests";//
import { editSertificateFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function SampleCategoriesPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { user, loading: authLoading } = useAuth();
    const { sertif, isLoading, error, createSertif, updateSertif, deleteSertif } = useSertif();
            
    const handleShowDetail = (tests) => {
            setSelectedCategory(tests);
            setIsOpen(true);
    };

    const columns = useMemo(() => getSertifColumns({ onShowDetail: handleShowDetail }), []);

    const currentUser = user || { name: "Admin", role: "Admin" };

    const handleCreate = async (formData) => createSertif.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateSertif.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteSertif.mutateAsync(id);

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
            title="Manajemen Sertifikat"
            user={currentUser}
            header="Manajemen Sertifikat"
        >
            <ManagedDataTable
                data={sertif}
                columns={columns}
                editFields={editSertificateFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Sertifikat"
                editTitle="Edit Sertifikat"
                deleteTitle="Hapus Sertifikat"
            />
        <SertifDetailSheet data={selectedCategory} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}