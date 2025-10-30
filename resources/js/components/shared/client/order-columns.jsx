import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { FileText, History } from "lucide-react";

const statusVariantMap = {
    Completed: "success",
    "In Progress": "warning",
    Pending: "info",
    Disapproved: "error",
    Approved: "approved",
    Received: "received",
};

const tipeVariantMap = {
    Eksternal: "warning",
    Internal: "info",
    Urgent: "error",
};

export const getOrdersColumns = () => [
    { accessorKey: "id", header: "Kode Pesanan" },
    { accessorKey: "title", header: "Judul Pesanan" },
    { accessorKey: "estimate_date", header: "Estimasi Selesai" },
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
            <div className="flex gap-2">
                <Button
                variant="outline"
                size="sm"
                >
                    <Link href="/client/order/details">
                        <FileText/>
                    </Link>
                </Button>
                <Button
                variant="outline"
                size="sm"
                >
                    <Link href="/client/order/history">
                        <History/>
                    </Link>
                </Button>
            </div>
        ),
    },
];
