import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { FileText, History } from "lucide-react";

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
    reguler: "Secondary",
};

export const getOrdersColumns = ({setSelectedTest}) => [
    { accessorKey: "order_number", header: "Kode Pesanan" },
    { accessorKey: "title", header: "Judul Pesanan" },
    { accessorKey: "estimate_date", header: "Estimasi Selesai" },
    {
        accessorKey: "order_type",
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
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
            <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedTest(row)}
            >
                Terima
            </Button>
        ),
    },
];
