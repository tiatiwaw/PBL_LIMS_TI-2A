import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getParametersColumns } from "@/components/shared/admin/test-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { parameters } from "@/data/admin/tests";
import { editParameterFields } from "@/utils/fields/admin";
import { useMemo } from "react";

export default function ParametersPage({ auth, parametersData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const data = parametersData || parameters;

    const columns = useMemo(() => getParametersColumns(), []);

    return (
        <DashboardLayout
            title="Manajemen Tes Parameter"
            user={currentUser}
            header="Manajemen Tes Parameter"
        >
            <ManagedDataTable
                data={data}
                columns={columns}
                editFields={editParameterFields}
                createUrl="admin.test.parameter.create"
                editUrl="admin.test.parameter.update"
                deleteUrl="admin.test.parameter.destroy"
                editTitle="Edit Tes Parameter"
                deleteTitle="Hapus Tes Parameter"
            />
        </DashboardLayout>
    );
}