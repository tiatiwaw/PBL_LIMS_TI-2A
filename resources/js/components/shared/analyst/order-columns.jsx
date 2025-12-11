import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { AlertCircle } from "lucide-react";

const statusLabelMap = {
    received: "Received",
    disapproved: "Disapproved",
    pending_payment: "Pending Payment",
    paid: "Paid",
    in_progress: "In Progress",
    received_test: "Waiting for QC Result",
    revision_test: "Test Revision",
    pending: "Pending",
    completed: "Completed",
};

const statusVariantMap = {
    received: "info",        // Biru/Informasi (Baru masuk)
    disapproved: "error",    // Merah (Ditolak)
    pending_payment: "warning", // Kuning/Peringatan (Menunggu pembayaran)
    paid: "success",         // Hijau (Sudah Bayar)
    in_progress: "warning",  // Kuning/Peringatan (Sedang dikerjakan)
    received_test: "test",   // Varian khusus (Misalnya, ungu)
    revision_test: "revision", // Varian khusus (Misalnya, oranye tua)
    pending: "info",         // Biru/Informasi (Menunggu persetujuan/aksi)
    completed: "success",    // Hijau (Selesai)
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
