import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getBrandsColumns } from "@/components/shared/admin/tool-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { brands } from "@/data/admin/tools";
import { editBrandFields } from "@/utils/fields/admin";
import { useMemo } from "react";

export default function BrandsPage({ auth, brandsData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = brandsData || brands;

    const columns = useMemo(() => getBrandsColumns(), []);

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
                editUrl="admin.test.standard.update"
                deleteUrl="admin.test.standard.destroy"
                searchColumn="name"
                editTitle="Edit Pengguna"
                deleteTitle="Hapus Pengguna"
            />
        </DashboardLayout>
    );
}