import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusVariantMap = {
    Completed: "success",
    "In Progress": "warning",
    Pending: "info",
    Disapproved: "error",
    Approved: "approved",
    Received: "received",
};

const tipeVariantMap = {
    Eksternal: "warning",
    Internal: "info",
    Urgent: "error",
};

export const getOrdersColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "user", header: "User" },
    { accessorKey: "title", header: "Judul Analisis" },
    { accessorKey: "estimasi", header: "Estimasi Selesai" },
    { accessorKey: "report_issued_at", header: "Tanggal Laporan" },
    {
        accessorKey: "tipe",
        header: "Tipe Order",
        cell: ({ row }) => {
            const value = row.tipe;
            return (
                <Badge
                    variant={tipeVariantMap[value] || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const value = row.status;
            return (
                <Badge variant={statusVariantMap[value] || "outline"}>
                    {value}
                </Badge>
            );
        },
    },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
            <Button
                variant="outline"
                size="sm"
                onClick={() => onShowDetail(row)}
            >
                Detail
            </Button>
        ),
    },
];
