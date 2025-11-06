import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOrderStatusLabel, getOrderStatusVariant, getOrderTypeLabel, getOrderTypeVariant } from "@/utils/statusHelpers";

export const getOrdersColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "order_number", header: "No. Order" },
    { accessorKey: "title", header: "Judul Analisis" },
    { accessorKey: "estimated_date", header: "Estimasi Selesai" },
    { accessorKey: "report_issued_at", header: "Tanggal Laporan" },
    {
        accessorKey: "order_type",
        header: "Tipe Order",
        cell: ({ row }) => {
            const value = row.order_type;
            return (
                <Badge
                    variant={getOrderTypeVariant(value)}
                >
                    {getOrderTypeLabel(value)}
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
                <Badge variant={getOrderStatusVariant(value)}>
                    {getOrderStatusLabel(value)}
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
