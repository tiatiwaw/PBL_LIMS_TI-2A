import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSuppliersColumns } from "@/components/shared/admin/material-columns";
import SupplierDetailSheet from "@/components/shared/sheet/supplier-detail-sheet";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { suppliers } from "@/data/admin/materials";
import { editSupplierFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function SuppliersPage({ auth, suppliersData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    
    const handleShowDetail = (materials) => {
            setSelectedSupplier(materials);
            setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = suppliersData || suppliers;

    const columns = useMemo(() => getSuppliersColumns({ onShowDetail: handleShowDetail }), []);
    
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
            title="Manajemen Pemasok Reagent"
            user={currentUser}
            header="Manajemen Pemasok Reagent"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editSupplierFields}
                onCreate={handleCreate}
                onDelete={handleDelete}
                onEdit={handleEdit}
                createUrl="admin.materials.supplier.create"
                editUrl="admin.materials.supplier.update"
                deleteUrl="admin.materials.supplier.destroy"
                editTitle="Edit Pemasok"
                deleteTitle="Hapus Pemasok"
            />
        <SupplierDetailSheet data={selectedSupplier} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}
