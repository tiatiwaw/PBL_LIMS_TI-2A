import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import EntitySelectorDialog from "@/components/shared/dialog/entity-selector-dialog";
import {
    getEquipmentColumns,
    getEquipmentSelectorColumns,
    getReagenColumns,
    getReagentSelectorColumns,
} from "./parameter-columns";
import { toast } from "sonner";

export default function ParameterSecond({
    sampleId,
    reagentData,
    equipmentData,
    formData,
    onEquipmentReagentSelect,
    onNext,
    onBack,
}) {
    const [selectedReagents, setSelectedReagents] = useState([]);
    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [dialogReagents, setDialogReagents] = useState([]);
    const [dialogEquipments, setDialogEquipments] = useState([]);
    const [reagentDialogOpen, setReagentDialogOpen] = useState(false);
    const [equipmentDialogOpen, setEquipmentDialogOpen] = useState(false);

    // Initialize dari formData
    useEffect(() => {
        if (formData?.samples?.[sampleId]) {
            const sampleData = formData.samples[sampleId];
            if (sampleData.reagents && Array.isArray(sampleData.reagents)) {
                const reagents = reagentData?.filter((r) =>
                    sampleData.reagents.includes(r.id)
                );
                setSelectedReagents(reagents);
            }
            if (sampleData.equipments && Array.isArray(sampleData.equipments)) {
                const equipments = equipmentData?.filter((e) =>
                    sampleData.equipments.includes(e.id)
                );
                setSelectedEquipments(equipments);
            }
        }
        if (reagentDialogOpen) {
            setDialogReagents([...selectedReagents]);
        }
        if (equipmentDialogOpen) {
            setDialogEquipments([...selectedEquipments]);
        }
    }, [
        sampleId,
        formData,
        reagentDialogOpen,
        selectedReagents,
        equipmentDialogOpen,
        selectedEquipments,
    ]);

    // Hook untuk reagents (dummy implementation)
    const useReagents = () => ({
        data: reagentData,
    });

    // Hook untuk equipments (dummy implementation)
    const useEquipments = () => ({
        data: equipmentData,
    });

    const handleReagentSelect = (reagent) => {
        setDialogReagents((prev) => {
            const exists = prev.find((r) => r.id === reagent.id);
            return exists
                ? prev.filter((r) => r.id !== reagent.id)
                : [...prev, reagent];
        });
    };

    const handleEquipmentSelect = (equipment) => {
        setDialogEquipments((prev) => {
            const exists = prev.find((e) => e.id === equipment.id);
            return exists
                ? prev.filter((e) => e.id !== equipment.id)
                : [...prev, equipment];
        });
    };

    const handleReagentConfirm = () => {
        setSelectedReagents(dialogReagents);
        setReagentDialogOpen(false);
    };

    const handleEquipmentConfirm = () => {
        setSelectedEquipments(dialogEquipments);
        setEquipmentDialogOpen(false);
    };

    const handleBackClick = () => {
        onBack();
    };

    const handleNextClick = () => {
        // Save to formData sebelum lanjut
        if (selectedReagents?.length > 0 && selectedEquipments?.length > 0) {
            const equipmentIds = selectedEquipments.map((e) => e.id);
            const reagentIds = selectedReagents.map((r) => r.id);
            onEquipmentReagentSelect(sampleId, equipmentIds, reagentIds);
            onNext();
        } else {
            toast.warning("Pilih Reagen dan Equipment terlebih dahulu!");
        }
    };

    // --- 6. RENDER ---
    return (
        <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-[#003B4A]">
                    Pilih Equipment & Reagen
                </h1>
                <p className="text-gray-600 mt-2">
                    Tambahkan equipment dan reagen yang diperlukan untuk
                    parameter ini
                </p>
            </div>

            {/* REAGEN SECTION */}
            <div className="rounded-2xl">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-primary-hijauGelap">
                        Reagen
                    </h2>
                    <Button
                        onClick={() => setReagentDialogOpen(true)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors px-6 py-2 rounded-lg"
                    >
                        + Tambah Reagen
                    </Button>
                </div>

                <ManagedDataTable
                    data={selectedReagents || []}
                    columns={getReagenColumns}
                    showSearch={false}
                    showCreate={false}
                    showFilter={false}
                />
            </div>

            {/* EQUIPMENT SECTION */}
            <div className="rounded-2xl">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-primary-hijauGelap">
                        Equipment
                    </h2>
                    <Button
                        onClick={() => setEquipmentDialogOpen(true)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors px-6 py-2 rounded-lg"
                    >
                        + Tambah Equipment
                    </Button>
                </div>

                <ManagedDataTable
                    data={selectedEquipments || []}
                    columns={getEquipmentColumns}
                    showSearch={false}
                    showCreate={false}
                    showFilter={false}
                />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <Button
                    onClick={handleBackClick}
                    className="px-8 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
                >
                    Kembali
                </Button>
                <Button
                    onClick={handleNextClick}
                    className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
                >
                    Selesai
                </Button>
            </div>

            {/* REAGENT SELECTOR DIALOG */}
            <EntitySelectorDialog
                type="reagents"
                hook={useReagents}
                isOpen={reagentDialogOpen}
                onOpenChange={setReagentDialogOpen}
                selectedItems={dialogReagents}
                onSelect={handleReagentSelect}
                onConfirm={handleReagentConfirm}
                getColumns={getReagentSelectorColumns}
                showCreate={false}
            />

            {/* EQUIPMENT SELECTOR DIALOG */}
            <EntitySelectorDialog
                type="equipments"
                hook={useEquipments}
                isOpen={equipmentDialogOpen}
                onOpenChange={setEquipmentDialogOpen}
                selectedItems={dialogEquipments}
                onSelect={handleEquipmentSelect}
                onConfirm={handleEquipmentConfirm}
                getColumns={getEquipmentSelectorColumns}
                showCreate={false}
            />
        </div>
    );
}
