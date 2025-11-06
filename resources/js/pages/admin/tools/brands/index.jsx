import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getBrandsColumns } from "@/components/shared/admin/tool-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import BrandDetailSheet from "@/components/shared/sheet/brand-detail-sheet";
import { brands } from "@/data/admin/tools";
//
import { editBrandFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function BrandsPage({ auth, brandsData }) {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedEquipment, setSelectedEquipment] = useState(null);
    
        const handleShowDetail = (equipment) => {
            setSelectedEquipment(equipment);
            setIsOpen(true);
        };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = brandsData || brands;

    const columns = useMemo(() => getBrandsColumns({onShowDetail: handleShowDetail}), []);
    
    return (
        <DashboardLayout
            title="Manajemen Jenis Brand"
            user={currentUser}
            header="Manajemen Jenis Brand"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editBrandFields}
                createUrl="admin.test.standard.create"
                editUrl="admin.test.standard.update"
                deleteUrl="admin.test.standard.destroy"
                editTitle="Edit Pengguna"
                deleteTitle="Hapus Pengguna"
            />
            <BrandDetailSheet equipment={selectedEquipment} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}