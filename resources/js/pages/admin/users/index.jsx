import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getUsersColumns } from "@/components/shared/admin/user-columns";
import UserDetailSheet from "@/components/shared/sheet/user-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
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

export default function AdminUsersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { user, loading: authLoading } = useAuth();
    const { users, isLoading, error, createUser, updateUser, deleteUser } = useUser();

    const handleShowDetail = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const currentUser = user || { name: "Admin", role: "Admin" };

    const columns = useMemo(() => getUsersColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => createUser.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateUser.mutateAsync({ id, data: formData });
    };

    const handleDelete = async (id) => deleteUser.mutateAsync(id);

    if (isLoading || authLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Pengguna" user={currentUser} header="Manajemen Pengguna">
            <ManagedDataTable
                data={users}
                columns={columns}
                editFields={editUsersFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showFilter={true}
                filterColumn="role"
                filterOptions={filterData}
                createTitle="Tambah Pengguna"
                editTitle="Edit Pengguna"
                deleteTitle="Hapus Pengguna"
            />
            <UserDetailSheet
                data={selectedUser}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}