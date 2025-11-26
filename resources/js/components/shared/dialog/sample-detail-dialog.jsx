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
    good: "Baik",
    damaged: "Rusak",
    expired: "Kadaluarsa",
}

const statusLabelMap = {
    done: "Selesai",
    in_progress: "Dalam Proses",
}

const formLabelMap = {
    gas: "Gas",
    solid: "Padat",
    liquid: "Cair",
}

export default function SampleDetailsDialog({ sample, isOpen, onOpenChange }) {
    if (!sample) return null;

    return (
        <DetailDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail sampel - ${sample.name}.`}
            fields={[
                { label: "Kategori", value: sample.sample_categories.name },
                { label: "Wujud", value: formLabelMap[sample.form ]},
                { label: "Metode Penyimpanan", value: sample.preservation_method },
                {
                    label: "Kondisi",
                    value: conditionLabelMap[sample.condition],
                    badge: true,
                    variant: conditionVariantMap[sample.condition] || "outline",
                },
                {
                    label: "Metode Pengujian",
                    value: sample.test_method?.map(tm => tm.name).join(", "),
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
