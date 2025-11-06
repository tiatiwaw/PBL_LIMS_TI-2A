import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ClientInfoCard, OrderDetailHeader, SampleSelector, AnalysisMethodCard, AnalystTeamCard, EquipmentCard, MethodInfoCard, NotesCard, ParameterInfoCard, ReagentCard, SampleInfoCard } from "@/components/shared/manager/detail";
import { orders } from "@/data/manager/detail";

export default function DetailOrder({ auth, canValidate, id }) {
    const [loading, setLoading] = useState(false);
    const [selectedSampleId, setSelectedSampleId] = useState(
        orders.parameter_methods[0].id.toString()
    );

    const selectedSample = orders.parameter_methods.find(
        (sample) => sample.id.toString() === selectedSampleId
    );

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };

    const handleValidate = () => {
        alert("Order berhasil divalidasi!");
        // setLoading(true);
        // router.post(`/manager/report-validation/${orders.id}/validate`, {}, {
        //     onFinish: () => setLoading(false),
        //     onSuccess: () => alert("Order berhasil divalidasi!"),
        // });
    };

    const handleInvalidate = () => {
        alert("Order berhasil diinvalidasi!");
        // setLoading(true);
        // router.post(`/manager/report-validation/${orders.id}/invalidate`, {}, {
        //     onFinish: () => setLoading(false),
        //     onSuccess: () => alert("Order berhasil diinvalidasi!"),
        // });
    };

    return (
        <DashboardLayout title="Detail Order" user={currentUser} header="Detail Order">
            <div className="max-w-7xl mx-auto space-y-6">
                <OrderDetailHeader
                    order={orders}
                    canValidate={canValidate}
                    onValidate={handleValidate}
                    onInvalidate={handleInvalidate}
                />

                <ClientInfoCard client={orders.client} />

                <SampleSelector
                    samples={orders.parameter_methods}
                    selectedSampleId={selectedSampleId}
                    onSampleChange={setSelectedSampleId}
                />

                {selectedSample && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SampleInfoCard sample={selectedSample} />
                            <div className="space-y-6">
                                <ParameterInfoCard parameter={selectedSample.parameter} />
                                <MethodInfoCard method={selectedSample.method} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <EquipmentCard equipments={selectedSample.equipements} />
                            <ReagentCard reagents={selectedSample.reagents} />
                        </div>
                    </>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <AnalystTeamCard analysts={orders.analysts} />
                    <AnalysisMethodCard
                        methods={orders.analysis_methods}
                        reportIssuedAt={orders.report_issued_at}
                        reportFilePath={orders.report_file_path}
                        resultValue={orders.result_value}
                    />
                    <NotesCard notes={orders.notes} />
                </div>
            </div>
        </DashboardLayout>
    );
}