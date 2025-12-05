import { Button } from "@/components/ui/button";

export default function RepeatTestParameterItem({
    nParam,
    sample,
    reagentData,
    equipmentData,
    editedSamples,
    onOpenReagentDialog,
    onOpenEquipmentDialog,
}) {
    // Helper: Get selected reagent IDs and full objects
    const getSelectedReagents = () => {
        const selectedIds =
            editedSamples[sample.id]?.parameters?.[nParam.id]?.reagents ||
            (nParam.reagents || []).map((r) => r.id);

        return (reagentData || []).filter((r) => selectedIds.includes(r.id));
    };

    // Helper: Get selected equipment IDs and full objects
    const getSelectedEquipments = () => {
        const selectedIds =
            editedSamples[sample.id]?.parameters?.[nParam.id]?.equipments ||
            (nParam.equipments || []).map((e) => e.id);

        return (equipmentData || []).filter((e) => selectedIds.includes(e.id));
    };

    const selectedReagents = getSelectedReagents();
    const selectedEquipments = getSelectedEquipments();

    return (
        <div className="mb-8 last:mb-0 border-b pb-8 last:border-b-0 last:pb-0">
            <h4 className="font-medium text-sm mb-6 pb-3 border-b">
                {nParam.test_parameters?.name}
            </h4>

            {/* Reagents Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-gray-700">
                        Reagent:
                    </p>
                    <Button
                        size="sm"
                        onClick={() => onOpenReagentDialog(sample, nParam)}
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                        Pilih Reagent
                    </Button>
                </div>

                {/* Display Selected Reagents */}
                <div className="space-y-2 ml-4">
                    {selectedReagents.length > 0 ? (
                        selectedReagents.map((reagent) => (
                            <div
                                key={reagent.id}
                                className="p-3 bg-white rounded border text-sm"
                            >
                                <p className="font-medium">{reagent.name}</p>
                                <p className="text-xs text-gray-600">
                                    Batch: {reagent.batch_number} | Stock:{" "}
                                    {reagent.stock}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-500 italic">
                            Belum ada reagent yang dipilih
                        </p>
                    )}
                </div>
            </div>

            {/* Equipments Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-gray-700">
                        Equipment:
                    </p>
                    <Button
                        size="sm"
                        onClick={() => onOpenEquipmentDialog(sample, nParam)}
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                        Pilih Equipment
                    </Button>
                </div>

                {/* Display Selected Equipments */}
                <div className="space-y-2 ml-4">
                    {selectedEquipments.length > 0 ? (
                        selectedEquipments.map((equipment) => (
                            <div
                                key={equipment.id}
                                className="p-3 bg-white rounded border text-sm"
                            >
                                <p className="font-medium">{equipment.name}</p>
                                <p className="text-xs text-gray-600">
                                    Serial: {equipment.serial_number} | Brand:{" "}
                                    {equipment.brand_types?.name}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-500 italic">
                            Belum ada equipment yang dipilih
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
