import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
    ClientInfoCard,
    OrderDetailHeader,
    SampleSelector,
    AnalysisMethodCard,
    AnalystTeamCard,
    EquipmentCard,
    MethodInfoCard,
    NotesCard,
    ParameterInfoCard,
    ReagentCard,
    SampleInfoCard,
} from "@/components/shared/manager/detail";

import { useClientDashboard } from "@/hooks/useClientDashboard";

export default function DetailOrder({ auth, canValidate, orderId }) {
    const [selectedSampleId, setSelectedSampleId] = useState(null);
    const currentUser = auth?.user ?? { name: "Guest", role: "Client" };

    const {
        order_details,
        table_data_sample,
        detail_sample,
        isLoading,
        errorMessage,
    } = useClientDashboard(orderId);

    if (isLoading) {
        return (
            <DashboardLayout title="Detail Order" user={currentUser} header="Detail Order">
                <p className="text-center text-gray-500">Memuat detail order...</p>
            </DashboardLayout>
        );
    }

    if (errorMessage) {
        return (
            <DashboardLayout title="Detail Order" user={currentUser} header="Detail Order">
                <p className="text-center text-red-500">{errorMessage}</p>
            </DashboardLayout>
        );
    }

    const samples = table_data_sample || [];
    const sampleDetails = detail_sample || [];
    const selectedSample =
        sampleDetails.find((_, i) => i === Number(selectedSampleId)) ||
        sampleDetails[0];

    const handleValidate = () => alert("Order berhasil divalidasi!");
    const handleInvalidate = () => alert("Order berhasil diinvalidasi!");

    return (
        <DashboardLayout title="Detail Order" user={currentUser} header="Detail Order">
            <div className="max-w-7xl mx-auto space-y-6">
                <OrderDetailHeader
                    order={order_details}
                    canValidate={canValidate}
                    onValidate={handleValidate}
                    onInvalidate={handleInvalidate}
                />

                <ClientInfoCard client={order_details?.id_client} />

                {samples.length > 0 && (
                    <SampleSelector
                        samples={samples.map((sample, index) => ({
                            id: index,
                            name: sample.nama_sampel,
                            status: sample.status,
                        }))}
                        selectedSampleId={selectedSampleId || "0"}
                        onSampleChange={setSelectedSampleId}
                    />
                )}

                {selectedSample && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <SampleInfoCard sample={selectedSample} />
                            <div className="space-y-6">
                                <ParameterInfoCard parameter={selectedSample.parameter || "-"} />
                                <MethodInfoCard method={order_details?.metode_analisis || "-"} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <EquipmentCard equipments={selectedSample.equipements || []} />
                            <ReagentCard reagents={selectedSample.reagents || []} />
                        </div>
                    </>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <AnalystTeamCard analysts={order_details?.analysts || []} />
                    <AnalysisMethodCard
                        methods={order_details?.metode_analisis}
                        reportIssuedAt={order_details?.waktu_laporan}
                        reportFilePath={order_details?.direktori_file}
                        resultValue={order_details?.nilai_hasil}
                    />
                    <NotesCard notes={order_details?.catatan || "-"} />
                </div>
            </div>
        </DashboardLayout>
    );
}
