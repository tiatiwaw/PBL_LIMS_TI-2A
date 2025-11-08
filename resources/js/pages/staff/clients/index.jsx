import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getClientColumns } from "@/components/shared/staff/client-colums";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Clients } from "@/data/staff/clients";
import { editClientFields } from "@/utils/fields/staff";
import { useMemo, useState } from "react";
import ClientDetailSheet from "@/components/shared/sheet/client-detail-sheet";

export default function ClientPage({ auth, clientData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const handleShowDetail = (client) => {
        setSelectedClient(client);
        setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Staff" };
    const parameters = clientData || Clients;

    const processedParameters = useMemo(
        () =>
            parameters.map((client) => ({
                ...client,
            })),
        [parameters]
    );

    const columns = useMemo(
        () => getClientColumns({ onShowDetail: handleShowDetail }),
        []
    );

    return (
        <DashboardLayout
            title="Manajemen Client"
            user={currentUser}
            header="Client"
        >
            <ManagedDataTable
                data={processedParameters}
                columns={columns}
                editFields={editClientFields}
                createUrl="staff.client.store"
                editUrl="staff.client.update"
                deleteUrl="staff.client.destroy"
                editTitle="Edit Client"
                deleteTitle="Hapus Client"
            />
            <ClientDetailSheet
                data={selectedClient}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
