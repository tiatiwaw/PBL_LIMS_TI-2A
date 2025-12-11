import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Download, History } from "lucide-react";

const statusVariantMap = {
    completed: "success",
    in_progress: "warning",
    pending: "info",
    disapproved: "error",
    approved: "approved",
    received: "received",
    pending_payment: "warning",
    paid: "success",
    received_test: "info",
    revision_test: "warning",
};

const statusLabelMap = {
    completed: "Selesai",
    in_progress: "Dalam Proses",
    pending: "Menunggu",
    disapproved: "Ditolak",
    approved: "Disetujui",
    received: "Diterima",
    pending_payment: "Menunggu Pembayaran",
    paid: "Sudah Dibayar",
    received_test: "Sampel Diterima",
    revision_test: "Revisi Pengujian",
};


export const getOrdersColumns = ({ onShowDetail, onShowHistory, onPayment, onDownload }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "order_number", header: "Kode Pesanan" },
    { accessorKey: "title", header: "Judul Pesanan" },
    { accessorKey: "estimate_date", header: "Estimasi Selesai" },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const value = row.status;
            return (
                <Badge variant={statusVariantMap[value] || "outline"}>
                    {statusLabelMap[value] || value}
                </Badge>
            );
        },
    },

    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => {
            const status = row.status;

            const paymentStatuses = ["received", "pending_payment"];
            const isPaymentOnly = paymentStatuses.includes(status);

            const canDownload = row.report_file_path !== null;

            return (
                <div className="flex gap-2">

                    {isPaymentOnly && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPayment(row)}
                            className="p-2"
                        >
                            <CreditCard size={16} />
                        </Button>
                    )}

                    {!isPaymentOnly && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onShowDetail(row)}
                                className="p-2"
                            >
                                <FileText size={16} />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onShowHistory(row)}
                                className="p-2"
                            >
                                <History size={16} />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!canDownload}
                                onClick={() => canDownload && onDownload(row)}
                                className="p-2"
                            >
                                <Download size={16} />
                            </Button>
                        </>
                    )}

                </div>
            );
        },
    },
];
