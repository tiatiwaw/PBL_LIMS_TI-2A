import DetailSheet from "@/components/layouts/detail-sheet";

export default function OrderDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Order #${data.id}`}
            description={`Detail order dengan nomor ${data.order_number}.`}
            fields={[
                { label: "ID Order", value: data.id },
                { label: "ID Klien", value: data.client_id },
                { label: "Nomor Order", value: data.order_number },
                { label: "Judul Order", value: data.title },
                { label: "Tanggal Order", value: data.order_date },
                { label: "Estimasi Selesai", value: data.estimate_date },
                { label: "Catatan", value: data.notes },
                { label: "Tipe Order", value: data.order_type },
                { label: "Status", value: data.status },
            ]}
        />
    );
}
