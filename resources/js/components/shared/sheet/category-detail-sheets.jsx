import DetailSheet from "@/components/layouts/detail-sheet";

const statusVariantMap = {
    active: "success",
    maintenance: "warning",
    broken: "error",
};

export default function CategoryDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Kategori #${data.id}`}
            description={`Detail Kategori ${data.name}.`}
            fields={[
                { label: "Nama Kategori", value: data.name },
            ]}
        />

    );
}