import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

// Layout
import DashboardLayout from "@/components/layouts/dashboard-layout";

// Komponen
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Icon
import { Plus } from "lucide-react";
import EntitySelectorDialog from "@/components/shared/dialog/entity-selector-dialog";
import { getParameterAnalystColumns } from "@/components/shared/supervisor/analyst-columns";

export default function ParameterStep2() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAnalysts, setSelectedAnalysts] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("selectedAnalysts");
        if (saved) {
            setSelectedAnalysts(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "selectedAnalysts",
            JSON.stringify(selectedAnalysts)
        );
    }, [selectedAnalysts]);

    const dummyAnalysts = [
        { id: 1, name: "Bambang", spesialist: "Uji Makanan" },
        { id: 2, name: "Siti", spesialist: "Uji Kimia" },
        { id: 3, name: "Andi", spesialist: "Uji Logam" },
        { id: 4, name: "Joni", spesialist: "Uji Api" },
        { id: 5, name: "Agus", spesialist: "Uji Makan" },
        { id: 7, name: "Ope", spesialist: "Uji Makan" },
        { id: 6, name: "Merry", spesialist: "Uji Makan" },
    ];

    const saveAnalysts = () => {
        localStorage.setItem(
            "selectedAnalysts",
            JSON.stringify(selectedAnalysts)
        );
    };

    const useAnalysts = () => {
        return {
            data: dummyAnalysts,
        };
    };

    const handleDialogChange = (open) => {
        if (!open) {
            setSelectedAnalysts([].map((s) => ({ ...s })));
        }
        setOpenDialog(open);
    };

    const handleAnaystsSelect = (analysts) => {
        if (!analysts)
            return console.log(`analist ${analysts} tidak terkirim"`); // 🚧 Tambahkan guard agar tidak undefined

        setSelectedAnalysts((prev) => {
            const exists = prev.find((s) => s.id === analysts.id);
            return exists
                ? prev.filter((s) => s.id !== analysts.id)
                : [...prev, { ...analysts, value: analysts.value ?? "" }];
        });
    };

    const handleTambahAnalysts = () => {
        const normalized = selectedAnalysts.map((s) =>
            s.hasOwnProperty("value") ? s : { ...s, value: "" }
        );
        // setData((prev) => ({
        //     ...prev,
        //     samples: normalized,
        // }));
        setSelectedAnalysts(normalized);
        setOpenDialog(false);
    };
    return (
        <DashboardLayout
            title="Parameter"
            header="Parameters"
            user={{ name: "Leo", role: "Manager" }}
        >
            <div className="min-h-screen">
                {/* Stepper */}
                <div className="flex items-center gap-5 mb-6">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-2 border-teal-700 rounded-full flex items-center justify-center font-semibold text-teal-700 text-xs">
                            Parameter
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-teal-700 text-white flex items-center justify-center font-semibold text-xl">
                            2
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-2 border-teal-700 rounded-full flex items-center justify-center font-semibold text-teal-700 text-xs text-center leading-tight">
                            Tinjau Ulang
                        </div>
                    </div>
                </div>

                {/* Pilih Analist */}
                <div className="w-full max-w-9xl">
                    <div className="flex items-center mb-3">
                        <h2 className="text-2xl font-bold text-black">
                            Pilih Analist <span className="ml-60">:</span>
                        </h2>

                        <Button
                            variant="outline"
                            size="icon"
                            className="ml-2"
                            onClick={() => setOpenDialog(true)}
                        >
                            <Plus className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </div>

                    {/* Board */}
                    <Card className="bg-white rounded-2xl p-10 shadow-lg min-h-[600px] w-full flex flex-col justify-start items-center">
                        {selectedAnalysts.length === 0 ? (
                            <p className="text-gray-400 text-lg italic mt-10">
                                Belum ada Analist dipilih
                            </p>
                        ) : (
                            <div className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <table className="w-full text-[17px] border-collapse">
                                    <thead className="bg-[#024D60] text-white">
                                        <tr>
                                            <th className="px-8 py-4 text-left font-semibold tracking-wide w-[10%]">
                                                ID
                                            </th>
                                            <th className="px-8 py-4 text-left font-semibold tracking-wide w-[45%]">
                                                Nama
                                            </th>
                                            <th className="px-8 py-4 text-left font-semibold tracking-wide w-[45%]">
                                                Spesialist
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {selectedAnalysts.map((a, i) => (
                                            <tr
                                                key={a.id}
                                                className={`${
                                                    i % 2 === 0
                                                        ? "bg-white"
                                                        : "bg-[#F9FAFB]"
                                                } border-t border-gray-100`}
                                            >
                                                <td className="px-8 py-4 text-gray-800 font-medium">
                                                    {a.id}
                                                </td>
                                                <td className="px-8 py-4 text-gray-800 font-medium">
                                                    {a.name}
                                                </td>
                                                <td className="px-8 py-4 text-gray-700">
                                                    {a.spesialist}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end mt-6 space-x-3">
                    <Button variant="secondary">Back</Button>

                    <Button
                        onClick={() => {
                            saveAnalysts();
                            router.visit(
                                "/supervisor/orders/parameters/review"
                            );
                        }}
                        className="bg-[#7EE787] hover:bg-[#6AD676] text-gray-800"
                    >
                        Lanjut
                    </Button>
                </div>

                <EntitySelectorDialog
                    type={"analysts"}
                    hook={useAnalysts}
                    isOpen={openDialog}
                    onOpenChange={handleDialogChange}
                    selectedItems={selectedAnalysts}
                    onSelect={handleAnaystsSelect}
                    onConfirm={handleTambahAnalysts}
                    getColumns={getParameterAnalystColumns}
                    showCreate={false}
                />
            </div>
        </DashboardLayout>
    );
}
