import { Badge } from "@/components/ui/badge";
import {
    getOrderStatusLabel,
    getOrderStatusVariant,
    getOrderTypeVariant,
} from "@/utils/statusUtils";
import { Copy, ListFilter } from "lucide-react";

export const getReportsColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    {
        accessorKey: "sample",
        header: (
            <div className="flex items-center gap-2">
                Sample
                <ListFilter size={16} />
            </div>
        ),
    },
    {
        accessorKey: "client",
        header: (
            <div className="flex items-center gap-2">
                Client
                <ListFilter size={16} />
            </div>
        ),
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
                <Badge
                    variant={getOrderStatusVariant(value)}
                    className="capitalize"
                >
                    {getOrderStatusLabel(value)}
                </Badge>
            );
        },
    },
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
