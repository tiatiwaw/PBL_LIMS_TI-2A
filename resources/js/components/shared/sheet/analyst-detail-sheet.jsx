import DetailSheet from "@/components/layouts/detail-sheet";

export default function AnalystDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    const getCertificateStatus = (expiredDate) => {
        if (!expiredDate)
            return { text: "Tidak Ada Tanggal", variant: "secondary" };

        const expiry = new Date(expiredDate);
        const now = new Date();
        const diffTime = expiry - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: "Kedaluwarsa", variant: "error" };
        if (diffDays <= 30)
            return { text: `${diffDays} hari lagi`, variant: "warning" };
        if (diffDays <= 90)
            return { text: "Segera berakhir", variant: "warning" };
        return { text: "Aktif", variant: "success" };
    };

    const certificateDetails =
        data.certificates?.map((cert) => {
            const status = getCertificateStatus(cert.expired_date);
            return {
                label: cert.name,
                value: status.text,
                badge: true,
                variant: status.variant,
            };
        }) || [];

    const trainingDetails =
        data.trainings?.map((training) => ({
            label: training.name,
            value: `${training.provider}`,
            badge: training.result === "Lulus",
            variant: training.result === "Lulus" ? "success" : "error",
        })) || [];

    const certificateSection =
        certificateDetails.length > 0 ? [...certificateDetails] : [];

    const trainingSection =
        trainingDetails.length > 0 ? [...trainingDetails] : [];

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Analis #${data.id}`}
            description={`Detail Analis dari ${data.name}.`}
            fields={[
                { label: "Nama Analis", value: data.name },
                { label: "Email", value: data.users.email },
                { label: "Spesialis", value: data.specialist },
                ...certificateSection,
                ...trainingSection,
            ]}
        />
    );
}
