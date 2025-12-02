export const buildReferenceSection = (references) => {
    const columns = [
        "No",
        "Nama Alat"
    ];

    const rows = references.map((reference, index) => [
        index + 1,
        reference.name,
    ]);

    return { columns, rows };
};