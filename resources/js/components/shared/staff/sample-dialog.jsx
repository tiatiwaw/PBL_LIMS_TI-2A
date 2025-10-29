import DetailDialog from "../dialog/detail-dialog";

export default function SampleDetailsDialog({ sample, isOpen, onOpenChange }) {
    if (!sample) return null;

    return (
        <DetailDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Sample #${sample.id}`}
            description={`Detail Sample ${sample.name}.`}
            fields={[
                { label: "Nama", value: sample.name },
                { label: "Kategori", value: sample.sample_category },
                { label: "Form", value: sample.form },
                {
                    label: "Metode Pengawetan",
                    value: sample.preservation_method,
                },
                { label: "Volume", value: sample.sample_volume },
                { label: "Kondisi", value: sample.condition },
                { label: "Temperature", value: sample.temperature },
            ]}
        />
    );
}
