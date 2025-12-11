import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Clock,
    ShoppingCart,
    FileText,
    DollarSign,
    Download,
    ArrowLeft,
} from "lucide-react";
import { getOrderTypeVariant } from "@/utils/statusUtils";
import { formatDate, formatCurrency } from "@/utils/formatters";
import { authService } from "@/services/authService";
import { toast } from "sonner";

export default function OrderDetailHeader({ order, backRoute }) {
    if (!order) {
        return null;
    }

    const handleDownloadReport = async () => {
        try {
            const response = await authService.downloadReport(order.id);
            
            const url = window.URL.createObjectURL(response.data);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Laporan_${order.order_number}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success("Laporan berhasil diunduh!");
        } catch (error) {
            // Jika error response adalah JSON (error case)
            let errorMessage = "Terjadi kesalahan saat mengunduh laporan.";
            
            if (error.response?.data) {
                // Jika response data adalah blob, coba parse sebagai JSON
                if (error.response.data instanceof Blob) {
                    try {
                        const text = await error.response.data.text();
                        const jsonError = JSON.parse(text);
                        errorMessage = jsonError.message || errorMessage;
                    } catch (e) {
                        // Jika bukan JSON, gunakan error generic
                        errorMessage = "File tidak dapat diunduh.";
                    }
                } else {
                    // Jika response data bukan blob
                    errorMessage = error.response.data.message || errorMessage;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            toast.error(errorMessage);
        }
    };

    const handleBack = () => {
        if (backRoute) {
            window.location.href = backRoute;
        }
    };

    const totalPrice = (order.analyses_methods || []).reduce(
        (sum, method) => sum + (method?.pivot?.price || 0),
        0
    );
    return (
        <div className="bg-primary-hijauTua rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">
                                {order.title}
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-teal-100 text-sm">
                                    Order #{order.order_number}
                                </p>
                                <Badge
                                    variant={
                                        getOrderTypeVariant(order.order_type) ||
                                        "outline"
                                    }
                                    className="capitalize"
                                >
                                    {order.order_type}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {backRoute && (
                        <Button
                            onClick={handleBack}
                            variant="outline"
                            className="bg-primary-hijauTerang text-primary-hijauTua hover:bg-primary-hijauTerang/80 flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Button>
                    )}
                    {order.status === "completed" && (
                        <Button
                            onClick={handleDownloadReport}
                            className="bg-primary-hijauTerang text-primary-hijauTua hover:bg-primary-hijauTerang/80 flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download Laporan
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm text-teal-100">
                            Tanggal Order
                        </span>
                    </div>
                    <p className="font-bold text-lg">
                        {formatDate(order.order_date)}
                    </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm text-teal-100">
                            Estimasi Selesai
                        </span>
                    </div>
                    <p className="font-bold text-lg">
                        {formatDate(order.estimate_date)}
                    </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm text-teal-100">
                            Laporan Terbit
                        </span>
                    </div>
                    <p className="font-bold text-lg">
                        {formatDate(order.report_issued_at)}
                    </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm text-teal-100">
                            Total Biaya
                        </span>
                    </div>
                    <p className="font-bold text-lg">
                        {formatCurrency(totalPrice)}
                    </p>
                </div>
            </div>
        </div>
    );
}
