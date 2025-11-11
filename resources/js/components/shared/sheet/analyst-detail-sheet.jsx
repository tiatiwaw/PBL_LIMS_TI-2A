import DetailSheet from "@/components/layouts/detail-sheet";

export default function AnalystDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Analis #${data.id}`}
            description={`Detail Analis dari ${data.name}.`}
            fields={[
                { label: "Nama Analis", value: data.name },
                { label: "Email", value: data.email },
                { label: "Spesialis", value: data.specialist },
                { label: "Sertifikat", value: data.certificate },
                { label: "Pelatihan", value: data.training },
            ]}
        />
    );
}
