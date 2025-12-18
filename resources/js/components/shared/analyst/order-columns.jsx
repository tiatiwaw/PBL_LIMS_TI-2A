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
            const dateString = row.estimate_date;
            if (!dateString) return "-";

            const targetDate = new Date(dateString);
            const today = new Date();

            const formattedDate = new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(targetDate);

            const start = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
            const end = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
            
            const diffInMs = end - start;
            const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

            let timeInfo = "";
            if (diffInDays === 0) {
                timeInfo = "hari ini";
            } else if (diffInDays > 0) {
                timeInfo = `${diffInDays} hari lagi`;
            } else {
                timeInfo = `${Math.abs(diffInDays)} hari yang lalu`;
            }

            return (
                <div class="flex flex-col">
                    <span>{formattedDate}</span>
                    <span className="text-gray-500">
                        ({timeInfo})
                    </span>
                </div>
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
