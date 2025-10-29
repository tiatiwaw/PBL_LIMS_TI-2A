import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getGradesColumns } from "@/components/shared/admin/material-columns";
import DataTable from "@/components/shared/tabel/data-tabels";
import { grades } from "@/data/admin/materials";

export default function GradesPage({ auth, gradesData }) {
    const columns = getGradesColumns();

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = gradesData || grades;

    const handleEdit = (row) => {
        console.log("Edit grade:", row);
    };

    const handleDelete = (row) => {
        console.log("Delete grade:", row);
    };

    return (
        <DashboardLayout
            title="Manajemen Jenis Grade"
            user={currentUser}
            header="Manajemen Jenis Grade"
        >
            <DataTable
                columns={columns}
                data={parameter}
                pageSize={10}
                showSearch={true}
                searchColumn="nama_grade"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </DashboardLayout>
    );
}
