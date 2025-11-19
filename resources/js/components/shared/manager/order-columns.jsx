export const getOrdersColumns = ({ onShowDetail }) => [
    {
        accessorKey: "no",
        header: "No",
        cell: ({ row }) => row.index + 1,
    },

    {
        accessorKey: "samples",
        header: "Sample",
        cell: ({ row }) => {
            const samples = row.original.samples;
            return samples?.length > 0 ? samples[0].name : "-";
        },
    },

    {
        accessorKey: "clients",
        header: "Client",
        cell: ({ row }) => row.original.clients?.name || "-",
    },

    {
        accessorKey: "analysts",
        header: "Analis",
        cell: ({ row }) => row.original.analysts?.name || "-",
    },

    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
            <button
                onClick={() => onShowDetail(row.original.id)}w
                className="px-3 py-1 rounded-lg border"
            >
                Detail
            </button>
        ),
    },
];
