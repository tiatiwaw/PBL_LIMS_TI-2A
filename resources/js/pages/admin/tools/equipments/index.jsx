import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getEquipmentsColumns } from "@/components/shared/admin/tool-columns";
import EquipmentDetailSheet from "@/components/shared/sheet/equipment-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { useBrands } from "@/hooks/useBrands";
import { useEquipments } from "@/hooks/useEquipments";
import { editEquipmentFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Broken", label: "Broken" },
];

export default function EquipmentsPage({ auth, toolsData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    const { brands, isLoading: brandLoading, error: brandError } = useBrands();
    const { equipments, isLoading: equipmentLoading, error: equipmentError } = useEquipments();
    const { user, loading: authLoading } = useAuth();

    const handleShowDetail = (equipment) => {
        setSelectedEquipment(equipment);
        setIsOpen(true);
    };
    const currentUser = user || { name: "King Akbar", role: "Manager" };

    const columns = useMemo(() => getEquipmentsColumns({ onShowDetail: handleShowDetail }), []);

    if (brandLoading || equipmentLoading || authLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser}>
                <Loading />
            </DashboardLayout>
        );
    }

    if (brandError || equipmentError) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser}>
                <div className="text-center text-red-500 py-8">
                    {equipmentError.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Manajemen Alat"
            user={currentUser}
            header="Manajemen Alat"
        >
            <ManagedDataTable
                data={equipments}
                columns={columns}
                editFields={editEquipmentFields(brands)}
                createUrl="admin.tools.equipment.create"
                editUrl="admin.tools.equipment.update"
                deleteUrl="admin.tools.equipment.destroy"
                showFilter={true}
                filterColumn="status"
                filterOptions={filterData}
                editTitle="Edit Peralatan"
                deleteTitle="Hapus Peralatan"
            />
            <EquipmentDetailSheet data={selectedEquipment} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}