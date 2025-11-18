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
import { usePage } from "@inertiajs/react";
import { useOrder } from "@/hooks/useSupervisor";

export default function DetailOrder({ canValidate }) {
    const { props } = usePage();
    const { id } = props;

    const { data: order, isLoading, error } = useOrder(id);

    const [selectedSampleId, setSelectedSampleId] = useState(null);

    const handleValidation = () => {};

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
                    <OrderValidation handleValidation={handleValidation} />
                )}
            </div>
        </DashboardLayout>
    );
}
