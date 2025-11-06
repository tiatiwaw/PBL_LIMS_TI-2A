import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSuppliersColumns } from "@/components/shared/admin/material-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { suppliers } from "@/data/admin/materials";
import { editSupplierFields } from "@/utils/fields/admin";
import { useMemo } from "react";

export default function SuppliersPage({ auth, suppliersData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = suppliersData || suppliers;

    const columns = useMemo(() => getSuppliersColumns(), []);

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
                editUrl="admin.materials.supplier.update"
                deleteUrl="admin.materials.supplier.destroy"
                searchColumn="name"
                editTitle="Edit Pemasok"
                deleteTitle="Hapus Pemasok"
            />
        </DashboardLayout>
    );
}
