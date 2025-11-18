import DashboardLayout from "@/components/layouts/dashboard-layout";
import UserDetailsDialog from "@/components/shared/dialog/user-dialog";
import { getUsersColumns } from "@/components/shared/manager/user-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useMemo, useState } from "react";
import { usePage } from "@inertiajs/react";

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

    const page = usePage();
    const currentUser = auth?.user || page?.props?.auth?.user || { name: "Manager", role: "Manager" };
    const parameters = usersData || page?.props?.usersData || [];

    const columns = useMemo(() => getUsersColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout title="Users" user={currentUser} header="Users">
            <ManagedDataTable
                data={parameters}
                columns={columns}
                searchColumn="name"
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
