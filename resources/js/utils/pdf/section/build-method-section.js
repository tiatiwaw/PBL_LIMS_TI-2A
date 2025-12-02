export const buildMethodSection = (methods) => {
    const columns = [
        "No",
        "Nama Metode",
        "Referensi",
        "Parameter Berlaku",
        "Durasi",
        "Masa Berlaku"
    ];

    const rows = methods.map((method, index) => [
        index + 1,
        method.name,
        method.reference_standards?.name || "-", 
        method.applicable_parameter || "-",
        method.duration || "-",
        method.validity_period || "-"
    ]);

    return { columns, rows };
};