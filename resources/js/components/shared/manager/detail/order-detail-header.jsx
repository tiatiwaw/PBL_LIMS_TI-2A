import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    ArrowDown,
    Check,
    X,
    Calendar,
    Clock,
    ShoppingCart,
} from "lucide-react";
import {
    getStatusLabel,
    getOrderTypeVariant,
    getOrderStatusVariant,
} from "@/utils/statusUtils";
import { formatDate } from "@/utils/formatters";

export default function OrderDetailHeader({ order, canValidate, onValidate, onInvalidate }) {
    console.log(order);
    return (
        <div className="flex items-start">
            <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4 mb-2">
                    <h1 className="w-3/4 text-4xl font-bold text-primary-hijauTua">
                        {order.title}
                    </h1>
                    <div className="w-1/4 space-x-4 self-start mt-2">
                        <Badge variant={getOrderTypeVariant(order.order_type)} className="capitalize">
                            {order.order_type}
                        </Badge>
                        <Badge variant={getOrderStatusVariant(order.status)}>
                            {getStatusLabel(order.status)}
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                        <ShoppingCart className="w-4 h-4 text-teal-600" />
                        <span>
                            Order #{" "}
                            <span className="font-semibold text-primary-hijauTua">
                                {order.order_number}
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <span>
                            Tanggal Order:{" "}
                            <span className="font-semibold text-primary-hijauTua">
                                {formatDate(order.order_date)}
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span>
                            Estimasi Selesai:{" "}
                            <span className="font-semibold text-primary-hijauTua">
                                {formatDate(order.estimated_date)}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-x-3 gap-y-10">
                <div className="grid grid-cols-2 gap-3">
                    <Button className="flex items-center gap-2.5 py-2.5 bg-white text-primary-hijauTua font-semibold border border-primtext-primary-hijauTua rounded-lg shadow-sm hover:bg-primary-hijauTua hover:text-white transition-all">
                        <span>Download</span>
                        <ArrowDown className="w-5 h-5" />
                    </Button>
                    <Button className="flex items-center gap-2.5 py-2.5 bg-white text-primary-hijauTua font-semibold border border-primtext-primary-hijauTua rounded-lg shadow-sm hover:bg-primary-hijauTua hover:text-white transition-all">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Kembali</span>
                    </Button>
                </div>
                {canValidate && (
                    <div className="grid grid-cols-2 gap-3">
                        <Button onClick={onValidate} className="flex items-center gap-2.5 py-2.5 bg-green-500 text-white font-semibold border border-white rounded-lg shadow-sm hover:bg-green-600 transition-all">
                            <Check className="w-5 h-5" />
                            <span>Setuju</span>
                        </Button>
                        <Button onClick={onInvalidate} className="flex items-center gap-2.5 py-2.5 bg-red-500 text-white font-semibold border border-white rounded-lg shadow-sm hover:bg-red-700 transition-all">
                            <X className="w-5 h-5" />
                            <span>Tolak</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}