import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { getOrderStatusLabel, getOrderStatusVariant, getOrderTypeVariant } from "@/utils/statusUtils";
import { Link } from '@inertiajs/react';
import { AlertCircle } from "lucide-react";

export const getOrdersColumns = () => [
    { accessorKey: "order_number", header: "Kode Pesanan" },
    { accessorKey: "title", header: "Judul Pesanan" },,
    {
        accessorKey: "estimate_date",
        header: "Estimasi Selesai",
        cell: ({ row }) => {
            const value = row.estimate_date;
            return (
                <>
                    {value}
                </>
            );
        },
    },
    {
        accessorKey: "tipe",
        header: "Tipe Pesanan",
        cell: ({ row }) => {
            const value = row.order_type;
            return (
                <Badge
                    variant={getOrderTypeVariant(value) || "outline"}
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
                    variant={getOrderStatusVariant(value) || "outline"}
                >
                    {getOrderStatusLabel(value)}
                </Badge>
            );
        },
    },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href={`/analyst/order/${row.id}`}>
                            <Button
                            variant="outline"
                            size="sm"
                            >
                                <AlertCircle/>
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Detail Order</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ),
    },
];
