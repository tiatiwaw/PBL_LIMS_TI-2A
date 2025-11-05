import React, { useState, useEffect, useMemo } from "react";
import { Clients } from "@/data/staff/clients";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Search } from "lucide-react"; // Import Search icon

// PASTIKAN JALUR INI BENAR
import TableMethodsOrd from "@/components/shared/staff/data-methods";
import { methods } from "@/data/staff/methods";

// --- KOMPONEN DIALOG KLIEN BARU DENGAN SEARCH DAN SELEKSI ---
const ClientSelectionDialog = ({ isOpen, onOpenChange, onSelectClient, initialSearchQuery }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
    
    // Inisialisasi state search term saat dialog dibuka
    useEffect(() => {
        setSearchTerm(initialSearchQuery);
    }, [initialSearchQuery]);

    // Logika Filtering/Searching Klien
    const filteredClients = useMemo(() => {
        const query = searchTerm.toLowerCase().trim();
        if (!query) return Clients; // Tampilkan semua jika kosong
        
        return Clients.filter(client => 
            client.name.toLowerCase().includes(query) || 
            client.id.toString().includes(query) ||
            client.email.toLowerCase().includes(query)
        );
    }, [searchTerm]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Pilih Klien</DialogTitle>
                    <DialogDescription>
                        Cari dan pilih klien yang akan dibuatkan order.
                    </DialogDescription>
                </DialogHeader>

                {/* Search Input */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari klien berdasarkan nama, ID, atau email..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tabel Klien (Simulasi) */}
                <div className="flex-grow overflow-y-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12">Email</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                    <tr key={client.id} className="hover:bg-teal-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{client.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                            <Button 
                                                size="sm" 
                                                onClick={() => onSelectClient(client)}
                                                className="bg-teal-500 hover:bg-teal-600 text-white"
                                            >
                                                Pilih
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                        Tidak ada klien ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="bg-gray-200 hover:bg-gray-300"
                    >
                        Tutup
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
// --- AKHIR KOMPONEN DIALOG KLIEN BARU ---

export default function OrdersForm() {
    const [isMethodDialogOpen, setIsMethodDialogOpen] = useState(false);
    const [dialogSelectedMethods, setDialogSelectedMethods] = useState([]);

    // >>> State untuk Dialog Klien (Tetap)
    const [isClientSearchDialogOpen, setIsClientSearchDialogOpen] = useState(false);
    // filteredClients tidak perlu lagi di sini, karena filternya ada di komponen dialog

    const [formData, setFormData] = useState({
        searchKlien: "",
        selectedKlien: null,
        judulOrder: "",
        metodeAnalisis: [],
        nomorOrder: "Auto-Generate Nomor order",
    });

    useEffect(() => {
        if (isMethodDialogOpen) {
            setDialogSelectedMethods((formData.metodeAnalisis || []).map(m => ({ ...m })));
        }
    }, [isMethodDialogOpen, formData.metodeAnalisis]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Fungsi yang dipanggil saat tombol "Pilih Klien" di klik ATAU saat input diubah (jika ingin membuka dialog saat mengetik)
    const handleOpenClientDialog = () => {
        setIsClientSearchDialogOpen(true);
    }
    
    // Fungsi baru untuk menangani pemilihan klien dari dialog
    const handleSelectClient = (client) => {
        setFormData((prev) => ({
            ...prev,
            selectedKlien: client,
            searchKlien: client.name, // Perbarui input dengan nama klien
        }));
        setIsClientSearchDialogOpen(false); // Tutup dialog
    };
    
    // Fungsi untuk mengubah state buka/tutup dialog klien
    const handleClientDialogChange = (open) => {
        setIsClientSearchDialogOpen(open);
    };
    
    // --- Logika Penanganan Metode Analisis (Tetap) ---

    const handleOpenDialog = () => {
        setIsMethodDialogOpen(true);
    };

    const handleDialogChange = (open) => {
        if (!open) {
            setDialogSelectedMethods((formData.metodeAnalisis || []).map(m => ({ ...m })));
        }
        setIsMethodDialogOpen(open);
    };

    const handleSelectionUpdate = (newlySelectedObjects) => {
        const finalMethods = newlySelectedObjects.map(newMethod => {
            const existingMethod = formData.metodeAnalisis.find(m => m.id === newMethod.id);
            return {
                ...newMethod,
                deskripsi: existingMethod?.deskripsi ?? "",
                harga: newMethod.harga ?? 0
            };
        });
        setDialogSelectedMethods(finalMethods);
    };

    const handleTambahkanMetode = () => {
        setFormData((prev) => ({
            ...prev,
            metodeAnalisis: dialogSelectedMethods,
        }));
        setIsMethodDialogOpen(false);
    };

    const handleRemoveMethod = (methodId) => {
        const updatedMethods = formData.metodeAnalisis.filter(
            (m) => m.id !== methodId
        );
        setFormData((prev) => ({
            ...prev,
            metodeAnalisis: updatedMethods,
        }));
    };

    const handleMethodDescChange = (methodId, deskripsi) => {
        setFormData((prev) => {
            const updated = (prev.metodeAnalisis || []).map((m) =>
                m.id === methodId ? { ...m, deskripsi } : m
            );
            return { ...prev, metodeAnalisis: updated };
        });
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const totalHarga = useMemo(() => {
        return formData.metodeAnalisis.reduce((sum, method) => sum + (method.harga || 0), 0);
    }, [formData.metodeAnalisis]);


    return (
        <div className="p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                {/* Left Column - Nomor Order & Pilih Klien */}
                <div className="space-y-6">
                    {/* Header Langkah 1 */}
                    <div className="flex items-center space-x-4 mb-8">
                        <span className="flex items-center justify-center w-10 h-10 text-white bg-teal-500 rounded-full font-bold">1</span>
                        <h2 className="text-xl font-bold text-gray-800">Klien dan Order</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Nomor Order</label>
                        <div
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-300
                            rounded-lg text-gray-700 font-medium"
                        >
                            {formData.nomorOrder}
                        </div>
                    </div>

                    {/* Input Pilih Klien dengan Tombol Dialog */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">Pilih Klien</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="searchKlien"
                                value={formData.searchKlien}
                                onChange={handleChange}
                                placeholder="Pilih klien dari daftar..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-teal-500
                               focus:border-transparent cursor-pointer"
                                readOnly // Agar tidak bingung apakah harus diketik atau klik tombol
                                onClick={handleOpenClientDialog}
                            />
                            {/* <Button 
                                type="button" 
                                onClick={handleOpenClientDialog} 
                                className="bg-teal-500 hover:bg-teal-600 text-white"
                            >
                            </Button> */}
                        </div>
                    </div>
                    
                    {/* Informasi Klien yang Dipilih (Tetap) */}
                    <div className="space-y-3 pt-2">
                         {/* ... (Konten Informasi Klien Tetap) ... */}
                        <div>
                            <p className="text-xs font-medium text-gray-500">Nama</p>
                            <p className="text-gray-700 font-semibold">
                                {formData.selectedKlien
                                    ? formData.selectedKlien.name
                                    : "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500">Email</p>
                            <p className="text-gray-700 font-semibold">
                                {formData.selectedKlien
                                    ? formData.selectedKlien.email
                                    : "-"}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500">Nomor</p>
                            <p className="text-gray-700 font-semibold">
                                {formData.selectedKlien
                                    ? formData.selectedKlien.phone_number
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Judul Order & Metode Analisis (Tetap) */}
                <div className="space-y-6">
                    {/* ... (Konten Judul Order dan Metode Analisis Tetap) ... */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Judul Order</label>
                        <input
                            type="text"
                            name="judulOrder"
                            value={formData.judulOrder}
                            onChange={handleChange}
                            placeholder="Masukkan judul order"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-teal-500
                           focus:border-transparent"
                        />
                    </div>

                    {/* Bagian Metode Analisis dengan Tombol Dialog */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold">Metode Analisis</label>
                            <button
                                type="button"
                                onClick={handleOpenDialog}
                                className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-md transition-colors text-xs"
                            >
                                Pilih Metode
                            </button>
                        </div>

                        {/* Kotak daftar metode yang dipilih */}
                        <div className="border border-gray-300 rounded-lg p-4 bg-white space-y-3">
                            {formData.metodeAnalisis.length > 0 ? (
                                formData.metodeAnalisis.map((method, index) => (
                                    <div
                                        key={method.id}
                                        className="border-b border-gray-200 pb-3"
                                    >
                                        <div className="flex items-start justify-between">
                                            <p className="font-semibold text-sm">
                                                {index + 1}. {method.name || method.label}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveMethod(method.id)}
                                                    className="text-red-500 hover:text-red-700 flex items-center"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <p className="text-sm font-bold text-teal-600 ml-1">
                                                    {formatRupiah(method.harga)}
                                                </p>
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            value={method.deskripsi ?? ""}
                                            onChange={(e) =>
                                                handleMethodDescChange(
                                                    method.id,
                                                    e.target.value
                                                )
                                            }
                                            placeholder="masukkan deskripsi"
                                            className="w-full text-xs px-2 py-1 mt-2 border border-gray-200 rounded-md bg-white focus:ring-teal-500"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 text-center py-6">
                                    Belum ada metode analisis dipilih
                                </p>
                            )}

                            {formData.metodeAnalisis.length > 0 && (
                                <div className="text-right pt-3 border-t border-gray-300 mt-3">
                                    <span className="text-md font-bold text-gray-800">
                                        Total Harga: {formatRupiah(totalHarga)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog Pilih Klien (Komponen Baru) */}
            <ClientSelectionDialog
                isOpen={isClientSearchDialogOpen}
                onOpenChange={handleClientDialogChange}
                onSelectClient={handleSelectClient}
                initialSearchQuery={formData.searchKlien}
            />

            {/* Dialog Pilih Metode Analisis (Tetap) */}
            <Dialog open={isMethodDialogOpen} onOpenChange={handleDialogChange}>
                <DialogContent className="max-w-4xl flex flex-col max-h-[90vh]">
                    {/* ... (Konten Dialog Metode Analisis Tetap) ... */}
                    <DialogHeader>
                        <DialogTitle>Pilih Metode Analisis</DialogTitle>
                        <DialogDescription className="sr-only">
                            Dialog untuk memilih metode analisis yang akan ditambahkan ke
                            order
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-grow overflow-y-auto">
                        <TableMethodsOrd
                            data={methods}
                            initialSelectedIds={dialogSelectedMethods.map(m => m.id)}
                            onSelectionChange={handleSelectionUpdate}
                        />
                    </div>

                    <DialogFooter className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setIsMethodDialogOpen(false)}
                            className="bg-gray-200 hover:bg-gray-300"
                        >
                            Tutup
                        </Button>
                        <Button
                            onClick={handleTambahkanMetode}
                            disabled={dialogSelectedMethods.length === 0}
                            className="!bg-teal-500 hover:!bg-teal-600"
                        >
                            Tambahkan ({dialogSelectedMethods.length})
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}