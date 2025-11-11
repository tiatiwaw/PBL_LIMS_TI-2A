import { useTraining } from "@/hooks/useAdminTraining";
import Loading from "@/components/ui/loading"; 
import { useAuth } from "@/hooks/useAuth"; 
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getTrainingColumns } from "@/components/shared/admin/test-columns";//
import TrainingDetailSheet from "@/components/shared/sheet/training-detail-sheets";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { SampleTraining } from "@/data/admin/tests";//
import { editTrainingFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function SampleCategoriesPage({ auth, trainingData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
            
    const handleShowDetail = (tests) => {
            setSelectedCategory(tests);
            setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "Akbar", role: "Manager" };
    const parameters = trainingData || SampleTraining;

    const columns = useMemo(() => getTrainingColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout
            title="Manajemen Pelatihan Sampel"
            user={currentUser}
            header="Manajemen Pelatihan Sampel"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editTrainingFields}
                createUrl="admin.test.categorySample.create"
                editUrl="admin.test.categorySample.update"
                deleteUrl="admin.test.categorySample.destroy"
                editTitle="Edit Pelatihan Sampel"
                deleteTitle="Hapus Pelatihan Sampel"
            />
        <TrainingDetailSheet data={selectedCategory} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}