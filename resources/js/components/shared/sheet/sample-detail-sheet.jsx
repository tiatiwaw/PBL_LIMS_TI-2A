import DetailSheet from "@/components/layouts/detail-sheet";
import { getConditionTypeVariant, getSampleFormLabel, getSampleStatusVariant } from "@/utils/statusUtils";

export default function SampleDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    const baseFields = [
        { label: "Kategori", value: data.sample_categories.name },
        { label: "Wujud", value: getSampleFormLabel(data.form) },
        {
            label: "Metode Penyimpanan",
            value: data.preservation_method,
        },
        {
            label: "Kondisi",
            value: data.condition,
            badge: true,
            variant: getConditionTypeVariant(data.condition) || "outline",
        },
        {
            label: "Status",
            value: data.status,
            badge: true,
            variant: getSampleStatusVariant(data.status) || "outline",
        },
    ];

    // Tambahkan Metode Pengujian hanya jika ada
    const fields = data.test_method && data.test_method.length > 0
        ? [
            ...baseFields.slice(0, 4), // Kategori, Wujud, Metode Penyimpanan, Kondisi
            {
                label: "Metode Pengujian",
                value: data.test_method.map((tm) => tm.name).join(", "),
            },
            baseFields[4], // Status
        ]
        : baseFields;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Sampel #${data.id}`}
            description={`Detail Sampel dari ${data.name}.`}
            fields={fields}
        />
    );
}
