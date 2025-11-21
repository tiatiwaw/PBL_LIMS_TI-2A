import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { router } from "@inertiajs/react";

// shadcn-ui components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ParameterStep3() {
    // 👍 HANYA INI YANG NEEDED
    const [selectedAnalysts, setSelectedAnalysts] = useState([]);

    // Ambil data dari localStorage
    useEffect(() => {
        const saved = localStorage.getItem("selectedAnalysts");
        if (saved) {
            setSelectedAnalysts(JSON.parse(saved));
        }
    }, []);

    const dummyClient = {
        id: "A1234567890GGS",
        name: "Putro Raja Kenjoko",
        address: "Semarang",
        phone: "081234567856",
    };

    const dummyParameter = [
        { id: 1, name: "Sample 1" },
        { id: 2, name: "Sample 2" },
    ];

    return (
        <DashboardLayout
            title="Parameter"
            header="Parameters "
            user={{ name: "Leo", role: "Manager" }}
        >
            <div className="min-h-screen pb-10">
                {/* Header Stepper */}
                <div className="flex items-center gap-5 mb-10">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-2 border-teal-700 rounded-full flex items-center justify-center font-semibold text-teal-700 text-xs">
                            Parameter
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-2 border-teal-700 rounded-full flex items-center justify-center font-semibold text-teal-700 text-xs">
                            Analist
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-teal-700 text-white rounded-full flex items-center justify-center font-semibold text-xl">
                            3
                        </div>
                    </div>
                </div>

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
                            {dummyParameter.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex justify-between items-center border rounded-lg py-3 px-5 bg-white"
                                >
                                    <span className="font-semibold text-gray-800">
                                        {p.name}
                                    </span>
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
                                        <th className="px-6 py-3 w-[20%]">
                                            ID
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {selectedAnalysts.length === 0 ? (
                                        <tr>
                                            <td
                                                className="px-6 py-3 text-gray-500 italic"
                                                colSpan={3}
                                            >
                                                Tidak ada analist dipilih di
                                                step sebelumnya.
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
                                                <td className="px-6 py-3 text-gray-600">
                                                    {a.id}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </SectionCard>

                    {/* Button Actions */}
                    <div className="flex justify-end gap-3 mt-8">
                        <Button
                            variant="outline"
                            className="border-gray-300 text-gray-700"
                            onClick={() =>
                                router.visit(
                                    "/supervisor/orders/parameters/analysts"
                                )
                            }
                        >
                            Back
                        </Button>

                        <Button className="bg-[#7EE787] hover:bg-[#6AD676] text-gray-800 flex items-center">
                            Kirim
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

/* ----------------- Sub Components ------------------ */

function SectionCard({ title, children }) {
    return (
        <Card className="bg-[#F6FFFD] rounded-2xl p-6 mb-6 shadow-md border border-gray-200">
            <div className="flex items-center mb-3">
                <Badge className="bg-[#38A39D] text-white text-base py-2 px-4 min-w-[1100px] hover:bg-[#38A39D] text-center shadow-sm rounded-md">
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
