import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSamplesColumns } from "@/components/shared/admin/sample-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { samples } from "@/data/admin/sample";
import { editSampleFields } from "@/utils/fields/admin";
import { useMemo } from "react";

export default function SamplesPage({ auth, samplesData }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = samplesData || samples;

    const columns = useMemo(() => getSamplesColumns(), []);

    return (
        <DashboardLayout
            title="Manajemen Sample"
            user={currentUser}
            header="Manajemen Sample"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editSampleFields}
                editUrl="admin.sampling.sample.update"
                deleteUrl="admin.sampling.sample.destroy"
                searchColumn="name"
                editTitle="Edit Sampel"
                deleteTitle="Hapus Sampel"
            />
        </DashboardLayout>
    );
}