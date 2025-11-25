import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleAlert, Edit, ChevronRight, Plus } from "lucide-react";

// Import komponen steps
import ParameterFirst from "@/components/shared/supervisor/parameter-first";
import ParameterSecond from "@/components/shared/supervisor/parameter-second";
import ParameterAnalysts from "@/components/shared/supervisor/parameter-analysts";
import ParameterReview from "@/components/shared/supervisor/parameter-review";
import Stepper from "@/components/shared/supervisor/stepper-first";
import { useOrderParameters } from "@/hooks/useSupervisor";
import Loading from "@/components/ui/loading";

export default function SupervisorParametersIndex() {
    const { props } = usePage();
    const { id } = props;

    const { data, isLoading, error } = useOrderParameters(id);

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
    const [currentStep, setCurrentStep] = useState("index"); // index, first, second, analysts, review
    const [parameterStep, setParameterStep] = useState(1);
    const [currentSampleId, setCurrentSampleId] = useState(null);

    // Central formData state untuk persistence
    const [formData, setFormData] = useState({
        orderId: id,
        samples: {
            // Structure: [sampleId]: { parameter_id, method_id, equipments: [], reagents: [] }
        },
        analysts: [], // Array of analyst IDs
        estimasiSelesai: "",
        catatan: "",
        createdAt: new Date().toISOString(),
    });

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
        setFormData((prev) => ({
            ...prev,
            samples: {
                ...prev.samples,
                [sampleId]: {
                    ...(prev.samples[sampleId] || {}),
                    parameter_id: parameterId,
                    method_id: methodId,
                },
            },
        }));
    };

    // Handler untuk update sample equipment & reagents
    const handleUpdateSampleEquipmentReagents = (
        sampleId,
        equipments,
        reagents
    ) => {
        setFormData((prev) => ({
            ...prev,
            samples: {
                ...prev.samples,
                [sampleId]: {
                    ...(prev.samples[sampleId] || {}),
                    equipments: equipments || [],
                    reagents: reagents || [],
                },
            },
        }));
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

    // Handler untuk submit form
    const handleSubmitForm = () => {
        console.log("Form Data to be submitted:", formData);
        // TODO: Create API endpoint to save this data
        // - POST to /api/orders/{id}/parameters with formData
        // - Create entries in N_PARAMETER_METHODS, N_EQUIPMENTS, N_REAGENTS, N_TRAINING_ANALYST
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
                    onEquipmentReagentSelect={
                        handleUpdateSampleEquipmentReagents
                    }
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
                    onSubmit={handleSubmitForm}
                    onNext={() => {
                        handleStepChange("index"), setParameterStep(1);
                    }}
                    onBack={() => {
                        handleStepChange("analysts"), setParameterStep(3);
                    }}
                />
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
                            <div className="font-bold text-lg text-[#02364B]">
                                {s.name}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 justify-start">
                                {/* {n_parameter_methods.some(item => item.sample_id === s.id) ? */}
                                {formData?.samples?.[s.id] ? (
                                    <>
                                        {/* Detail */}
                                        <Link
                                            href={`/supervisor/orders/${id}/parameters/detail`}
                                        >
                                            <Button
                                                size="icon"
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md w-10 h-10"
                                            >
                                                <CircleAlert
                                                    size={25}
                                                    className="transform scale-y-[-1]"
                                                />
                                            </Button>
                                        </Link>

                                        {/* Edit */}
                                        <Button
                                            size="icon"
                                            onClick={() =>
                                                handleEditSample(s.id)
                                            }
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
                        // onClick={onBack}
                        className="bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 px-8 py-3"
                    >
                        Keluar
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
