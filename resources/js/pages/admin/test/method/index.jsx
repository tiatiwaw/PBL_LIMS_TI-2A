import { useMethods } from "@/hooks/useAdminMethod";
import Loading from "@/components/ui/loading"; 
import { useAuth } from "@/hooks/useAuth"; 
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getMethodsColumns } from "@/components/shared/admin/test-columns";
import MethodDetailSheet from "@/components/shared/sheet/method-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { methods } from "@/data/admin/tests";
import { editMethodFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function MethodsPage({ auth, methodsData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
        
    const handleShowDetail = (tests) => {
            setSelectedMethod(tests);
            setIsOpen(true);
    };
    
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = methodsData || methods;

    const columns = useMemo(() => getMethodsColumns({ onShowDetail: handleShowDetail }), []);
    

    return (
        <DashboardLayout
            title="Manajemen Metode Uji"
            user={currentUser}
            header="Manajemen Metode Uji"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editMethodFields}
                createUrl="admin.test.method.create"
                editUrl="admin.test.method.update"
                deleteUrl="admin.test.method.destroy"
                editTitle="Edit Metode Uji"
                deleteTitle="Hapus Metode Uji"
            />
        <MethodDetailSheet data={selectedMethod} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}