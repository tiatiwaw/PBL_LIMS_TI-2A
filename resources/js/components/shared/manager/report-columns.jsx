import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOrderStatusLabel, getOrderStatusVariant, getOrderTypeLabel, getOrderTypeVariant } from "@/utils/statusUtils";
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
        cell: ({ row }) => 
        {
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => 
        {
            const value = row.status;
            console.log(value);
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
            <Button
                variant="outline"
                size="sm"
                onClick={() => onShowDetail(row.id)}
            >
                Detail
            </Button>
        ),
    },
];
