import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
    ClientInfoCard,
    OrderDetailHeader,
    SampleSelector,
    AnalysisMethodCard,
    NotesCard,
    SampleInfoCard,
    OrderValidation,
} from "@/components/shared/order/detail";
import Loading from "@/components/ui/loading";
import { usePage, router } from "@inertiajs/react";
import { useOrder } from "@/hooks/useSupervisor";
import { VALIDATION_ACTION_TYPES } from "@/utils/constant/validation";
import { toast } from "sonner";

export default function DetailOrder({ canValidate }) {
    const { props } = usePage();
    const { id } = props;

    const { data: order, isLoading, error } = useOrder(id);

    const [selectedSampleId, setSelectedSampleId] = useState(null);
    const [isValidating, setIsValidating] = useState(false);

    const handleValidation = async (actionType) => {
        try {
            setIsValidating(true);

            // Handle berbagai action type
            switch (actionType) {
                case VALIDATION_ACTION_TYPES.ACCEPT:
                    // Accept order - ubah status menjadi pending_payment
                    // router.post(
                    //     `/supervisor/orders/${id}/validate`,
                    //     {
                    //         action: "accept",
                    //     },
                    //     {
                    //         onSuccess: () => {
                    //             toast.success("Order berhasil diterima");
                    //             setIsValidating(false);
                    //         },
                    //         onError: (errors) => {
                    //             toast.error(
                    //                 errors.message || "Gagal menerima order"
                    //             );
                    //             setIsValidating(false);
                    //         },
                    //     }
                    // );
                    console.log(actionType);
                    setIsValidating(false);
                    break;

                case VALIDATION_ACTION_TYPES.REJECT:
                    // Reject order - ubah status menjadi disapproved
                    // router.post(
                    //     `/supervisor/orders/${id}/validate`,
                    //     {
                    //         action: "reject",
                    //     },
                    //     {
                    //         onSuccess: () => {
                    //             toast.success("Order berhasil ditolak");
                    //             setIsValidating(false);
                    //         },
                    //         onError: (errors) => {
                    //             toast.error(
                    //                 errors.message || "Gagal menolak order"
                    //             );
                    //             setIsValidating(false);
                    //         },
                    //     }
                    // );
                    console.log(actionType);
                    setIsValidating(false);
                    break;

                case VALIDATION_ACTION_TYPES.FILL_PARAMETERS:
                    // Fill parameters - redirect ke parameter page
                    router.visit(
                        route("supervisor.order.parameter.index", id),
                        {},
                        {
                            onError: () => {
                                toast.error("Gagal membuka halaman parameter");
                                setIsValidating(false);
                            },
                        }
                    );
                    break;

                case VALIDATION_ACTION_TYPES.VALIDATE_TEST:
                    // Validate test - ubah status menjadi pending
                    // router.post(
                    //     `/supervisor/orders/${id}/validate`,
                    //     {
                    //         action: "validate_test",
                    //     },
                    //     {
                    //         onSuccess: () => {
                    //             toast.success("Hasil test berhasil divalidasi");
                    //             setIsValidating(false);
                    //         },
                    //         onError: (errors) => {
                    //             toast.error(
                    //                 errors.message ||
                    //                     "Gagal memvalidasi hasil test"
                    //             );
                    //             setIsValidating(false);
                    //         },
                    //     }
                    // );
                    console.log(actionType);
                    setIsValidating(false);
                    break;

                case VALIDATION_ACTION_TYPES.REPEAT_TEST:
                    // Repeat test - ubah status menjadi in_progress
                    // router.post(
                    //     `/supervisor/orders/${id}/validate`,
                    //     {
                    //         action: "repeat_test",
                    //     },
                    //     {
                    //         onSuccess: () => {
                    //             toast.success("Test pengulangan dimulai");
                    //             setIsValidating(false);
                    //         },
                    //         onError: (errors) => {
                    //             toast.error(
                    //                 errors.message ||
                    //                     "Gagal memulai test pengulangan"
                    //             );
                    //             setIsValidating(false);
                    //         },
                    //     }
                    // );
                    console.log(actionType);
                    setIsValidating(false);
                    break;

                default:
                    toast.error("Action tidak dikenali");
                    setIsValidating(false);
            }
        } catch (err) {
            console.error("Validation error:", err);
            toast.error("Terjadi kesalahan saat memproses validasi");
            setIsValidating(false);
        }
    };

    useEffect(() => {
        if (
            order &&
            order.samples &&
            order.samples.length > 0 &&
            selectedSampleId === null
        ) {
            setSelectedSampleId(order.samples[0].id.toString());
        }
    }, [order, selectedSampleId]);

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Admin">
                <Loading />
            </DashboardLayout>
        );
    }

    const selectedSample = order?.samples?.find(
        (sample) => sample.id.toString() === selectedSampleId
    );

    if (error) {
        return (
            <DashboardLayout title="Dashboard Admin">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Detail Order" header="Detail Order">
            <div className="max-w-7xl mx-auto space-y-6">
                <OrderDetailHeader order={order} />

                <ClientInfoCard client={order.clients} />

                <SampleSelector
                    samples={order.samples}
                    selectedSampleId={selectedSampleId}
                    onSampleChange={setSelectedSampleId}
                />

                {selectedSample && (
                    <div className="grid grid-cols-1 gap-6">
                        <SampleInfoCard sample={selectedSample} />
                    </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <AnalysisMethodCard
                        methods={order.analyses_methods}
                        reportIssuedAt={order.report_issued_at}
                        reportFilePath={order.report_file_path}
                        resultValue={order.result_value}
                    />
                    <NotesCard
                        notes={order.notes}
                        resultValue={order.result_value}
                    />
                </div>
                {canValidate && (
                    <OrderValidation
                        status={order.status}
                        onValidationAction={handleValidation}
                        isLoading={isValidating}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
