import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mapping warna untuk STATUS
const statusVariantMap = {
    pending: "warning",
    received: "info",
    inprogress: "info",
    completed: "success",
    disapproved: "error",
    approved: "approved",
};

// Mapping warna untuk ORDER TYPE
const orderTypeVariantMap = {
    internal: "success",
    external: "info",
    regular: "warning",
    urgent: "error",
};

export const getOrderColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "title", header: "Judul Order" },
    { accessorKey: "estimate_date", header: "Estimasi Selesai" },

    // Kolom order_type dengan badge
    {
        accessorKey: "order_type",
        header: "Tipe Order",
        cell: ({ row }) => {
            const value = row.order_type;
            return (
                <Badge
                    variant={
                        orderTypeVariantMap[value?.toLowerCase()] || "outline"
                    }
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },

    // Kolom status dengan badge
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const value = row.status;
            return (
                <Badge
                    variant={
                        statusVariantMap[value?.toLowerCase()] || "outline"
                    }
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },

    {
        accessorKey: "select",
        header: "Aksi",
        cell: ({ row }) => {
            const data = row;
            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onShowDetail(data)}
                >
                    Detail
                </Button>
            );
        },
    },
];
