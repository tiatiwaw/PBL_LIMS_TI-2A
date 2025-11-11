import { useSertif } from "@/hooks/useAdminSertif";
import Loading from "@/components/ui/loading"; 
import { useAuth } from "@/hooks/useAuth"; 
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSertifColumns } from "@/components/shared/admin/test-columns";//
import SertifDetailSheet from "@/components/shared/sheet/sertif-detail-sheets";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { sampleSertificates } from "@/data/admin/tests";//
import { editSertificateFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function SampleCategoriesPage({ auth, sampleSertificatesData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
            
    const handleShowDetail = (tests) => {
            setSelectedCategory(tests);
            setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King", role: "Admin" };
    const parameters = sampleSertificatesData || sampleSertificates;

    const columns = useMemo(() => getSertifColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout
            title="Manajemen Sertifikat"
            user={currentUser}
            header="Manajemen Sertifikat"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editSertificateFields}
                createUrl="admin.test.categorySample.create"
                editUrl="admin.test.categorySample.update"
                deleteUrl="admin.test.categorySample.destroy"
                editTitle="Edit Sertifikat Sampel"
                deleteTitle="Hapus Sertifikat Sampel"
            />
        <SertifDetailSheet data={selectedCategory} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}