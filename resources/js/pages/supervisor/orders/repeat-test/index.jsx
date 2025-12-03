import { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Loading from "@/components/ui/loading";
import { usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useOrderParameters } from "@/hooks/useSupervisor";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EntitySelectorDialog from "@/components/shared/dialog/entity-selector-dialog";
import {
    getEquipmentSelectorColumns,
    getReagentSelectorColumns,
} from "@/components/shared/supervisor/parameter-columns";
import RepeatTestStepper from "@/components/shared/supervisor/repeat-test-stepper";
import OrderInfoCard from "@/components/shared/supervisor/order-info-card";
import RepeatTestStepOne from "@/components/shared/supervisor/repeat-test-step-one";
import RepeatTestStepTwo from "@/components/shared/supervisor/repeat-test-step-two";
import RepeatTestStepThree from "@/components/shared/supervisor/repeat-test-step-three";

export default function RepeatTest() {
    const { props } = usePage();
    const { id } = props;

    const {
        dataRepeat: paramsData,
        repeatTest,
        isLoading,
        error,
    } = useOrderParameters(id);

    // Destructure reagents dan equipments dengan fallback
    const order = paramsData?.order;
    const reagentData = paramsData?.reagents || [];
    const equipmentData = paramsData?.equipments || [];

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedSamples, setSelectedSamples] = useState([]);
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editedSamples, setEditedSamples] = useState({});

    // Dialog state untuk reagents dan equipments per sample
    const [reagentDialogOpen, setReagentDialogOpen] = useState(false);
    const [equipmentDialogOpen, setEquipmentDialogOpen] = useState(false);
    const [dialogReagents, setDialogReagents] = useState([]);
    const [dialogEquipments, setDialogEquipments] = useState([]);
    const [currentSampleForDialog, setCurrentSampleForDialog] = useState(null);
    const [currentParameterForDialog, setCurrentParameterForDialog] =
        useState(null);

    useEffect(() => {
        if (order?.samples) {
            // Initialize selectedSamples as empty
            setSelectedSamples([]);
            setEditedSamples({});
        }
    }, [order]);

    const handleSampleToggle = (sampleId) => {
        setSelectedSamples((prev) => {
            if (prev.includes(sampleId)) {
                return prev.filter((id) => id !== sampleId);
            } else {
                return [...prev, sampleId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedSamples.length === order?.samples?.length) {
            setSelectedSamples([]);
        } else {
            setSelectedSamples(order?.samples?.map((s) => s.id) || []);
        }
    };

    const formTopRef = useRef(null);
    useEffect(() => {
        if (formTopRef.current) {
            formTopRef.current.scrollIntoView({
                block: "start",
            });
        }
    }, [currentStep]);

    // Hooks untuk dialog - menyediakan semua data reagent/equipment yang tersedia
    const useReagents = () => ({
        data: reagentData || [],
    });

    const useEquipments = () => ({
        data: equipmentData || [],
    });

    // Handler untuk toggle checkbox di dialog
    const handleReagentSelect = (reagent) => {
        setDialogReagents((prev) => {
            const exists = prev?.find((r) => r.id === reagent.id);
            if (exists) {
                return prev.filter((r) => r.id !== reagent.id);
            } else {
                return [...(prev || []), reagent];
            }
        });
    };

    const handleEquipmentSelect = (equipment) => {
        setDialogEquipments((prev) => {
            const exists = prev?.find((e) => e.id === equipment.id);
            if (exists) {
                return prev.filter((e) => e.id !== equipment.id);
            } else {
                return [...(prev || []), equipment];
            }
        });
    };

    // Confirm handler untuk reagent
    const handleReagentConfirm = () => {
        if (currentSampleForDialog && currentParameterForDialog) {
            const key = `${currentSampleForDialog.id}_${currentParameterForDialog.id}`;
            setEditedSamples((prev) => ({
                ...prev,
                [currentSampleForDialog.id]: {
                    ...(prev[currentSampleForDialog.id] || {}),
                    parameters: {
                        ...(prev[currentSampleForDialog.id]?.parameters || {}),
                        [currentParameterForDialog.id]: {
                            ...(prev[currentSampleForDialog.id]?.parameters?.[
                                currentParameterForDialog.id
                            ] || {}),
                            reagents: dialogReagents.map((r) => r.id),
                        },
                    },
                },
            }));
        }
        setReagentDialogOpen(false);
        setDialogReagents([]);
    };

    // Confirm handler untuk equipment
    const handleEquipmentConfirm = () => {
        if (currentSampleForDialog && currentParameterForDialog) {
            setEditedSamples((prev) => ({
                ...prev,
                [currentSampleForDialog.id]: {
                    ...(prev[currentSampleForDialog.id] || {}),
                    parameters: {
                        ...(prev[currentSampleForDialog.id]?.parameters || {}),
                        [currentParameterForDialog.id]: {
                            ...(prev[currentSampleForDialog.id]?.parameters?.[
                                currentParameterForDialog.id
                            ] || {}),
                            equipments: dialogEquipments.map((e) => e.id),
                        },
                    },
                },
            }));
        }
        setEquipmentDialogOpen(false);
        setDialogEquipments([]);
    };

    // Open reagent dialog - pre-select items yang sudah ada di parameter
    const openReagentDialog = (sample, nParam) => {
        setCurrentSampleForDialog(sample);
        setCurrentParameterForDialog(nParam);

        // Pre-select reagents yang sudah ada di nParam
        const existingReagents = nParam.reagents || [];

        // Jika ada data dari editedSamples, gunakan itu, kalo tidak ada gunakan dari nParam
        const selectedIds =
            editedSamples[sample.id]?.parameters?.[nParam.id]?.reagents ||
            existingReagents.map((r) => r.id);

        // Filter dari semua reagentData untuk mendapatkan full objects
        const selected = (reagentData || []).filter((r) =>
            selectedIds.includes(r.id)
        );

        setDialogReagents(selected);
        setReagentDialogOpen(true);
    };

    // Open equipment dialog - pre-select items yang sudah ada di parameter
    const openEquipmentDialog = (sample, nParam) => {
        setCurrentSampleForDialog(sample);
        setCurrentParameterForDialog(nParam);

        // Pre-select equipments yang sudah ada di nParam
        const existingEquipments = nParam.equipments || [];

        // Jika ada data dari editedSamples, gunakan itu, kalo tidak ada gunakan dari nParam
        const selectedIds =
            editedSamples[sample.id]?.parameters?.[nParam.id]?.equipments ||
            existingEquipments.map((e) => e.id);

        // Filter dari semua equipmentData untuk mendapatkan full objects
        const selected = (equipmentData || []).filter((e) =>
            selectedIds.includes(e.id)
        );

        setDialogEquipments(selected);
        setEquipmentDialogOpen(true);
    };

    const proceedToNextStep = () => {
        if (currentStep === 1) {
            if (selectedSamples.length === 0) {
                toast.warning(
                    "Pilih minimal 1 sampel untuk dilakukan repeat test"
                );
                return;
            }
        }
        setCurrentStep(currentStep + 1);
    };

    const handleSubmit = async () => {
        if (!notes.trim()) {
            toast.warning("Catatan penolakan harus diisi");
            return;
        }

        setIsSubmitting(true);
        // Prepare submission data
        const submissionData = {
            samples: selectedSamples,
            edited_data: editedSamples,
            notes: notes,
            action: "repeat_test",
        };

        await repeatTest.mutateAsync(submissionData);
        setIsSubmitting(false);

        // // Call API untuk repeat test
        // const response = await axios.post(
        //     `/api/v1/supervisor/orders/follow-up/${id}/repeat-test/submit`,
        //     submissionData
        // );
    };

    if (isLoading) {
        return (
            <DashboardLayout
                title="Ulangi Test (Repeat Test)"
                header="Ulangi Test (Repeat Test)"
            >
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout
                title="Ulangi Test (Repeat Test)"
                header="Ulangi Test (Repeat Test)"
            >
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Ulangi Test (Repeat Test)"
            header="Ulangi Test (Repeat Test)"
        >
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Stepper */}
                <RepeatTestStepper ref={formTopRef} currentStep={currentStep} />

                {/* Order Info */}
                <OrderInfoCard order={order} />

                {/* Step 1: Select Samples */}
                {currentStep === 1 && (
                    <RepeatTestStepOne
                        ref={formTopRef}
                        order={order}
                        selectedSamples={selectedSamples}
                        onSampleToggle={handleSampleToggle}
                        onSelectAll={handleSelectAll}
                    />
                )}

                {/* Step 2: Edit Reagent & Equipment */}
                {currentStep === 2 && (
                    <RepeatTestStepTwo
                        ref={formTopRef}
                        order={order}
                        selectedSamples={selectedSamples}
                        reagentData={reagentData}
                        equipmentData={equipmentData}
                        editedSamples={editedSamples}
                        onOpenReagentDialog={openReagentDialog}
                        onOpenEquipmentDialog={openEquipmentDialog}
                    />
                )}

                {/* Step 3: Notes */}
                {currentStep === 3 && (
                    <RepeatTestStepThree
                        ref={formTopRef}
                        order={order}
                        selectedSamples={selectedSamples}
                        notes={notes}
                        onNotesChange={setNotes}
                    />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                    <Button
                        variant="outline"
                        className="bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 px-8 py-3"
                        onClick={() => {
                            if (currentStep > 1) {
                                setCurrentStep(currentStep - 1);
                            } else {
                                router.visit(
                                    route("supervisor.order.detail", id)
                                );
                            }
                        }}
                        disabled={isSubmitting}
                    >
                        {currentStep > 1 ? "Kembali" : "Batal"}
                    </Button>

                    {currentStep < 3 ? (
                        <Button
                            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200 px-8 py-3"
                            onClick={proceedToNextStep}
                            disabled={isSubmitting}
                        >
                            Lanjut
                        </Button>
                    ) : (
                        <Button
                            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200 px-8 py-3"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Mengirim..." : "Kirim"}
                        </Button>
                    )}
                </div>
            </div>

            {/* Reagent Selector Dialog */}
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

            {/* Equipment Selector Dialog */}
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
        </DashboardLayout>
    );
}
