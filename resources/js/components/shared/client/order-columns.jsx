import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getOrderStatusLabel, getOrderStatusVariant } from "@/utils/statusUtils";
import { CreditCard, FileText, Download, History } from "lucide-react";

export const getOrdersColumns = ({
    onShowDetail,
    onShowHistory,
    onPayment,
    onDownload,
}) => [
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
                <Badge variant={getOrderStatusVariant(value) || "outline"}>
                    {getOrderStatusLabel(value) || value}
                </Badge>
            );
        },
    },

    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => {
            const status = row.status;

            const paymentStatuses = ["pending_payment"];
            const isPaymentOnly = paymentStatuses.includes(status);

            const canDownload = row.report_file_path !== null;

            return (
                <TooltipProvider>
                  <div className="flex gap-2">
                    {isPaymentOnly && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPayment(row)}
                                className="p-2"
                            >
                                <CreditCard size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Lakukan Pembayaran</p>
                          </TooltipContent>
                        </Tooltip>
                    )}

                    {!isPaymentOnly && (
                        <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onShowDetail(row)}
                                    className="p-2"
                                >
                                    <FileText size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Detail Pesanan</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onShowHistory(row)}
                                    className="p-2"
                                >
                                    <History size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Riwayat Status</p>
                              </TooltipContent>
                            </Tooltip>

                            {status !== "received" && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={!canDownload}
                                        onClick={() =>
                                            canDownload && onDownload(row)
                                        }
                                        className="p-2"
                                    >
                                        <Download size={16} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{canDownload ? "Unduh Laporan" : "Laporan belum tersedia"}</p>
                                  </TooltipContent>
                                </Tooltip>
                            )}
                        </>
                    )}
                  </div>
                </TooltipProvider>
            );
        },
    },
];
