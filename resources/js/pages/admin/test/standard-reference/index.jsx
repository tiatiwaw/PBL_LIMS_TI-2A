import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getStandardsColumns } from "@/components/shared/admin/test-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { standards } from "@/data/admin/tests";
import { editStandardFields } from "@/utils/fields/admin";
import { useMemo } from "react";

export default function StandardsPage({ auth, standardsData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = standardsData || standards;

    const columns = useMemo(() => getStandardsColumns(), []);

    return (
        <DashboardLayout
            title="Manajemen Standar Referensi"
            user={currentUser}
            header="Manajemen Standar Referensi"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editStandardFields}
                editUrl="admin.test.standard.update"
                deleteUrl="admin.test.standard.destroy"
                searchColumn="name" 
                editTitle="Edit Pengguna"
                deleteTitle="Hapus Pengguna"
            />
        </DashboardLayout>
    );
}
