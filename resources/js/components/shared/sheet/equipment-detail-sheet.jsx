import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    active: "success",
    maintenance: "warning",
    broken: "error",
};

export default function EquipmentDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Peralatan #${data.id}`}
            description={`Detail Alat dari ${data.name}.`}
            fields={[
                { label: "Nama Alat", value: data.name },
                { label: "Brand / Tipe", value: data.brand_types.name },
                { label: "Nomor Seri", value: data.serial_number },
                { label: "Tahun Pembelian", value: data.purchase_year },
                { label: "Jadwal Kalibrasi", value: data.calibration_schedule },
                { label: "Status", value: data.status, badge: true, variant: statusVariantMap[data.status] || "outline" },
                { label: "Lokasi", value: data.location },
            ]}
        />

    );
}