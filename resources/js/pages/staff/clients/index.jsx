import DashboardLayout from "@/components/layouts/dashboard-layout";
import ClientDetailsDialog from "@/components/shared/staff/client-dialog";
import { getClientColumns } from "@/components/shared/staff/client-colums";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Clients } from "@/data/staff/clients";
import { editClientFields } from "@/utils/fields/staff";
import { useMemo, useState } from "react";

export default function ClientPage({ auth, clientData }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const handleShowDetail = (client) => {
        setSelectedClient(client);
        setIsDialogOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Staff" };
    const parameters = clientData || Clients;

    const columns = useMemo(
        () => getClientColumns({ onShowDetail: handleShowDetail }),
        []
    );

    return (
        <DashboardLayout
            title="Manajemen Client"
            user={currentUser}
            header="Manajemen Client"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editClientFields}
                createUrl="staff.client.create"
                editUrl="staff.client.update"
                deleteUrl="staff.client.destroy"
                editTitle="Edit Client"
                deleteTitle="Hapus Client"
            />
            <ClientDetailsDialog
                client={selectedClient}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </DashboardLayout>
    );
}
