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
} from "@/components/shared/order/detail";

import Loading from "@/components/ui/loading";
import { usePage } from "@inertiajs/react";
import { useManagerOrder } from "@/hooks/useManager";

export default function ManagerDetailOrder() {
    const { id } = usePage().props;
    const { data: orderRes, isLoading, error } = useManagerOrder(id);

    console.log("HASIL HOOK:", orderRes);

    const order = orderRes?.data ?? null;

    const [selectedSampleId, setSelectedSampleId] = useState(null);

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

    // const handleValidate = () => {
    //     alert("Order berhasil divalidasi!");
    //     // setLoading(true);
    //     // router.post(`/manager/report-validation/${order.id}/validate`, {}, {
    //     //     onFinish: () => setLoading(false),
    //     //     onSuccess: () => alert("Order berhasil divalidasi!"),
    //     // });
    // };

    // const handleInvalidate = () => {
    //     alert("Order berhasil diinvalidasi!");
    //     // setLoading(true);
    //     // router.post(`/manager/report-validation/${order.id}/invalidate`, {}, {
    //     //     onFinish: () => setLoading(false),
    //     //     onSuccess: () => alert("Order berhasil diinvalidasi!"),
    //     // });
    // };

    if (isLoading) {
        return (
            <DashboardLayout title="Detail Order">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Detail Order">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Gagal memuat detail order"}
                </div>
            </DashboardLayout>
        );
    }

    if (!order) {
        return (
            <DashboardLayout title="Detail Order">
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
                <OrderDetailHeader order={order} />

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
            </div>
        </DashboardLayout>
    );
}
