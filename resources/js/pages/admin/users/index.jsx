import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getUsersColumns } from "@/components/shared/admin/user-columns";
import UserDetailSheet from "@/components/shared/sheet/user-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { users } from "@/data/admin/users";
import { editUsersFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

const filterData = [
    { value: "all", label: "All Role" },
    { value: "Client", label: "Client" },
    { value: "Staff", label: "Staff" },
    { value: "Analis", label: "Analis" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Manager", label: "Manager" },
];

export default function AdminUsersPage({ auth, usersData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleShowDetail = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = usersData || users;

    const columns = useMemo(() => getUsersColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout title="Manajemen Pengguna" user={currentUser} header="Manajemen Pengguna">
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editUsersFields}
                createUrl="admin.user.create"
                editUrl="admin.user.update"
                deleteUrl="admin.user.destroy"
                showFilter={true}
                filterColumn="role"
                filterOptions={filterData}
                editTitle="Edit Pengguna"
                deleteTitle="Hapus Pengguna"
            />
            <UserDetailSheet
                user={selectedUser}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}