import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getEquipmentsColumns } from "@/components/shared/manager/tool-columns";
import EquipmentDetailSheet from "@/components/shared/sheet/equipment-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useEquipments } from "@/hooks/useManager";
import { exportEquipmentReportPDF } from "@/utils/pdf/export/tools-export";
import { useMemo, useState } from "react";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "maintenance", label: "Maintenance" },
    { value: "broken", label: "Broken" },
];

export default function ManagerEquipmentsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    const {
        data: equipments,
        isLoading: equipmentLoading,
        error: equipmentError,
    } = useEquipments();

    const handleShowDetail = (equipment) => {
        setSelectedEquipment(equipment);
        setIsOpen(true);
    };

    const handleExport = () => exportEquipmentReportPDF(equipments);

    const columns = useMemo(
        () => getEquipmentsColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (equipmentLoading) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    if (equipmentError) {
        return (
            <DashboardLayout title="Dashboard Manager" header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {equipmentError.message ||
                        "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Alat" header="Manajemen Alat">
            <ManagedDataTable
                data={equipments}
                columns={columns}
                onExport={handleExport}
                showExport={true}
                showCreate={false}
                showFilter={true}
                filterColumn="status"
                filterOptions={filterData}
            />
            <EquipmentDetailSheet
                data={selectedEquipment}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </DashboardLayout>
    );
}
