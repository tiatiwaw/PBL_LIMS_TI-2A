import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import BrandDetailSheet from "@/components/shared/sheet/brand-detail-sheet";
import { getBrandsColumns } from "@/components/shared/admin/tool-columns";
import { editBrandFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useBrands } from "@/hooks/useBrands";
import Loading from "@/components/ui/loading";

export default function BrandsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const { user, loading: authLoading } = useAuth();
    const { brands, isLoading, error, createBrand, updateBrand, deleteBrand } = useBrands();

    const handleShowDetail = (brand) => {
        setSelectedBrand(brand);
        setIsOpen(true);
    };

    const columns = useMemo(
        () => getBrandsColumns({ onShowDetail: handleShowDetail }),
        []
    );

    const currentUser = user || { name: "Admin", role: "Admin" };

    const handleCreate = async (formData) => createBrand.mutateAsync(formData);

    const handleEdit = async (id, formData) => {
        await updateBrand.mutateAsync({ id, data: formData });
    };
    
    const handleDelete = async (id) => deleteBrand.mutateAsync(id);

    if (isLoading || authLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Jenis Brand"
            user={currentUser}
            header="Manajemen Jenis Brand"
        >
            <ManagedDataTable
                data={brands}
                columns={columns}
                editFields={editBrandFields}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
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
