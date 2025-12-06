import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RepeatTestParameterItem from "./repeat-test-parameter-item";

export default function RepeatTestStepTwo({
    order,
    selectedSamples,
    reagentData,
    equipmentData,
    editedSamples,
    onOpenReagentDialog,
    onOpenEquipmentDialog,
}) {
    return (
        <Card>
            <CardHeader className="bg-gray-50 border-b">
                <CardTitle>
                    Pilih Reagent & Equipment untuk Repeat Test
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                {selectedSamples.length === 0 ? (
                    <div className="text-center text-gray-500">
                        Tidak ada sampel yang dipilih
                    </div>
                ) : (
                    <div className="space-y-8">
                        {order?.samples
                            ?.filter((s) => selectedSamples.includes(s.id))
                            .map((sample) => {
                                let nParams = sample.n_parameter_methods;
                                if (nParams && !Array.isArray(nParams)) {
                                    nParams = [nParams];
                                }

                                if (!nParams || nParams.length === 0) {
                                    return (
                                        <div
                                            key={sample.id}
                                            className="border rounded-lg p-6 bg-gray-50"
                                        >
                                            <h3 className="font-semibold text-lg mb-6">
                                                {sample.name}
                                            </h3>
                                            <p className="text-gray-500">
                                                Tidak ada parameter untuk sampel
                                                ini
                                            </p>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={sample.id}
                                        className="border rounded-lg p-6 bg-gray-50"
                                    >
                                        <h3 className="font-semibold text-lg mb-6">
                                            {sample.name}
                                        </h3>

                                        <div>
                                            {nParams.map((nParam, paramIdx) => (
                                                <RepeatTestParameterItem
                                                    key={paramIdx}
                                                    nParam={nParam}
                                                    sample={sample}
                                                    reagentData={reagentData}
                                                    equipmentData={
                                                        equipmentData
                                                    }
                                                    editedSamples={
                                                        editedSamples
                                                    }
                                                    onOpenReagentDialog={
                                                        onOpenReagentDialog
                                                    }
                                                    onOpenEquipmentDialog={
                                                        onOpenEquipmentDialog
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
