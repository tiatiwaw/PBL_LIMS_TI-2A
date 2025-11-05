import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getGradesColumns } from "@/components/shared/admin/material-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { grades } from "@/data/admin/materials";
import { editGradeFields } from "@/utils/fields/admin";
import { useMemo } from "react";

export default function GradesPage({ auth, gradesData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = gradesData || grades;

    const columns = useMemo(() => getGradesColumns(), []);

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
                createUrl="admin.materials.grade.create"
                editUrl="admin.materials.grade.update"
                deleteUrl="admin.materials.grade.destroy"
                editTitle="Edit Tingkatan"
                deleteTitle="Hapus Tingkatan"
            />
        </DashboardLayout>
    );
}
