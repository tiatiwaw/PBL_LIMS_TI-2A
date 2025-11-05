import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getActivitiesColumns } from "@/components/shared/admin/log-activity-columns";
import { getUsersColumns } from "@/components/shared/admin/user-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { users } from "@/data/admin/users";
import { editUsersFields } from "@/utils/fields/admin";
import { useMemo } from "react";

const filterData = [
    { value: "all", label: "All Role" },
    { value: "Client", label: "Client" },
    { value: "Staff", label: "Staff" },
    { value: "Analis", label: "Analis" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Manager", label: "Manager" },
];

export default function AdminUsersPage({ auth, usersData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = usersData || users;

    const columns = useMemo(() => getActivitiesColumns(), []);

    return (
        <DashboardLayout title="Users" user={currentUser} header="Aktivitas Log Website">
            <ManagedDataTable
                data={parameters}
                columns={columns}
                // editFields={editUsersFields}
                // createUrl="admin.user.create"
                //editUrl="admin.user.update"
                //deleteUrl="admin.user.destroy"
                showFilter={true}
                showCreate={false}
                filterColumn="role"
                filterOptions={filterData}
                //editTitle="Edit Pengguna"
                //deleteTitle="Hapus Pengguna"
            />
        </DashboardLayout>
    );
}