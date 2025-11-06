import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    active: "success",
    maintenance: "warning",
    broken: "error",
};

export default function EquipmentDetailSheet({ equipment, isOpen, onOpenChange }) {
    if (!equipment) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Peralatan #${equipment.id}`}
            description={`Detail Alat dari ${equipment.name}.`}
            fields={[
                { label: "Nama Alat", value: equipment.name },
                { label: "Brand / Tipe", value: equipment.brand_type },
                { label: "Nomor Seri", value: equipment.serial_number },
                { label: "Tahun Pembelian", value: equipment.purchase_year },
                { label: "Jadwal Kalibrasi", value: equipment.calibration_schedule },
                { label: "Status", value: equipment.status, badge: true, variant: statusVariantMap[equipment.status] || "outline" },
                { label: "Lokasi", value: equipment.location },
            ]}
        />

    );
}