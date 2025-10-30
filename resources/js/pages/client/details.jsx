import React, { useState } from 'react';
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from '@inertiajs/react';
import { ChevronsLeft, Info, X } from 'lucide-react';
const SampleInfoModal = ({ sample, onClose }) => {

    const modalData = [
        { label: 'Kategori Sampel', value: sample.kategori },
        { label: 'Wujud', value: sample.wujud },
        { label: 'Metode Penyimpanan', value: sample.metode },
        { label: 'Volume', value: sample.volume },
        { label: 'Kondisi', value: sample.kondisi },
        { label: 'Status', value: sample.statusDetail },
        { label: 'Kondisi Penyimpanan', value: sample.kondisiPenyimpanan },
    ];

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-lg relative border border-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg hover:bg-red-500 hover:text-white text-red-500 transition-all duration-200"
                >
                    <X size={28} />
                </button>

                <div className="absolute top-0 left-0 -mt-5 ml-6">
                    <div className="bg-primary-hijauTua text-white font-bold text-xl py-3 px-8 rounded-full shadow-lg">
                        {sample.nama}
                    </div>
                </div>

                {/* Konten Detail Sampel */}
                <div className="pt-16 pb-8 px-10 text-primary-hijauTua">
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-4 gap-y-3">
                        {modalData.map((item) => (
                            <React.Fragment key={item.label}>
                                <span className="font-semibold text-gray-700">{item.label}</span>
                                <span className="ml-2 font-medium">: {item.value}</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Komponen Halaman Utama ---
const details = () => {
    const [selectedSample, setSelectedSample] = useState(null);

    const user = {
        name: 'Nardo',
        role: 'Client',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    // --- Data Detail Pemesanan ---
    const orderDetails = [
        { label: 'ID Pemesanan', value: 'M - 10' },
        { label: 'ID klien', value: '1234' },
        { label: 'Metode Analisis', value: 'Basah' },
        { label: 'Judul', value: 'Gas Metabolisme Tubuh' },
        { label: 'Nilai Hasil', value: '98' },
        { label: 'Tanggal Order', value: '10/10/2000' },
        { label: 'Tanggal Estimasi', value: '23/10/2000' },
        { label: 'Waktu Laporan', value: '10/10/2000 11:14:45' },
        { label: 'Direktori File', value: 'C://' },
        { label: 'Catatan', value: 'Cukup baik' },
        { label: 'Tipe Pemesanan', value: 'Urgent' },
    ];

    // --- MODIFIKASI: Data Tabel Sampel ---
    const tableSampleData = [
        {
            nama: 'Jus Naga', status: 'Sedang Diuji', tanggal: '12/10/25',
            kategori: 'Makanan', wujud: 'Cair', metode: 'Beku (?)',
            volume: 100, kondisi: 'Baik', statusDetail: 'Pending', kondisiPenyimpanan: 'Menguap :)'
        },
        {
            nama: 'Jus Pare', status: 'Sedang Diuji', tanggal: '10/10/25',
            kategori: 'Makanan', wujud: 'Cair', metode: 'Dingin',
            volume: 150, kondisi: 'Baik', statusDetail: 'Pending', kondisiPenyimpanan: '-'
        },
        {
            nama: 'Jus Selada', status: 'Sedang Diuji', tanggal: '07/10/25',
            kategori: 'Makanan', wujud: 'Cair', metode: 'Dingin',
            volume: 150, kondisi: 'Baik', statusDetail: 'Pending', kondisiPenyimpanan: '-'
        },
        {
            nama: 'Jus Apel', status: 'Selesai', tanggal: '12/10/25',
            kategori: 'Makanan', wujud: 'Cair', metode: 'Dingin',
            volume: 100, kondisi: 'Baik', statusDetail: 'Selesai', kondisiPenyimpanan: 'Habis'
        },
        {
            nama: 'Jus Paprika', status: 'Selesai', tanggal: '12/10/25',
            kategori: 'Makanan', wujud: 'Cair', metode: 'Dingin',
            volume: 100, kondisi: 'Baik', statusDetail: 'Selesai', kondisiPenyimpanan: 'Habis'
        },
    ];
    return (
        <DashboardLayout title="Client" user={user} header='Selamat Datang Client!'>
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 text-primary-hijauTua p-4">

                {/* --- Bagian 1: Detail Pemesanan --- */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-xl font-bold mb-5 text-gray-800">Detail Pemesanan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-y-2 text-sm font-medium">
                        {orderDetails.map((item, index) => (
                            <React.Fragment key={index}>
                                <span className="text-gray-600">{item.label}</span>
                                <span className="ml-2">: {item.value}</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* --- Bagian 3: Tabel Sampel --- */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <h2 className="text-xl font-bold p-6 pb-0 text-gray-800">Sampel</h2>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nama Sampel</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tableSampleData.map((item, index) => (
                                <tr key={index} className="text-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.nama}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold text-white
                                            ${item.status === 'Sedang Diuji' ? 'bg-teal-500' : 'bg-cyan-500'}
                                        `}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.tanggal}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setSelectedSample(item)}
                                            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
                                        >
                                            <Info size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-200">
                        <button className="text-gray-500 hover:text-primary-hijauTua disabled:text-gray-300">
                            <ChevronsLeft size={20} />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-400 text-sm font-bold text-primary-hijauTua">
                            1
                        </span>
                        <button className="text-gray-500 hover:text-primary-hijauTua disabled:text-gray-300 transform rotate-180">
                            <ChevronsLeft size={20} />
                        </button>
                    </div>
                </div>

                {/* --- Tombol Kembali --- */}
                <div className="w-full flex justify-end mt-4">
                    <Link
                        href="./"
                        className="bg-primary-hijauTua text-white font-semibold py-2 px-5 rounded-full flex items-center gap-2 text-sm shadow"
                    >
                        <ChevronsLeft size={18} />
                        Kembali
                    </Link>
                </div>
            </div>

            {/* --- MODIFIKASI: Memanggil Komponen Modal --- */}
            {selectedSample && (
                <SampleInfoModal
                    sample={selectedSample}
                    onClose={() => setSelectedSample(null)}
                />
            )}

        </DashboardLayout>
    )
}

export default details;
