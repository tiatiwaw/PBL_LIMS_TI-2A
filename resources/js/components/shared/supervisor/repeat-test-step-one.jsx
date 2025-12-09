import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function RepeatTestStepOne({
    order,
    selectedSamples,
    onSampleToggle,
    onSelectAll,
}) {
    return (
        <Card>
            <CardHeader className="bg-gray-50 border-b">
                <CardTitle>Pilih Sampel untuk Repeat Test</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {/* Select All Checkbox */}
                    <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border">
                        <Checkbox
                            id="select-all"
                            checked={
                                selectedSamples.length ===
                                order?.samples?.length
                            }
                            onCheckedChange={onSelectAll}
                        />
                        <Label
                            htmlFor="select-all"
                            className="font-semibold cursor-pointer"
                        >
                            Pilih Semua Sampel ({selectedSamples.length} /
                            {order?.samples?.length || 0})
                        </Label>
                    </div>

                    {/* Sample List */}
                    <div className="space-y-3">
                        {order?.samples?.map((sample) => (
                            <div
                                key={sample.id}
                                className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition"
                            >
                                <Checkbox
                                    id={`sample-${sample.id}`}
                                    checked={selectedSamples.includes(
                                        sample.id
                                    )}
                                    onCheckedChange={() =>
                                        onSampleToggle(sample.id)
                                    }
                                />
                                <div className="flex-1">
                                    <Label
                                        htmlFor={`sample-${sample.id}`}
                                        className="font-medium cursor-pointer"
                                    >
                                        {sample.name}
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                        Kategori:{" "}
                                        {sample.sample_categories?.name || "-"}
                                    </p>
                                    {sample.parameter?.length > 0 && (
                                        <p className="text-sm text-gray-600">
                                            Parameter: {sample.parameter.length}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
