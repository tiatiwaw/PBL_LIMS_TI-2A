import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { AlertCircle } from "lucide-react";

const statusLabelMap = {
    completed: "Completed",
    in_progress: "In Progress",
    pending: "Pending",
    disapproved: "Disapproved",
    approved: "Approved",
    received: "Received",
};

const statusVariantMap = {
    completed: "success",
    in_progress: "warning",
    pending: "info",
    disapproved: "error",
    approved: "approved",
    received: "received",
};

const tipeVariantMap = {
    external: "warning",
    internal: "info",
    urgent: "error",
    regular: "secondary",
};

const tipeLabelMap = {
    external: "External",
    internal: "Internal",
    urgent: "Urgent",
    regular: "Regular",
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
                >
                    {tipeLabelMap[value]}
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
                    variant={statusVariantMap[value] || "outline"}
                >
                    {statusLabelMap[value]}
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
