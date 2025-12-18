import { Badge } from "@/components/ui/badge";
import {
    getOrderStatusLabel,
    getOrderStatusVariant,
    getOrderTypeVariant,
} from "@/utils/statusUtils";

export const getOrdersColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "title", header: "Judul Order" },
    { accessorKey: "order_number", header: "No. Order" },
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
                className="
                    inline-flex items-center gap-2
                    px-4 py-1.5
                    rounded-xl
                    border border-slate-200
                    text-sm font-medium text-slate-700
                    bg-white
                    hover:bg-slate-100 hover:border-slate-300
                    active:scale-95
                    transition-all duration-200
                "
            >
                Detail
            </button>
        ),
    },
];
