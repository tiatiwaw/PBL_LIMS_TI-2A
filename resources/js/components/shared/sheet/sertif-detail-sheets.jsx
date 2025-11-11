import DetailSheet from "@/components/layouts/detail-sheet";

export default function SertifDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Sertifikat #${data.id}`}
            description={`Detail Sertifikat ${data.name}.`}
            fields={[
                { label: "Nama Sertifikat", value: data.name },
                { label: "Nama Analis", value: data.analyst_id },
                { label: "Nomor Sertifikat", value: data.certificate_id },
                { label: "Tanggal Terbit", value: data.tanggal_terbit },
                { label: "Tanggal Kadaluarsa", value: data.tanggal_kadaluarsa },
            ]}
        />

    );
}