import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
    OrderDetailHeader,
    ClientInfoCard,
    SampleSelector,
    SampleInfoCard,
    ParameterInfoCard,
    MethodInfoCard,
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
            update.mutateAsync({ id, data });
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

    // --- BAGIAN PERBAIKAN UTAMA DI SINI ---
    // Kita memetakan struktur data baru (nested) ke struktur flat yang diharapkan komponen
    const normalizedSample = selectedSample
        ? {
              ...selectedSample,

              // 1. Ambil Parameter dari n_parameter_methods -> test_parameters
              parameter:
                  selectedSample.n_parameter_methods?.test_parameters ?? null,

              // 2. Ambil Method dari n_parameter_methods -> test_methods
              method: selectedSample.n_parameter_methods?.test_methods ?? null,

              // 3. Ambil Equipments & Reagents dari dalam n_parameter_methods juga
              equipments: selectedSample.n_parameter_methods?.equipments ?? [],
              reagents: selectedSample.n_parameter_methods?.reagents ?? [],
          }
        : null;
    // --------------------------------------

    const safeAnalysts = Array.isArray(order.analysts)
        ? order.analysts.filter((item) => item && typeof item === "object")
        : [];

    return (
        <DashboardLayout title="Detail Order" header="Detail Order">
            <div className="max-w-7xl mx-auto space-y-6">
                <OrderDetailHeader order={order} backRoute="/manager/orders" />

                <ClientInfoCard
                    client={order.client ?? order.clients ?? { user: {} }}
                />

                <SampleSelector
                    samples={order.samples}
                    selectedSampleId={selectedSampleId}
                    onSampleChange={setSelectedSampleId}
                />

                {normalizedSample && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SampleInfoCard sample={normalizedSample} />

                            <div className="space-y-6">
                                {normalizedSample.parameter ? (
                                    <ParameterInfoCard
                                        parameter={normalizedSample.parameter}
                                    />
                                ) : (
                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                                        Data parameter tidak tersedia untuk
                                        sample ini.
                                    </div>
                                )}

                                {normalizedSample.method ? (
                                    <MethodInfoCard
                                        method={normalizedSample.method}
                                    />
                                ) : (
                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                                        Data metode tidak tersedia untuk sample
                                        ini.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <EquipmentCard
                                equipments={normalizedSample.equipments}
                            />
                            <ReagentCard reagents={normalizedSample.reagents} />
                        </div>
                    </>
                )}

                <AnalysisMethodCard
                    methods={order.analyses_methods ?? []}
                    reportIssuedAt={order.report_issued_at}
                    reportFilePath={order.report_file_path}
                    resultValue={order.result_value}
                />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                        <AnalystTeamCard analysts={safeAnalysts} />
                    </div>
                    <NotesCard
                        notes={order.notes ?? ""}
                        resultValue={order.result_value}
                    />
                </div>

                {order.status === "pending" ||
                    (order.status === "completed" && (
                        <OrderValidation
                            status={order.status}
                            onValidationAction={handleValidate}
                            isLoading={isValidating}
                        />
                    ))}

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
