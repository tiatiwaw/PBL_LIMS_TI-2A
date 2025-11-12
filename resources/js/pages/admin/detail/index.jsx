import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ClientInfoCard, OrderDetailHeader, SampleSelector, AnalysisMethodCard, AnalystTeamCard, EquipmentCard, MethodInfoCard, NotesCard, ParameterInfoCard, ReagentCard, SampleInfoCard } from "@/components/shared/manager/detail";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import { usePage } from "@inertiajs/react";

export default function DetailOrder() {
    const { props } = usePage()
    const { id } = props

    const { user, loading: authLoading } = useAuth();
    const { order, isLoadingOrder, errorOrder } = useOrder(id);

    const [selectedSampleId, setSelectedSampleId] = useState(null);

    useEffect(() => {
        if (order && order.samples && order.samples.length > 0 && selectedSampleId === null) {
            setSelectedSampleId(order.samples[0].id.toString());
        }
    }, [order, selectedSampleId]);

    const currentUser = user || { name: "Admin", role: "Admin" };

    if (isLoadingOrder || authLoading) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <Loading />
            </DashboardLayout>
        );
    }

    const selectedSample = order.samples.find(
        (sample) => sample.id.toString() === selectedSampleId
    );

    if (errorOrder) {
        return (
            <DashboardLayout title="Dashboard Admin" user={currentUser} header="Selamat Datang">
                <div className="text-center text-red-500 py-8">
                    {errorOrder.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Detail Order" user={currentUser} header="Detail Order">
            <div className="max-w-7xl mx-auto space-y-6">
                <OrderDetailHeader order={order} />

                <ClientInfoCard client={order.clients} />

                <SampleSelector
                    samples={order.samples}
                    selectedSampleId={selectedSampleId}
                    onSampleChange={setSelectedSampleId}
                />

                {selectedSample && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SampleInfoCard sample={selectedSample} />
                            <div className="space-y-6">
                                <ParameterInfoCard parameter={selectedSample.n_parameter_methods.test_parameters} />
                                <MethodInfoCard method={selectedSample.n_parameter_methods.test_methods} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <EquipmentCard equipments={selectedSample.n_parameter_methods.equipments} />
                            <ReagentCard reagents={selectedSample.n_parameter_methods.reagents} />
                        </div>
                    </>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <AnalystTeamCard analysts={order.analysts} />
                    <AnalysisMethodCard
                        methods={order.analyses_methods}
                        reportIssuedAt={order.report_issued_at}
                        reportFilePath={order.report_file_path}
                        resultValue={order.result_value}
                    />
                    <NotesCard notes={order.notes} />
                </div>
            </div>
        </DashboardLayout>
    );
}