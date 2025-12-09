import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    getOrderStatusLabel,
    getOrderStatusVariant,
    getOrderTypeVariant,
} from "@/utils/statusUtils";

export const getOrdersColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "order_number", header: "No. Order" },
    { accessorKey: "title", header: "Judul Analisis" },
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
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
            <button
                onClick={() => onShowDetail(row.id)}
                w
                className="px-3 py-1 rounded-lg border"
            >
                Detail
            </button>
        ),
    },
];
