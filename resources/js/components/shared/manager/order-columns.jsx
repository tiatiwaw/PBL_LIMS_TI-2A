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
        accessorKey: "samples",
        header: "Sample",
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
        accessorKey: "analysts",
        header: "Analis",
        cell: ({ row }) => row.original.analysts?.name || "-",
    },

    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
            <button
                onClick={() => onShowDetail(row.original.id)}
                w
                className="px-3 py-1 rounded-lg border"
            >
                Detail
            </button>
        ),
    },
];
