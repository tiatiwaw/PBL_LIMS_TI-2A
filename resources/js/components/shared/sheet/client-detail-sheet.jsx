import DetailSheet from "@/components/layouts/detail-sheet";

export default function ClientDetailSheet({ client, isOpen, onOpenChange }) {
    if (!client) return null;

    return (
        <DetailSheet
            open={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Client #${client.id}`}
            description={`Detail Client dari ${client.name}.`}
            fields={[
                { label: "Nama Client", value: client.name },
                { label: "Email", value: client.email },
                { label: "Alamat", value: client.address },
                { label: "Nomor Telepon", value: client.phone_number },
                { label: "NPWP", value: client.npwp_number },
            ]}
        />
    );
}
