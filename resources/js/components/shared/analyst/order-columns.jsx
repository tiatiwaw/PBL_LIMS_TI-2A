import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { AlertCircle } from "lucide-react";

const statusVariantMap = {
    Completed: "success",
    "In Progress": "warning",
    Pending: "info",
    Disapproved: "error",
    Approved: "approved",
    Received: "received",
};

const tipeVariantMap = {
    External: "warning",
    Internal: "info",
    Urgent: "error",
    Regular: "info",
};

export const getOrdersColumns = () => [
    { accessorKey: "order_number", header: "Kode Pesanan" },
    { accessorKey: "title", header: "Judul Pesanan" },
    { accessorKey: "estimate_date", header: "Estimasi Selesai" },
    {
        accessorKey: "tipe",
        header: "Tipe Pesanan",
        cell: ({ row }) => {
            const value = row.order_type;
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
            <Link href={`/analyst/order/${row.id}`}>
                <Button
                variant="outline"
                size="sm"
                >
                    <AlertCircle/>
                </Button>
            </Link>
        ),
    },
];
