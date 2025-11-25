import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EntitySelectorDialog from "@/components/shared/dialog/entity-selector-dialog";
import {
    getAnalystColumns,
    getParameterAnalystColumns,
} from "./parameter-columns";
import ManagedDataTable from "../tabel/managed-data-table";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";

export default function ParameterAnalysts({
    formData,
    analystsData,
    onAnalystsSelect,
    onNext,
    onBack,
}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAnalysts, setSelectedAnalysts] = useState([]);
    const [dialogAnalysts, setDialogAnalysts] = useState([]);
    const [localFormData, setLocalFormData] = useState({
        estimasiSelesai: formData?.estimasiSelesai || "",
        catatan: formData?.catatan || "",
    });

    useEffect(() => {
        if (formData?.analysts && Array.isArray(formData.analysts)) {
            const analystIds = formData.analysts;

            const selected = analystsData.filter((a) =>
                analystIds.includes(a.id)
            );
            setSelectedAnalysts(selected);
        }
    }, [formData?.analysts]);

    useEffect(() => {
        setLocalFormData({
            estimasiSelesai: formData?.estimasiSelesai || "",
            catatan: formData?.catatan || "",
        });
    }, [formData]);

    useEffect(() => {
        if (openDialog) {
            setDialogAnalysts([...selectedAnalysts]);
        }
    }, [openDialog, selectedAnalysts]);

    // const analystsData = [
    //     { id: 1, name: "Bambang", spesialist: "Uji Makanan" },
    //     { id: 2, name: "Siti", spesialist: "Uji Kimia" },
    //     { id: 3, name: "Andi", spesialist: "Uji Logam" },
    //     { id: 4, name: "Joni", spesialist: "Uji Api" },
    //     { id: 5, name: "Agus", spesialist: "Uji Makan" },
    //     { id: 7, name: "Ope", spesialist: "Uji Makan" },
    //     { id: 6, name: "Merry", spesialist: "Uji Makan" },
    // ];

    const useAnalysts = () => {
        return {
            data: analystsData,
        };
    };

    const handleAnaystsSelect = (analysts) => {
        if (!analysts) return toast.error(`analist ${analysts} tidak terkirim`);

        setDialogAnalysts((prev) => {
            const exists = prev.find((s) => s.id === analysts.id);
            return exists
                ? prev.filter((s) => s.id !== analysts.id)
                : [...prev, { ...analysts, value: analysts.value ?? "" }];
        });
    };

    const handleTambahAnalysts = () => {
        setSelectedAnalysts(dialogAnalysts);
        setOpenDialog(false);
    };

    const handleNextClick = () => {
        // Save analysts dan form data sebelum lanjut
        const analystIds = selectedAnalysts.map((a) => a.id);
        const data = {
            analysts: analystIds,
            estimasiSelesai: localFormData.estimasiSelesai,
            catatan: localFormData.catatan,
        };
        onAnalystsSelect(data);

        onNext();
    };

    const handleEstimasiChange = (date) => {
        const dateString = date ? date.toISOString().split("T")[0] : "";
        setLocalFormData((prev) => ({
            ...prev,
            estimasiSelesai: dateString,
        }));
    };

    const handleCatatanChange = (e) => {
        setLocalFormData((prev) => ({
            ...prev,
            catatan: e.target.value,
        }));
    };

    return (
        <div className="space-y-6">
            {/* Grid Layout: 2 kolom */}
            <div className="grid grid-cols-2 gap-6">
                {/* KOLOM KIRI: Form Fields */}
                <div className="space-y-6">
                    {/* Estimasi Order Selesai */}
                    <DatePicker
                        label="Estimasi Order Selesai"
                        value={localFormData.estimasiSelesai}
                        onChange={handleEstimasiChange}
                    />

                    {/* Catatan */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Catatan
                        </label>
                        <textarea
                            value={localFormData.catatan}
                            onChange={handleCatatanChange}
                            placeholder="Catatan untuk pengujian"
                            rows="4"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 resize-none"
                        />
                    </div>
                </div>

                {/* KOLOM KANAN: Analis */}
                <div className="space-y-4">
                    {/* Header dengan button */}
                    <div className="flex font-semibold items-center justify-between">
                        <h2 className="text-xl text-primary-hijauGelap">
                            Analis
                        </h2>
                        <Button
                            onClick={() => setOpenDialog(true)}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors px-6 py-2 rounded-lg"
                        >
                            + Tambah Analis
                        </Button>
                    </div>

                    {/* Tabel Analis */}
                    <ManagedDataTable
                        data={selectedAnalysts || []}
                        columns={getAnalystColumns}
                        showSearch={false}
                        showCreate={false}
                        showFilter={false}
                    />
                </div>
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
                onOpenChange={setOpenDialog}
                selectedItems={dialogAnalysts}
                onSelect={handleAnaystsSelect}
                onConfirm={handleTambahAnalysts}
                getColumns={getParameterAnalystColumns}
                showCreate={false}
            />
        </div>
    );
}
