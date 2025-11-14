import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getGradesColumns } from "@/components/shared/admin/material-columns";
import GradeDetailSheet from "@/components/shared/sheet/grade-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useGrades } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";
import { editGradeFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function AdminGradesPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGrades, setSelectedGrades] = useState(null);

    const { auth, loading: authLoading } = useAuth();
    const { data: grades, isLoading, error, createItem: createGrade, updateItem: updateGrade, deleteItem: deleteGrade } = useGrades();

    const handleShowDetail = (materials) => {
        setSelectedGrades(materials);
        setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };

    const columns = useMemo(() => getGradesColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => createGrade.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateGrade.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteGrade.mutateAsync(id);

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
            title="Manajemen Jenis Grade"
            user={currentUser}
            header="Manajemen Jenis Grade"
        >
            <ManagedDataTable
                data={grades}
                columns={columns}
                editFields={editGradeFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createTitle="Tambah Tingkatan"
                editTitle="Edit Tingkatan"
                deleteTitle="Hapus Tingkatan"
            />
            <GradeDetailSheet data={selectedGrades} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}
