import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getUsersColumns } from "@/components/shared/manager/user-columns";
import UserDetailSheet from "@/components/shared/sheet/user-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useEmployees } from "@/hooks/useManager";
import { FILTER_OPTIONS } from "@/utils/constant/users";
import { useMemo, useState } from "react";

export default function ManagerUsersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { data: employees, isLoading, error } = useEmployees();

    const handleShowDetail = (employee) => {
        setSelectedUser(employee);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getUsersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Karyawan" header="Manajemen Karyawan">
            <ManagedDataTable
                data={employees}
                columns={columns}
                showFilter={true}
                filterColumn="role"
                filterOptions={FILTER_OPTIONS}
                showCreate={false}
            />
            <UserDetailSheet
                data={selectedUser}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
