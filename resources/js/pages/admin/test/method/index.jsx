import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getMethodsColumns } from "@/components/shared/admin/test-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { methods } from "@/data/admin/tests";
import { editMethodFields } from "@/utils/fields/admin";
import { useMemo } from "react";

export default function MethodsPage({ auth, methodsData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = methodsData || methods;

    const columns = useMemo(() => getMethodsColumns(), []);

    return (
        <DashboardLayout
            title="Manajemen Metode Uji"
            user={currentUser}
            header="Manajemen Metode Uji"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editMethodFields}
                createUrl="admin.test.method.create"
                editUrl="admin.test.method.update"
                deleteUrl="admin.test.method.destroy"
                editTitle="Edit Metode Uji"
                deleteTitle="Hapus Metode Uji"
            />
        </DashboardLayout>
    );
}