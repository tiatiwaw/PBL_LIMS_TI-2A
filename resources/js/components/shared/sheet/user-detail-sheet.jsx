import DetailSheet from "@/components/layouts/detail-sheet";

export default function UserDetailSheet({ user, isOpen, onOpenChange }) {
    if (!user) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail User #${user.id}`}
            description={`Detail user dari ${user.name}.`}
            fields={[
                { label: "Nama", value: user.name },
                { label: "Role", value: user.role },
                { label: "Email", value: user.email },
            ]}
        />
    );
}