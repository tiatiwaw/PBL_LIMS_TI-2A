import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleAlert, Edit, Plus } from "lucide-react";
import { toast } from "sonner";

// Import komponen steps
import ParameterFirst from "@/components/shared/supervisor/parameter-first";
import ParameterSecond from "@/components/shared/supervisor/parameter-second";
import ParameterAnalysts from "@/components/shared/supervisor/parameter-analysts";
import ParameterReview from "@/components/shared/supervisor/parameter-review";
import ParameterDetails from "@/components/shared/supervisor/parameter-details";
import Stepper from "@/components/shared/supervisor/stepper-first";
import { useOrderParameters } from "@/hooks/useSupervisor";
import Loading from "@/components/ui/loading";
import ActionSupervisorDialog from "@/components/shared/dialog/action-supervisor-dialog";

export default function SupervisorParametersIndex() {
    const { props } = usePage();
    const { id } = props;

    const {
        data,
        isLoading,
        error,
        create: createParameter,
        createOrder,
        update: updateParameter,
    } = useOrderParameters(id);

    const {
        order,
        samples,
        n_parameter_methods,
        test_parameters,
        test_methods,
        reagents,
        equipments,
        analysts,
    } = data || {};

    // State untuk handle step
    const [currentStep, setCurrentStep] = useState("index"); // index, first, second, analysts, review, detail
    const [parameterStep, setParameterStep] = useState(1);
    const [currentSampleId, setCurrentSampleId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReview, setIsReview] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        action: "",
        title: "",
        description: "",
        data: {},
    });

    // Central formData state untuk persistence
    const [formData, setFormData] = useState({
        orderId: id, // Use id dari props langsung, lebih reliable
        samples: [
            // Structure: { sample_id, parameter_id, method_id, equipments: [], reagents: [] }
        ],
        analysts: [], // Array of analyst IDs
        estimasiSelesai: "",
        catatan: "",
        createdAt: new Date().toISOString(),
    });

    // Update formData orderId saat data tersedia
    useEffect(() => {
        if (order?.id) {
            setFormData((prev) => ({
                ...prev,
                orderId: order.id,
            }));
        }
    }, [order?.id]);

    // Populate formData dari n_parameter_methods yang sudah ada
    useEffect(() => {
        if (
            n_parameter_methods &&
            Array.isArray(n_parameter_methods) &&
            n_parameter_methods.length > 0
        ) {
            const populatedSamples = n_parameter_methods.map((npm) => ({
                sample_id: npm.sample_id,
                parameter_id: npm.test_parameter_id,
                method_id: npm.test_method_id,
                equipments: npm.equipments?.map((e) => e.id) || [],
                reagents: npm.reagents?.map((r) => r.id) || [],
            }));

            setFormData((prev) => ({
                ...prev,
                samples: populatedSamples,
            }));
        }
    }, [n_parameter_methods]);

    const formTopRef = useRef(null);
    useEffect(() => {
        if (formTopRef.current) {
            formTopRef.current.scrollIntoView({
                block: "start",
            });
        }
    }, [currentStep]);

    // Handler untuk navigasi
    const handleStepChange = (step) => {
        setCurrentStep(step);
    };

    // Handler untuk edit sample
    const handleEditSample = (sampleId) => {
        setCurrentSampleId(sampleId);
        handleStepChange("first");
    };

    // Handler untuk update sample parameter & method
    const handleUpdateSampleParameter = (sampleId, parameterId, methodId) => {
        setFormData((prev) => {
            const sampleIndex = prev.samples.findIndex(
                (s) => s.sample_id === sampleId
            );

            if (sampleIndex !== -1) {
                // Update existing sample
                const updatedSamples = [...prev.samples];
                updatedSamples[sampleIndex] = {
                    ...updatedSamples[sampleIndex],
                    parameter_id: parameterId,
                    method_id: methodId,
                };
                return {
                    ...prev,
                    samples: updatedSamples,
                };
            } else {
                // Add new sample
                return {
                    ...prev,
                    samples: [
                        ...prev.samples,
                        {
                            sample_id: sampleId,
                            parameter_id: parameterId,
                            method_id: methodId,
                            equipments: [],
                            reagents: [],
                        },
                    ],
                };
            }
        });
    };

    // Handler untuk update sample equipment & reagents
    const handleNParameterMethod = (sampleId, equipments, reagents) => {
        setIsSubmitting(true);
        setFormData((prev) => {
            const sampleIndex = prev.samples.findIndex(
                (s) => s.sample_id === sampleId
            );

            if (sampleIndex !== -1) {
                const updatedSamples = [...prev.samples];
                updatedSamples[sampleIndex] = {
                    ...updatedSamples[sampleIndex],
                    equipments: equipments || [],
                    reagents: reagents || [],
                };
                const updatedFormData = {
                    ...prev,
                    samples: updatedSamples,
                };

                // Call mutation dengan updatedFormData yang sudah terbaru
                if (isUpdate) {
                    updateParameter.mutateAsync(updatedFormData);
                } else {
                    createParameter.mutateAsync(updatedFormData);
                }
                setIsSubmitting(false);
                setIsUpdate(false);

                return updatedFormData;
            }
            return prev;
        });
    };

    // Handler untuk update analysts
    const handleUpdateAnalysts = (data) => {
        setFormData((prev) => ({
            ...prev,
            analysts: data.analysts || [],
            estimasiSelesai: data.estimasiSelesai || "",
            catatan: data.catatan || "",
        }));
    };

    const handleActionSubmit = () => {
        // Validasi semua field sudah terisi
        if (!formData.analysts || formData.analysts.length === 0) {
            toast.error("Pilih minimal satu analyst");
            return;
        }
        if (!formData.estimasiSelesai) {
            toast.error("Isi estimasi tanggal selesai");
            return;
        }

        setDialogConfig({
            action: "confirm",
            title: `Konfirmasi Parameter Order ${order.title}`,
            description: "Yakin ingin mengkonfirmasi parameter order ini?.",
            data: formData,
        });
        setOpenDialog(true);
    };

    // Handler untuk submit form (POST - Create)
    const handleSubmitForm = async (data) => {
        // Transform data ke format yang diharapkan backend
        const submissionData = {
            orderId: data.orderId,
            analysts: data.analysts,
            notes: data.catatan,
            estimate_date: data.estimasiSelesai,
        };

        createOrder.mutateAsync(submissionData);
    };

    // Render berdasarkan step
    if (currentStep === "first") {
        return (
            <DashboardLayout title="Parameter" header="Parameter">
                <div ref={formTopRef} className="px-4 py-2">
                    <Stepper currentStep={parameterStep} />
                </div>
                <ParameterFirst
                    sampleId={currentSampleId}
                    parameterList={test_parameters}
                    metodeList={test_methods}
                    formData={formData}
                    onParameterSelect={handleUpdateSampleParameter}
                    onNext={() => handleStepChange("second")}
                    onBack={() => handleStepChange("index")}
                />
            </DashboardLayout>
        );
    }

    if (currentStep === "second") {
        return (
            <DashboardLayout title="Parameter" header="Parameter">
                <div ref={formTopRef} className="px-4 py-2">
                    <Stepper currentStep={parameterStep} />
                </div>
                <ParameterSecond
                    sampleId={currentSampleId}
                    reagentData={reagents}
                    equipmentData={equipments}
                    formData={formData}
                    isSubmitting={isSubmitting}
                    onEquipmentReagentSelect={handleNParameterMethod}
                    onNext={() => handleStepChange("index")}
                    onBack={() => handleStepChange("first")}
                />
            </DashboardLayout>
        );
    }

    if (currentStep === "analysts") {
        return (
            <DashboardLayout title="Parameter" header="Parameter">
                <div ref={formTopRef} className="px-4 py-2">
                    <Stepper currentStep={parameterStep} />
                </div>
                <ParameterAnalysts
                    formData={formData}
                    analystsData={analysts}
                    onAnalystsSelect={handleUpdateAnalysts}
                    onNext={() => {
                        handleStepChange("review"), setParameterStep(3);
                    }}
                    onBack={() => {
                        handleStepChange("index"), setParameterStep(1);
                    }}
                />
            </DashboardLayout>
        );
    }

    if (currentStep === "review") {
        return (
            <DashboardLayout title="Parameter" header="Parameter">
                <div ref={formTopRef} className="px-4 py-2">
                    <Stepper currentStep={parameterStep} />
                </div>
                <ParameterReview
                    formData={formData}
                    orderData={order}
                    analystsData={analysts}
                    nParameterData={n_parameter_methods}
                    samples={samples}
                    // isSubmitting={isSubmitting}
                    setSample={setCurrentSampleId}
                    onSubmit={handleActionSubmit}
                    onDetail={() => {
                        handleStepChange("detail");
                        setIsReview(true);
                    }}
                    onBack={() => {
                        handleStepChange("analysts"), setParameterStep(3);
                    }}
                />

                <ActionSupervisorDialog
                    action={dialogConfig.action}
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                    data={dialogConfig.data}
                    title={dialogConfig.title}
                    description={dialogConfig.description}
                    onConfirm={handleSubmitForm}
                />
            </DashboardLayout>
        );
    }

    if (currentStep === "detail") {
        return (
            <DashboardLayout title="Parameter" header="Parameter">
                <div ref={formTopRef}>
                    <ParameterDetails
                        sampleId={currentSampleId}
                        n_parameter_methods={n_parameter_methods}
                        test_parameters={test_parameters}
                        test_methods={test_methods}
                        samples={samples}
                        onBack={() =>
                            isReview
                                ? (handleStepChange("review"),
                                  setIsReview(false))
                                : handleStepChange("index")
                        }
                    />
                </div>
            </DashboardLayout>
        );
    }

    if (isLoading) {
        return (
            <DashboardLayout title="Parameter" header="Parameter">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Parameter" header="Parameter">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    // Default: Index view
    return (
        <DashboardLayout title="Parameter" header="Parameter">
            <div ref={formTopRef} className="px-4 py-2">
                <Stepper currentStep={parameterStep} />
            </div>
            {/* LIST SAMPLE */}
            <div className="space-y-4 px-4 py-2 flex-1">
                {samples.map((s) => (
                    <Card
                        key={s.id}
                        className="shadow-md border border-gray-200 rounded-2xl"
                    >
                        <CardContent className="flex items-center justify-between py-8 px-5">
                            <div>
                                <div className="font-bold text-lg text-[#02364B]">
                                    {s.name}
                                </div>
                                {formData?.samples?.[s.id] && (
                                    <div className="text-sm text-gray-600 mt-1">
                                        Parameter & Method filled ✓
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 justify-start">
                                {/* Detail */}
                                <Button
                                    size="icon"
                                    onClick={() => {
                                        setCurrentSampleId(s.id);
                                        handleStepChange("detail");
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md w-10 h-10"
                                >
                                    <CircleAlert
                                        size={25}
                                        className="transform scale-y-[-1]"
                                    />
                                </Button>
                                {n_parameter_methods?.some(
                                    (item) => item.sample_id === s.id
                                ) ? (
                                    <>
                                        {/* Edit */}
                                        <Button
                                            size="icon"
                                            onClick={() => {
                                                setIsUpdate(true);
                                                handleEditSample(s.id);
                                            }}
                                            className="bg-green-500 hover:bg-green-600 text-white rounded-md w-10 h-10"
                                        >
                                            <Edit size={25} />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {/* Arrow */}
                                        <Button
                                            size="icon"
                                            onClick={() =>
                                                handleEditSample(s.id)
                                            }
                                            className="bg-teal-600 hover:bg-teal-700 text-white rounded-md w-10 h-10"
                                        >
                                            <Plus size={25} />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {/* BUTTON LANJUT */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                    <Button
                        onClick={() => {
                            router.visit(route("supervisor.order.detail", id));
                        }}
                        className="bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 px-8 py-3"
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={() => {
                            handleStepChange("analysts"), setParameterStep(2);
                        }}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200 px-8 py-3"
                    >
                        Lanjut
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
