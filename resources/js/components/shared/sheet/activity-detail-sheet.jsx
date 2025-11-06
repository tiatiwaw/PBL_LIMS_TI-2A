import DetailSheet from "@/components/layouts/detail-sheet";

export default function ActivityDetailSheet({ activity, isOpen, onOpenChange }) {
    if (!activity) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Log #${activity.id}`}
            description={`Detail Log dari ${activity.name}.`}
            fields={[
                { label: "Nama", value: activity.name },
                { label: "Role", value: activity.role },
                { label: "Email", value: activity.email },
            ]}
        />
    );
}