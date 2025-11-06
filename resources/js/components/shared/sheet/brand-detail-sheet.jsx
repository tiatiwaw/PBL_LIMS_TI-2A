import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    active: "success",
    maintenance: "warning",
    broken: "error",
};

export default function BrandDetailSheet({ equipment, isOpen, onOpenChange }) {
    if (!equipment) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail brand #${equipment.id}`}
            description={`Detail brand ${equipment.name}.`}
            fields={[
                { label: "Nama Alat", value: equipment.name },
            ]}
        />

    );
}