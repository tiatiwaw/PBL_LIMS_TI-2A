import { useUnits } from "@/hooks/useAdminUnits";
import Loading from "@/components/ui/loading"; 
import { useAuth } from "@/hooks/useAuth"; 
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getUnitsColumns } from "@/components/shared/admin/test-columns";
import UnitDetailSheet from "@/components/shared/sheet/unit-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { units } from "@/data/admin/tests";
import { editUnitFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function UnitsPage({ auth, unitsData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);
        
    const handleShowDetail = (tests) => {
            setSelectedUnit(tests);
            setIsOpen(true);
    };
    

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = unitsData || units;

    const columns = useMemo(() => getUnitsColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout
            title="Manajemen Nilai Unit"
            user={currentUser}
            header="Manajemen Nilai Unit"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editUnitFields}
                createUrl="admin.test.unit.create"
                editUrl="admin.test.unit.update"
                deleteUrl="admin.test.unit.destroy"
                editTitle="Edit Nilai Satuan"
                deleteTitle="Hapus Nilai Satuan"
            />
        <UnitDetailSheet data={selectedUnit} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}