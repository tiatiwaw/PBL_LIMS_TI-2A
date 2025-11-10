import DetailDialog from "../dialog/detail-dialog";

const statusVariantMap = {
    done: "success",
    in_progress: "warning",
};

const conditionVariantMap = {
    good: "success",
    damaged: "error",
    expired: "error",
};

const conditionLabelMap = {
    good: "Good",
    damaged: "Damaged",
    expired: "Error",
};

const statusLabelMap = {
    in_progress: "In Progress",
    done: "Done",
};

export default function SampleDetailsDialog({ sample, isOpen, onOpenChange }) {
    if (!sample) return null;

    return (
        <DetailDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail sampel - ${sample.name}.`}
            fields={[
                { label: "Kategori", value: sample.sample_categories.name },
                { label: "Wujud", value: sample.form },
                { label: "Metode Penyimpanan", value: sample.preservation_method },
                {
                    label: "Kondisi",
                    value: conditionLabelMap[sample.condition],
                    badge: true,
                    variant: conditionVariantMap[sample.condition] || "outline",
                },
                {
                    label: "Status",
                    value: statusLabelMap[sample.status],
                    badge: true,
                    variant: statusVariantMap[sample.status] || "outline",
                },
            ]}
        />
    );
}
