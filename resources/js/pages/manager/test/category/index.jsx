import Loading from "@/components/ui/loading";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSampleCategoriesColumns } from "@/components/shared/manager/test-columns";
import CategoryDetailSheet from "@/components/shared/sheet/category-detail-sheets";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useMemo, useState } from "react";
import { useCategories } from "@/hooks/useManager";
import { exportCategoryReportPDF } from "@/utils/pdf/export/test-export";

export default function ManagerSampleCategoriesPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { data: categories, isLoading, error } = useCategories();

    const handleExport = () => exportCategoryReportPDF(categories);

    const handleShowDetail = (tests) => {
        setSelectedCategory(tests);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getSampleCategoriesColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Kategori Sampel"
            header="Manajemen Kategori Sampel"
        >
            <ManagedDataTable
                data={categories}
                columns={columns}
                showCreate={false}
                showExport={true}
                onExport={handleExport}
            />
            <CategoryDetailSheet
                data={selectedCategory}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
