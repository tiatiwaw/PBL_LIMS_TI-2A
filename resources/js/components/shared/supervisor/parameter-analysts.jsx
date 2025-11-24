import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import EntitySelectorDialog from "@/components/shared/dialog/entity-selector-dialog";
import {
    getAnalystColumns,
    getParameterAnalystColumns,
} from "./parameter-columns";
import ManagedDataTable from "../tabel/managed-data-table";

export default function ParameterAnalysts({
    formData,
    onAnalystsSelect,
    onNext,
    onBack,
}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAnalysts, setSelectedAnalysts] = useState([]);

    // Initialize dari formData
    useEffect(() => {
        if (formData?.analysts && Array.isArray(formData.analysts)) {
            const analystIds = formData.analysts;
            const selected = dummyAnalysts.filter((a) =>
                analystIds.includes(a.id)
            );
            setSelectedAnalysts(selected);
        }
    }, [formData?.analysts]);

    const dummyAnalysts = [
        { id: 1, name: "Bambang", spesialist: "Uji Makanan" },
        { id: 2, name: "Siti", spesialist: "Uji Kimia" },
        { id: 3, name: "Andi", spesialist: "Uji Logam" },
        { id: 4, name: "Joni", spesialist: "Uji Api" },
        { id: 5, name: "Agus", spesialist: "Uji Makan" },
        { id: 7, name: "Ope", spesialist: "Uji Makan" },
        { id: 6, name: "Merry", spesialist: "Uji Makan" },
    ];

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
        if (!analysts) return console.log(`analist ${analysts} tidak terkirim`);

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
        setSelectedAnalysts(normalized);
        setOpenDialog(false);
    };

    const handleNextClick = () => {
        // Save to formData sebelum lanjut
        const analystIds = selectedAnalysts.map((a) => a.id);
        onAnalystsSelect(analystIds);
        onNext();
    };

    return (
        <div>
            {/* Pilih Analist */}
            <div className="rounded-2xl">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-primary-hijauGelap">
                        Analis
                    </h2>
                    <Button
                        onClick={() => setOpenDialog(true)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors px-6 py-2 rounded-lg"
                    >
                        + Tambah Analis
                    </Button>
                </div>

                <ManagedDataTable
                    data={selectedAnalysts || []}
                    columns={getAnalystColumns}
                    showSearch={false}
                    showCreate={false}
                    showFilter={false}
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <Button
                    onClick={onBack}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 px-8 py-3"
                >
                    Kembali
                </Button>
                <Button
                    onClick={handleNextClick}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200 px-8 py-3"
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
    );
}
