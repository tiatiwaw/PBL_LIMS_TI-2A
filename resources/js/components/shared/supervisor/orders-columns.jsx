import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatters";
import {
    getOrderStatusLabel,
    getOrderStatusVariant,
    getOrderTypeVariant,
} from "@/utils/statusUtils";

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
                <Badge variant={getOrderStatusVariant(value)}>
                    {getOrderStatusLabel(value)}
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
        cell: ({ row }) => {
            let label = "";

            switch (row.status) {
                case "received":
                    label = "Detail";
                    break;
                case "paid":
                    label = "Isi Data";
                    break;
                case "received_test":
                    label = "QC";
                    break;
                default:
                    label = "Detail";
            }

            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onShowDetail(row)}
                >
                    {label}
                </Button>
            );
        },
    },
];
