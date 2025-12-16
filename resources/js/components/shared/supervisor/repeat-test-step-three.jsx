import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function RepeatTestStepThree({
    order,
    selectedSamples,
    notes,
    onNotesChange,
}) {
    return (
        <Card>
            <CardHeader className="bg-gray-50 border-b">
                <CardTitle>Catatan Pengulangan Test</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600 font-medium mb-3">
                            Sampel yang akan diulang:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {order?.samples
                                ?.filter((s) => selectedSamples.includes(s.id))
                                .map((sample) => (
                                    <span
                                        key={sample.id}
                                        className="px-3 py-1 bg-primary-hijauTua/10 text-primary-hijauTua text-sm rounded-full"
                                    >
                                        {sample.name}
                                    </span>
                                ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="repeat-notes">
                            Jelaskan alasan pengulangan test (wajib diisi)
                        </Label>
                        <Textarea
                            id="repeat-notes"
                            placeholder="Contoh: Hasil sebelumnya tidak sesuai standar acuan karena..."
                            value={notes}
                            onChange={(e) => onNotesChange(e.target.value)}
                            className="min-h-[150px]"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
