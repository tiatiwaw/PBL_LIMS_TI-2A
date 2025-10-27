import DetailDialog from "../dialog/detail-dialog";

export default function ClientDetailsDialog({ client, isOpen, onOpenChange }) {
    if (!client) return null;

    return (
        <DetailDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={`Detail Client #${client.id}`}
            description={`Detail client ${client.name}.`}
            fields={[
                { label: "Nama", value: client.name },
                { label: "Email", value: client.email },
                { label: "Alamat", value: client.address },
                { label: "Nomor Telepon", value: client.phone_number },
                { label: "NPWP", value: client.npwp_number },
            ]}
        />
    );
}
