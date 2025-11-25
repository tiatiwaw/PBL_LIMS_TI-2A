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
import ActionSupervisorDialog from "@/components/shared/dialog/action-supervisor-dialog";

export default function DetailOrder({ canValidate }) {
    const { props } = usePage();
    const { id } = props;

    const { data: order, isLoading, update, error } = useOrder(id);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSampleId, setSelectedSampleId] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        action: "",
        title: "",
        description: "",
        data: {},
    });

    const handleUpdate = async (formData) => {
        try {
            setIsValidating(true);
            await update.mutateAsync(formData);
            setIsValidating(false);
        } catch (error) {
            console.error("Update failed:", error);
            setIsValidating(false);
        }
    };
    const handleValidation = async (actionType) => {
        try {
            setIsValidating(true);

            // Handle berbagai action type
            switch (actionType) {
                case VALIDATION_ACTION_TYPES.ACCEPT:
                    setDialogConfig({
                        action: "confirm",
                        title: `Konfirmasi Order ${order.title}`,
                        description: "Yakin ingin mengkonfirmasi order ini?.",
                        data: {
                            action: "approve",
                            reason: "Menunggu Pembayaran dari Klien.",
                        },
                    });
                    setOpenDialog(true);
                    setIsValidating(false);
                    break;

                case VALIDATION_ACTION_TYPES.REJECT:
                    setDialogConfig({
                        action: "reject",
                        title: `Tolak Order ${order.title}`,
                        description: "Masukkan alasan penolakan order",
                        data: {
                            action: "reject",
                        },
                    });
                    setOpenDialog(true);
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
                    setDialogConfig({
                        action: "confirm",
                        title: "Validasi Hasil Test",
                        description:
                            "Apakah Anda yakin ingin memvalidasi hasil test ini?",
                        data: {
                            action: "validate_test",
                        },
                    });
                    setOpenDialog(true);
                    setIsValidating(false);
                    break;

                case VALIDATION_ACTION_TYPES.REPEAT_TEST:
                    // Repeat test - ubah status menjadi in_progress
                    setDialogConfig({
                        action: "Warning",
                        title: "Ulangi Test",
                        description: "Test akan dijalankan kembali. Lanjutkan?",
                        data: {
                            action: "repeat_test",
                        },
                    });
                    setOpenDialog(true);
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

    const handleDialogConfirm = (data) => {
        handleUpdate(data);
        setOpenDialog(false);
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

                <ActionSupervisorDialog
                    action={dialogConfig.action}
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                    data={dialogConfig.data}
                    title={dialogConfig.title}
                    description={dialogConfig.description}
                    onConfirm={handleDialogConfirm}
                />
            </div>
        </DashboardLayout>
    );
}
