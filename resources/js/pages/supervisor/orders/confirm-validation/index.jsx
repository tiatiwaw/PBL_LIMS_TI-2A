import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ReportPreview from "@/components/shared/order/report-preview";
import Loading from "@/components/ui/loading";
import { usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useOrder } from "@/hooks/useSupervisor";
import axios from "axios";
import {
    getOrderStatusLabel,
    getOrderStatusVariant,
} from "@/utils/statusUtils";
import { Badge } from "@/components/ui/badge";

export default function ConfirmValidation() {
    const { props } = usePage();
    const { id } = props;

    const { data: order, isLoading } = useOrder(id);
    const [reportData, setReportData] = useState(null);
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reportLoading, setReportLoading] = useState(false);

    useEffect(() => {
        if (order) {
            generateReportData();
        }
    }, [order]);

    const generateReportData = () => {
        if (!order?.samples) {
            setReportData([]);
            return;
        }

        try {
            const data = order.samples.map((sample) => {
                const parameters = [];

                // Parameters can be either an array or a single object
                let nParams = sample.n_parameter_methods;

                // If it's a single object, convert to array
                if (nParams && !Array.isArray(nParams)) {
                    nParams = [nParams];
                }

                // Parameters are nested in n_parameter_methods
                if (nParams && Array.isArray(nParams) && nParams.length > 0) {
                    nParams.forEach((nParam) => {
                        parameters.push({
                            parameter_name: nParam.test_parameters?.name ?? "-",
                            unit:
                                nParam.test_parameters?.unit_values?.value ??
                                "-",
                            quality:
                                nParam.test_parameters?.quality_standard ?? "-",
                            reference:
                                nParam.test_methods?.reference_standards
                                    ?.name ?? "-",
                            result: nParam.result ?? "-",
                        });
                    });
                }

                return {
                    sample: sample.name,
                    parameters: parameters,
                };
            });

            setReportData(data);
        } catch (error) {
            console.error("Error generating report data:", error);
            toast.error("Gagal membuat preview laporan");
            setReportData([]);
        }
    };

    const handleSubmit = async () => {
        if (!notes.trim()) {
            toast.warning("Catatan harus diisi");
            return;
        }

        try {
            setIsSubmitting(true);

            // Call API untuk submit validation
            const response = await axios.post(
                `/api/v1/supervisor/orders/follow-up/${id}/validation/submit`,
                {
                    notes: notes,
                    action: "validate_test",
                }
            );

            if (response.data.success) {
                toast.success("Validasi test berhasil dikirim");
                setTimeout(() => {
                    router.visit(route("supervisor.order.detail", id));
                }, 1500);
            } else {
                toast.error(response.data.message || "Gagal mengirim validasi");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(
                error.response?.data?.message ||
                    "Terjadi kesalahan saat mengirim validasi"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout title="Konfirmasi Validasi">
                <Loading />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Konfirmasi Validasi Test"
            header="Konfirmasi Validasi Test"
        >
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Order Info */}
                <Card>
                    <CardHeader className="bg-gray-50 border-b">
                        <CardTitle>Informasi Order</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Nomor Order
                                </p>
                                <p className="font-semibold text-lg">
                                    {order?.order_number}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Klien</p>
                                <p className="font-semibold text-lg">
                                    {order?.clients?.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Status</p>
                                <p className="font-semibold text-lg capitalize">
                                    <Badge
                                        variant={getOrderStatusVariant(
                                            order?.status
                                        )}
                                    >
                                        {getOrderStatusLabel(order?.status)}
                                    </Badge>
                                    {/* {order?.status} */}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Report Preview */}
                <Card>
                    <CardHeader className="bg-gray-50 border-b">
                        <CardTitle>Preview Laporan Hasil Uji</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ReportPreview
                            reportData={reportData}
                            analyst={order?.analysts?.[0]?.users}
                            supervisor={order?.supervisors}
                            manager={null}
                        />
                    </CardContent>
                </Card>

                {/* Notes Section */}
                <Card>
                    <CardHeader className="bg-gray-50 border-b">
                        <CardTitle>Catatan Supervisor</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <Label htmlFor="notes">
                                Tambahkan catatan (wajib diisi)
                            </Label>
                            <Textarea
                                id="notes"
                                placeholder="Masukkan catatan validasi hasil test..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="min-h-[120px]"
                                disabled={isSubmitting}
                            />
                            <p className="text-xs text-gray-500">
                                Catatan akan digunakan sebagai referensi untuk
                                dokumentasi
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 py-6 border-t">
                    <Button
                        variant="outline"
                        onClick={() =>
                            router.visit(route("supervisor.order.detail", id))
                        }
                        disabled={isSubmitting}
                    >
                        Batal
                    </Button>
                    <Button
                        className="bg-primary-hijauTua hover:bg-primary-hijauTua/85"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Mengirim..." : "Kirim Validasi"}
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
