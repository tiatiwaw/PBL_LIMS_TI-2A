import DashboardLayout from "@/components/layouts/dashboard-layout";
import UserDetailsDialog from "@/components/shared/dialog/user-dialog";
import { getUsersColumns } from "@/components/shared/manager/user-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { users } from "@/data/admin/users";
import { useMemo, useState } from "react";

const filterData = [
    { value: "all", label: "All Role" },
    { value: "Client", label: "Client" },
    { value: "Staff", label: "Staff" },
    { value: "Analis", label: "Analis" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Manager", label: "Manager" },
];

export default function ManagerUsersPage({ auth, usersData }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleShowDetail = (user) => {
        setSelectedUser(user);
        setIsDialogOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = usersData || users;

    const columns = useMemo(() => getUsersColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout title="Users" user={currentUser} header="Users">
            <ManagedDataTable
                data={parameters}
                columns={columns}
                showFilter={true}
                filterColumn="role"
                filterOptions={filterData}
            />
            <UserDetailsDialog
                user={selectedUser}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </DashboardLayout>
    );
}