import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import BrandDetailSheet from "@/components/shared/sheet/brand-detail-sheet";
import { getBrandsColumns } from "@/components/shared/admin/tool-columns";
import { useMemo, useState } from "react";
import Loading from "@/components/ui/loading";
import { useBrands } from "@/hooks/useManager";

export default function ManagerBrandsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const { data: brands, isLoading, error } = useBrands();

    const handleShowDetail = (brand) => {
        setSelectedBrand(brand);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getBrandsColumns({ onShowDetail: handleShowDetail }),
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
            title="Manajemen Jenis Brand"
            header="Manajemen Jenis Brand"
        >
            <ManagedDataTable
                data={brands}
                columns={columns}
                createTitle="Tambah Brand"
                editTitle="Edit Brand"
                deleteTitle="Hapus Brand"
            />
            <BrandDetailSheet
                data={selectedBrand}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
