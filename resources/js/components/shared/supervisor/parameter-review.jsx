import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ParameterReview({
    formData,
    samples,
    onSubmit,
    onNext,
    onBack,
}) {
    const dummyClient = {
        id: "A1234567890GGS",
        name: "Putro Raja Kenjoko",
        address: "Semarang",
        phone: "081234567856",
    };

    // Get analyst objects from IDs
    const dummyAnalysts = [
        { id: 1, name: "Bambang", spesialist: "Uji Makanan" },
        { id: 2, name: "Siti", spesialist: "Uji Kimia" },
        { id: 3, name: "Andi", spesialist: "Uji Logam" },
        { id: 4, name: "Joni", spesialist: "Uji Api" },
        { id: 5, name: "Agus", spesialist: "Uji Makan" },
        { id: 7, name: "Ope", spesialist: "Uji Makan" },
        { id: 6, name: "Merry", spesialist: "Uji Makan" },
    ];

    const selectedAnalysts = (formData?.analysts || [])
        .map((id) => dummyAnalysts.find((a) => a.id === id))
        .filter(Boolean);

    const handleKirim = () => {
        onSubmit();
        onNext();
    };

    return (
        <div className="pb-10">
            <div className="w-full max-w-6xl mx-auto">
                {/* Section Client */}
                <SectionCard title="Client">
                    <Detail label="ID" value={dummyClient.id} />
                    <Detail label="Nama" value={dummyClient.name} />
                    <Detail label="Alamat" value={dummyClient.address} />
                    <Detail label="Nomor HP" value={dummyClient.phone} />
                </SectionCard>

                {/* Section Parameter */}
                <SectionCard title="Sample">
                    <div className="flex flex-col gap-3">
                        {samples.map((s) => (
                            <div
                                key={s.id}
                                className="flex justify-between items-center border rounded-lg py-3 px-5 bg-white"
                            >
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-800">
                                        {s.name}
                                    </div>
                                    {formData?.samples?.[s.id] && (
                                        <div className="text-sm text-gray-600 mt-1">
                                            Parameter & Method filled ✓
                                        </div>
                                    )}
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white"
                                >
                                    Detail
                                </Button>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                {/* Section Analist */}
                <SectionCard title="Analist">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="w-full border-collapse text-left text-gray-800">
                            <thead className="bg-white text-black">
                                <tr>
                                    <th className="px-6 py-3 w-[40%]">
                                        Analist
                                    </th>
                                    <th className="px-6 py-3 w-[40%]">
                                        Spesialis
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {selectedAnalysts.length === 0 ? (
                                    <tr>
                                        <td
                                            className="px-6 py-3 text-gray-500 italic text-center"
                                            colSpan={3}
                                        >
                                            Tidak ada analist dipilih.
                                        </td>
                                    </tr>
                                ) : (
                                    selectedAnalysts.map((a, i) => (
                                        <tr
                                            key={a.id}
                                            className={`${
                                                i % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-gray-50"
                                            } border-t`}
                                        >
                                            <td className="px-6 py-3">
                                                {a.name}
                                            </td>
                                            <td className="px-6 py-3">
                                                {a.spesialist}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>

                {/* Section Estimasi & Catatan */}
                <SectionCard title="Informasi Tambahan">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="border rounded-lg p-4 bg-white">
                            <div className="text-sm font-semibold text-gray-700 mb-2">
                                Estimasi Order Selesai
                            </div>
                            <div className="text-lg text-gray-800 font-semibold">
                                {formData?.estimasiSelesai
                                    ? new Date(
                                          formData.estimasiSelesai
                                      ).toLocaleDateString("id-ID", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      })
                                    : "-"}
                            </div>
                        </div>

                        <div className="border rounded-lg p-4 bg-white">
                            <div className="text-sm font-semibold text-gray-700 mb-2">
                                Catatan
                            </div>
                            <div className="text-base text-gray-800 whitespace-pre-wrap break-words max-h-24 overflow-y-auto">
                                {formData?.catatan || "-"}
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* Button Actions */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                    <Button
                        onClick={onBack}
                        className="bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 px-8 py-3"
                    >
                        Kembali
                    </Button>
                    <Button
                        onClick={handleKirim}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200 px-8 py-3"
                    >
                        Kirim
                    </Button>
                </div>
            </div>
        </div>
    );
}

/* Sub Components */
function SectionCard({ title, children }) {
    return (
        <Card className="bg-[#F6FFFD] rounded-2xl p-6 mb-6 shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
                <Badge className="bg-primary-hijauTua hover:bg-primary-hijauTua text-white text-base py-2 px-4 min-w-[1100px] text-center shadow-sm rounded-md">
                    {title}
                </Badge>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-2 text-[17px]">{children}</div>
        </Card>
    );
}

function Detail({ label, value }) {
    return (
        <div className="flex gap-4">
            <span className="w-48 text-gray-700 font-semibold">{label}</span>
            <span className="text-gray-800">: {value}</span>
        </div>
    );
}
