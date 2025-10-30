import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getReagentsColumns } from "@/components/shared/admin/material-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { reagents } from "@/data/admin/materials";
import { editReagentFields } from "@/utils/fields/admin";
import { useMemo } from "react";

export default function ReagentsPage({ auth, reagentsData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = reagentsData || reagents;

    const columns = useMemo(() => getReagentsColumns(), []);

    return (
        <DashboardLayout
            title="Manajemen Reagen"
            user={currentUser}
            header="Manajemen Reagen"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editReagentFields}
                createUrl="admin.materials.reagent.create"
                editUrl="admin.materials.reagent.update"
                deleteUrl="admin.materials.reagent.destroy"
                editTitle="Edit Reagent"
                deleteTitle="Hapus Reagent"
            />
        </DashboardLayout>
    );
}