
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getUsersColumns } from "@/components/shared/admin/user-columns";
import UserDetailSheet from "@/components/shared/sheet/user-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useTrainings, useUsers } from "@/hooks/useAdmin";
import { editTrainingFields, editUsersFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { getTrainingAnalystColumns } from "@/components/shared/admin/analyst-column";
import { Button } from "@/components/ui/button";

const filterData = [
    { value: "all", label: "All Role" },
    { value: "client", label: "Client" },
    { value: "staff", label: "Staff" },
    { value: "analyst", label: "Analyst" },
    { value: "supervisor", label: "Supervisor" },
    { value: "manager", label: "Manager" },
];

export default function AdminUsersPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isTrainingDialogOpen, setIsTrainingDialogOpen] = useState(false);
    const [tempSelectedTrainings, setTempSelectedTrainings] = useState([]);
    const [confirmedTrainings, setConfirmedTrainings] = useState([]);
    console.log("Confirmed Trainings:", tempSelectedTrainings);

    const {
        data: users,
        isLoading,
        error,
        create: createUser,
        update: updateUser,
        delete: deleteUser
    } = useUsers();

    const {
        data: trainingsData,
        isLoading: trainingLoading,
        error: trainingError,
        create: createTraining
    } = useTrainings();

    const handleShowDetail = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const handleCreateTraining = async (formData) => {
        return createTraining.mutateAsync(formData);
    };

    const handleTrainingSelect = (training) => {
        if (!training) return;

        setTempSelectedTrainings((prev) => {
            const exists = prev.find((t) => t.id === training.id);
            if (exists) {
                return prev.filter((t) => t.id !== training.id);
            } else {
                return [...prev, training];
            }
        });
    };

    const handleOpenTrainingDialog = (currentFormData) => {
        const existingTrainings = currentFormData?.trainings || confirmedTrainings;
        setTempSelectedTrainings(existingTrainings);
        setIsTrainingDialogOpen(true);
    };

    const handleTrainingDialogChange = (open) => {
        if (!open) {
            setTempSelectedTrainings([]);
        }
        setIsTrainingDialogOpen(open);
    };

    const handleAddTrainings = () => {
        setConfirmedTrainings(tempSelectedTrainings);
        setIsTrainingDialogOpen(false);

    };

    const handleRemoveTraining = (trainingId) => {
        const updatedTrainings = confirmedTrainings.filter((t) => t.id !== trainingId);
        setConfirmedTrainings(updatedTrainings);
    };

    const getCurrentTrainings = () => {
        return confirmedTrainings;
    };

    const columns = useMemo(
        () => getUsersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    const handleCreate = async (formData) => {
        const dataToSave = {
            ...formData,
            // specialist: formData.analyst.specialist,
            trainings: confirmedTrainings
        };
        // await createUser.mutateAsync(dataToSave);
        console.log("Creating user with data:", dataToSave);

        setConfirmedTrainings([]);
    };

    const handleEdit = async (id, formData) => {
        const dataToSave = {
            ...formData,
            trainings: confirmedTrainings
        };
        await updateUser.mutateAsync({ id, data: dataToSave });

        setConfirmedTrainings([]);
    };

    const handleDelete = async (id) => {
        await deleteUser.mutateAsync(id);
    };

    const handleFormOpen = (user) => {
        if (user?.analyst?.trainings) {
            setConfirmedTrainings(user.analyst.trainings);
        } else {
            setConfirmedTrainings([]);
        }
    };

    if (isLoading || trainingLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error || trainingError) {
        return (
            <DashboardLayout title="Dashboard Admin" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error?.message || trainingError?.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Pengguna" header="Manajemen Pengguna">
            <ManagedDataTable
                data={users}
                columns={columns}
                editFields={editUsersFields(
                    getCurrentTrainings(),
                    handleOpenTrainingDialog,
                    handleRemoveTraining
                )}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onFormOpen={handleFormOpen}
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

            <Dialog open={isTrainingDialogOpen} onOpenChange={handleTrainingDialogChange}>
                <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Pilih Pelatihan</DialogTitle>
                        <DialogDescription>
                            Pilih satu atau beberapa pelatihan yang akan ditambahkan untuk pengguna ini
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-grow overflow-y-auto">
                        <ManagedDataTable
                            data={trainingsData}
                            columns={getTrainingAnalystColumns({
                                selectedTrainings: tempSelectedTrainings,
                                onSelectTraining: handleTrainingSelect,
                            })}
                            editFields={editTrainingFields}
                            showFilter={false}
                            showSearch={true}
                            showCreate={true}
                            onCreate={handleCreateTraining}
                            createTitle="Tambah Pelatihan Baru"
                        />
                    </div>

                    <DialogFooter className="flex justify-between gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsTrainingDialogOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleAddTrainings}
                            disabled={tempSelectedTrainings.length === 0}
                            className="!bg-primary-hijauMuda hover:!bg-primary-hijauTua"
                        >
                            Tambahkan ({tempSelectedTrainings.length} dipilih)
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}