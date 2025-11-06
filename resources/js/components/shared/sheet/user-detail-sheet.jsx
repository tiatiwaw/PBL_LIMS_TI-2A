import DetailSheet from "@/components/layouts/detail-sheet";

export default function UserDetailSheet({ data, isOpen, onOpenChange }) {
    if (!data) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail User #${data.id}`}
            description={`Detail user dari ${data.name}.`}
            fields={[
                { label: "Nama", value: data.name },
                { label: "Role", value: data.role },
                { label: "Email", value: data.email },
            ]}
        />
    );
}