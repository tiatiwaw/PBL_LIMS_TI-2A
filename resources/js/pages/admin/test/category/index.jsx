import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSampleCategoriesColumns } from "@/components/shared/admin/test-columns";//
import CategoryDetailSheet from "@/components/shared/sheet/category-detail-sheets";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { sampleCategories } from "@/data/admin/tests";//
import { editCategorySampleFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function SampleCategoriesPage({ auth, sampleCategoriesData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
            
    const handleShowDetail = (tests) => {
            setSelectedCategory(tests);
            setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = sampleCategoriesData || sampleCategories;

    const columns = useMemo(() => getSampleCategoriesColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout
            title="Manajemen Kategori Sampel"
            user={currentUser}
            header="Manajemen Kategori Sampel"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editCategorySampleFields}
                createUrl="admin.test.categorySample.create"
                editUrl="admin.test.categorySample.update"
                deleteUrl="admin.test.categorySample.destroy"
                editTitle="Edit Kategori Sampel"
                deleteTitle="Hapus Kategori Sampel"
            />
        <CategoryDetailSheet data={selectedCategory} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}