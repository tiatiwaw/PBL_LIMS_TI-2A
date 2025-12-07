export const buildCategorySection = (categories) => {
    const columns = [
        "No",
        "Nama Kategori",
    ];

    const rows = categories.map((category, index) => [
        index + 1,
        category.name
    ]);

    return { columns, rows };
};

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

export const buildUnitSection = (units) => {
    const columns = [
        "No",
        "Satuan"
    ];

    const rows = units.map((unit, index) => [
        index + 1,
        unit.value,
    ]);

    return { columns, rows };
};