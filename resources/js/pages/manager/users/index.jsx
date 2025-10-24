import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getColumns } from "@/components/shared/manager/user-columns";
import DataTable from "@/components/shared/tabel/data-tabels";
import { users } from "@/data/manager/users";

const filterData = [
    { value: "all", label: "All Role" },
    { value: "Staff", label: "Staff" },
    { value: "Analis", label: "Analis" },
    { value: "Supervisor", label: "Supervisor" },
];

export default function UsersPage({ auth, usersData }) {
    const columns = getColumns();

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const currentUsers = usersData || users;

    return (
        <DashboardLayout title="Users" user={currentUser} header="Users">
            <DataTable
                columns={columns}
                data={currentUsers}
                pageSize={10}
                showSearch={true}
                searchColumn="user"
                showFilter={true}
                filterColumn="role"
                filterOptions={filterData}
            />
        </DashboardLayout>
    );
}
