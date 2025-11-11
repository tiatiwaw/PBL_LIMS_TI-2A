import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getGradesColumns } from "@/components/shared/admin/material-columns";
import GradeDetailSheet from "@/components/shared/sheet/grade-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { grades } from "@/data/admin/materials";
import { editGradeFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function GradesPage({ auth, gradesData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGrades, setSelectedGrades] = useState(null);
    
    const handleShowDetail = (materials) => {
            setSelectedGrades(materials);
            setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = gradesData || grades;

    const columns = useMemo(() => getGradesColumns({ onShowDetail: handleShowDetail }), []);
    
    const handleCreate = async (formData) => {
    console.log("Create data:", formData);
    };

    const handleEdit = async (id, formData) => {
        console.log("Edit ID:", id);
        console.log("Data:", formData);
    };

    const handleDelete = async (id) => {
        console.log("Delete ID:", id);
        console.log("Data:", formData);
    };


    return (
        <DashboardLayout
            title="Manajemen Jenis Grade"
            user={currentUser}
            header="Manajemen Jenis Grade"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editGradeFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createUrl="admin.materials.grade.create"
                editUrl="admin.materials.grade.update"
                deleteUrl="admin.materials.grade.destroy"
                editTitle="Edit Tingkatan"
                deleteTitle="Hapus Tingkatan"
            />
        <GradeDetailSheet data={selectedGrades} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}
