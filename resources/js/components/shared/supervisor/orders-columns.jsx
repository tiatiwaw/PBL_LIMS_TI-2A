import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatters";
import { getOrderTypeLabel, getOrderTypeVariant } from "@/utils/statusUtils";

export const getOrdersColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "order_number", header: "No. Order" },
    { accessorKey: "title", header: "Judul Order" },
    {
        accessorKey: "clients.name",
        header: "Klien",
        cell: ({ row }) => {
            return row.clients.name;
        },
    },
    {
        accessorKey: "order_type",
        header: "Tipe Order",
        cell: ({ row }) => {
            const value = row.order_type;
            return (
                <Badge
                    variant={getOrderTypeVariant(value)}
                    className="capitalize"
                >
                    {getOrderTypeLabel(value)}
                </Badge>
            );
        },
    },
    {
        accessorKey: "order_date",
        header: "Tanggal Order",
        cell: ({ row }) => formatDate(row.order_date),
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
