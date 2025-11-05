import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getEquipmentsColumns } from "@/components/shared/admin/tool-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { tools } from "@/data/admin/tools";
import { editEquipmentFields } from "@/utils/fields/admin";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Broken", label: "Broken" },
];

export default function EquipmentsPage({ auth, toolsData }) {
    const columns = getEquipmentsColumns();

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = toolsData || tools;

    return (
        <DashboardLayout
            title="Manajemen Alat"
            user={currentUser}
            header="Manajemen Alat"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editEquipmentFields}
                createUrl="admin.tools.equipment.create"
                editUrl="admin.tools.equipment.update"
                deleteUrl="admin.tools.equipment.destroy"
                showFilter={true}
                filterColumn="status"
                filterOptions={filterData}
                editTitle="Edit Pengguna"
                deleteTitle="Hapus Pengguna"
            />
        </DashboardLayout>
    );
}