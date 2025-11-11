import { useReferences } from "@/hooks/useAdminReference";
import Loading from "@/components/ui/loading"; 
import { useAuth } from "@/hooks/useAuth"; 
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getStandardsColumns } from "@/components/shared/admin/test-columns";
import ReferenceDetailSheet from "@/components/shared/sheet/reference-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { standards } from "@/data/admin/tests";
import { editStandardFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function StandardsPage({ auth, standardsData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReference, setSelectedReference] = useState(null);
            
    const handleShowDetail = (tests) => {
            setSelectedReference(tests);
            setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = standardsData || standards;

    const columns = useMemo(() => getStandardsColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout
            title="Manajemen Standar Referensi"
            user={currentUser}
            header="Manajemen Standar Referensi"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editStandardFields}
                createUrl="admin.test.standard.create"
                editUrl="admin.test.standard.update"
                deleteUrl="admin.test.standard.destroy"
                editTitle="Edit Pengguna"
                deleteTitle="Hapus Pengguna"
            />
        <ReferenceDetailSheet data={selectedReference} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}
