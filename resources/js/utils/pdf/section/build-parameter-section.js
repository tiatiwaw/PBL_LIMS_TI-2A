export const buildParameterSection = (parameters) => {
    const columns = [
        "No",
        "Nama Parameter",
        "Satuan",
        "Referensi",
        "Kategori",
        "Direction Limit",
        "Standar Kualitas"
    ];

    const rows = parameters.map((param, index) => [
        index + 1,
        param.name,
        param.unit_values?.value || "-", 
        param.reference_standards?.name || "-", 
        param.category,
        param.detection_limit,
        param.quality_standard || "-"
    ]);

    return { columns, rows };
};