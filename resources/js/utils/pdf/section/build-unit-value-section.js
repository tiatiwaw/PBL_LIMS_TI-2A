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