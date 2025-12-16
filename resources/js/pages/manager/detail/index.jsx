import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
    OrderDetailHeader,
    ClientInfoCard,
    SampleSelector,
    SampleInfoCard,
    ParameterMethodCard,
    EquipmentCard,
    ReagentCard,
    AnalystTeamCard,
    AnalysisMethodCard,
    NotesCard,
    OrderValidation,
} from "@/components/shared/order/detail";

import Loading from "@/components/ui/loading";
import { usePage } from "@inertiajs/react";
import { useManagerOrder, useUpdateReportValidation } from "@/hooks/useManager";
import ActionSupervisorDialog from "@/components/shared/dialog/action-supervisor-dialog";
import { toast } from "sonner";

export default function ManagerDetailOrder() {
    const { id } = usePage().props;
    const { data: orderRes, isLoading, error } = useManagerOrder(id);
    const {
        update,
        isLoading: isLoadingUpdate,
        error: errorUpdate,
    } = useUpdateReportValidation();

    const order = orderRes?.data ?? null;

    const [selectedSampleId, setSelectedSampleId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        action: "",
        title: "",
        description: "",
        data: {},
    });

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

    const handleValidate = () => {
        setIsValidating(true);
        setDialogConfig({
            action: "confirm",
            title: `Validasi Order ${order.title}`,
            description: "Yakin ingin validasi order ini?.",
            data: {
                action: "validate",
                reason: `Order ${order.title} selesai di uji dan tervalidasi.`,
            },
        });
        setOpenDialog(true);
        setIsValidating(false);
    };

    const handleDialogConfirm = async (data) => {
        try {
            await update.mutateAsync({ id, data });
            setOpenDialog(false);
            window.location.href = `/manager/report-validations/${id}`;
        } catch (error) {
            toast.error(error.message || "Gagal Validasi Order");
        }
    };

    if (isLoading || isLoadingUpdate) {
        return (
            <DashboardLayout title="Detail Order" header="Detail Order">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error || errorUpdate) {
        return (
            <DashboardLayout title="Detail Order" header="Detail Order">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Gagal memuat detail order"}
                </div>
            </DashboardLayout>
        );
    }

    if (!order) {
        return (
            <DashboardLayout title="Detail Order" header="Detail Order">
                <div className="py-8 text-center">
                    Data order tidak ditemukan.
                </div>
            </DashboardLayout>
        );
    }

    const selectedSample = order.samples?.find(
        (sample) => sample.id.toString() === selectedSampleId
    );

    const safeAnalysts = Array.isArray(order.analysts)
        ? order.analysts.filter((item) => item && typeof item === "object")
        : [];

    return (
        <DashboardLayout title="Detail Order" header="Detail Order">
            <div className="max-w-7xl mx-auto space-y-6">
                <OrderDetailHeader 
                    order={order} 
                    backRoute="/manager/report_validations"
                />

                <ClientInfoCard client={order.clients} />

                <SampleSelector
                    samples={order.samples}
                    selectedSampleId={selectedSampleId}
                    onSampleChange={setSelectedSampleId}
                />

                {selectedSample && (
                    <>
                        {/* Check if we have complete data for new layout */}
                        {selectedSample?.n_parameter_methods &&
                        selectedSample?.n_parameter_methods?.test_methods &&
                        selectedSample?.n_parameter_methods?.test_parameters &&
                        order?.analysts &&
                        order?.analysts.length > 0 ? (
                            // New layout - when data is complete
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <SampleInfoCard sample={selectedSample} />
                                    <div className="space-y-6">
                                        <ParameterMethodCard
                                            data={
                                                selectedSample?.n_parameter_methods
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <EquipmentCard
                                        equipments={
                                            selectedSample.n_parameter_methods
                                                ?.equipments
                                        }
                                    />
                                    <ReagentCard
                                        reagents={
                                            selectedSample.n_parameter_methods
                                                ?.reagents
                                        }
                                    />
                                </div>

                                <AnalysisMethodCard
                                    methods={order.analyses_methods}
                                    reportIssuedAt={order.report_issued_at}
                                    reportFilePath={order.report_file_path}
                                    resultValue={order.result_value}
                                />

                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                    <div className="xl:col-span-2">
                                        <AnalystTeamCard
                                            analysts={order.analysts}
                                        />
                                    </div>
                                    <NotesCard
                                        notes={order.notes}
                                        resultValue={order.result_value}
                                    />
                                </div>
                            </>
                        ) : (
                            // Old layout - when data is incomplete
                            <div className="grid grid-cols-1 gap-6">
                                <SampleInfoCard sample={selectedSample} />
                            </div>
                        )}
                    </>
                )}

                {/* Always show AnalysisMethodCard if no complete data */}
                {!selectedSample?.n_parameter_methods ||
                !selectedSample?.n_parameter_methods?.test_methods ||
                !selectedSample?.n_parameter_methods?.test_parameters ||
                !order?.analysts ||
                order?.analysts.length === 0 ? (
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
                ) : null}

                {(order.status === "pending" ||
                    order.status === "completed") && (
                    <OrderValidation
                        status={order.status}
                        onValidationAction={handleValidate}
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
