import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSampleCategoriesColumns } from "@/components/shared/admin/sample-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { sampleCategories } from "@/data/admin/sample";
import { editCategorySampleFields } from "@/utils/fields/admin";
import { useMemo } from "react";

export default function SampleCategoriesPage({ auth, sampleCategoriesData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = sampleCategoriesData || sampleCategories;

    const columns = useMemo(() => getSampleCategoriesColumns(), []);

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
        </DashboardLayout>
    );
}