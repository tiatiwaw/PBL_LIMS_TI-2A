import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOrderTypeVariant } from "@/utils/statusUtils";
import { Link } from '@inertiajs/react';
import { FileText, History } from "lucide-react";

export const getOrdersColumns = ({setSelectedTest}) => [
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
                    variant={getOrderTypeVariant(value) || "outline"}
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
