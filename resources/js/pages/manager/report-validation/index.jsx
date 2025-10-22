import { reportData } from "@/data/manager/report-validation";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import DataTable from "../../../components/shared/tabel/tabels";
import { Copy,ListFilter } from "lucide-react";


export default function ReportValidationPage() {
    const user = { name: "BIJI", role: "Manager" };

    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "sample", header:( 
                <div className="flex items-center gap-2">
                    Sample
                    <ListFilter size={16} />
                </div>
        ) },
        { accessorKey: "client", header: (
            <div className="flex items-center gap-2">
                Client
                <ListFilter size={16} />
            </div>
        ) },
        { accessorKey: "analis", header: (
            <div className="flex items-center gap-2">
                Analis
                <ListFilter size={16} />
            </div>
        ) },
        {
            accessorKey: "report",
            header: "Report",
            cell: ({ row }) => (
                <button className="flex items-center gap-1.5 text-xs bg-primary-hijauMuda hover:bg-primary-hijauTua text-white px-3 py-1.5 rounded-md font-semibold">
                    File <Copy size={12} />
                </button>
            ),
        },
        {
            accessorKey: "aksi",
            header: "Aksi",
            cell: ({ row }) => (
                <button className="text-xs bg-primary-hijauMuda hover:bg-primary-hijauTua text-white px-4 py-1.5 rounded-md font-semibold">
                    Detail
                </button>
            ),
        },
    ];

    return (
        <DashboardLayout
            title="Validasi Laporan"
            user={user}
            header="Validasi Laporan"
        >
            <DataTable
                columns={columns}
                data={reportData}
                showSearch={true}
                showFilter={false}
            />
        </DashboardLayout>
    );
}
