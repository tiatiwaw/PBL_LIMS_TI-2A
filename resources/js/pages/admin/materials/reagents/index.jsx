import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getReagentsColumns } from "@/components/shared/admin/material-columns";
import ReagentsDetailSheet from "@/components/shared/sheet/reagen_detail_sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useReagents } from "@/hooks/useReageants";
import { useSuppliers } from "@/hooks/useSupplier";
import { useGrades } from "@/hooks/useGrade";
import { editReagentFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function ReagentsPage({ auth, reagentsData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReagents, setSelectedReagents] = useState(null);
    
    const handleShowDetail = (materials) => {
            setSelectedReagents(materials);
            setIsOpen(true);
    };

    const { grades, isLoading: gradesLoading, error: gradesError } = useGrades();
    const { suppliers, isLoading: suppliersLoading, error: suppliersError } = useSuppliers();

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const { reagents, isLoading: regeantsLoading, error: regeantsError } = useReagents();

    const columns = useMemo(() => getReagentsColumns({ onShowDetail: handleShowDetail }), []);

    const handleCreate = async (formData) => {
    console.log("Create data:", formData);
    };

    const handleEdit = async (id, formData) => {
        console.log("Edit ID:", id);
        console.log("Data:", formData);
    };

    const handleDelete = async (id) => {
        console.log("Delete ID:", id);
        console.log("Data:", formData);
    };



    return (
        <DashboardLayout
            title="Manajemen Reagen"
            user={currentUser}
            header="Manajemen Reagen"
        >
            <ManagedDataTable
                data={reagents}
                columns={columns}
                editFields={editReagentFields(suppliers, grades)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                createUrl="admin.materials.reagent.create"
                editUrl="admin.materials.reagent.update"
                onCreate={handleCreate}
                deleteUrl="admin.materials.reagent.destroy"
                editTitle="Edit Reagent"
                deleteTitle="Hapus Reagent"
            />
        <ReagentsDetailSheet data={selectedReagents} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}