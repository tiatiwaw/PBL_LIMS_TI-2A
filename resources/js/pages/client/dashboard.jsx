import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from '@inertiajs/react';

import {
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    History,
    FileText,
    Download
} from 'lucide-react';

const dashboard = () => {

    const user = {
        name: 'Nardo',
        role: 'Client',
        avatar: 'https://i.pravatar.cc/150?img=3',
    };

    const statCardsData = [
        { title: 'Total Sampel', value: 40, subtitle: 'Berdasarkan Bulan Terakhir' },
        { title: 'Sedang Diuji', value: 40, subtitle: 'Berdasarkan Bulan Terakhir' },
        { title: 'Selesai', value: 40, subtitle: 'Berdasarkan Bulan Terakhir' },
    ];

    const tableData = [
        { kode: 'M-10', nama: 'Buah Naga', status: 'Sedang Diuji', tanggal: '12/10/25' },
        { kode: 'M-09', nama: 'Jus Seledri', status: 'Sedang Diuji', tanggal: '10/10/25' },
        { kode: 'M-08', nama: 'Sagu Tempe', status: 'Selesai', tanggal: '07/10/25' },
        { kode: 'M-07', nama: 'Buah Naga', status: 'Selesai', tanggal: '12/10/25' },
        { kode: 'M-06', nama: 'Buah Naga', status: 'Selesai', tanggal: '12/10/25' },
    ];

    return (
        <DashboardLayout title="Client" user={user} header='Selamat Datang Client!'>
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">

                {/* --- Bagian 3 Kartu Statistik --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statCardsData.map((card) => (
                        <div key={card.title} className="bg-white rounded-xl shadow-lg p-5 flex items-center gap-4 border border-gray-100">
                            <div className="p-3 bg-cyan-100 rounded-lg">
                                <ClipboardList size={28} className="text-cyan-600" />
                            </div>
                            <div className="text-primary-hijauTua">
                                <span className="text-sm font-semibold text-gray-500">{card.title}</span>
                                <p className="text-3xl font-bold">{card.value}</p>
                                <span className="text-xs text-gray-400">{card.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Judul "Sampel" --- */}
                <h2 className="text-2xl font-bold text-center text-primary-hijauTua">
                    Sampel
                </h2>

                {/* --- Kontainer Tabel --- */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-hijauTua">Kode Order</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-hijauTua">Nama Sampel</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-hijauTua">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-hijauTua">Tanggal</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-hijauTua">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tableData.map((item) => (
                                <tr key={item.kode} className="text-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.kode}</td>
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
                                        <div className="flex items-center gap-2">
                                            {item.status === 'Sedang Diuji' ? (
                                                <Link href="/client/details" className="bg-cyan-100 text-cyan-800 px-5 py-1.5 rounded-full text-xs font-semibold hover:bg-cyan-200 flex items-center gap-1.5">
                                                    <FileText size={13} />
                                                    Detail
                                                </Link>
                                            ) : (
                                                <button className="bg-cyan-100 text-cyan-800 px-5 py-1.5 rounded-full text-xs font-semibold hover:bg-cyan-200 flex items-center gap-1.5">
                                                    <Download size={13} />
                                                    Unduh Laporan
                                                </button>
                                            )}

                                            {/* --- PERBAIKAN DI SINI --- */}
                                            <Link
                                                href={`/client/history/`}
                                                className="bg-gray-100 text-gray-800 px-5 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-200 flex items-center gap-1.5"
                                            >
                                                <History size={13} />
                                                Riwayat
                                            </Link> {/* <-- Ini sudah diperbaiki dari </Kink> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* --- Pagination --- */}
                    <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-200">
                        <button className="text-gray-500 hover:text-primary-hijauTua disabled:text-gray-300">
                            <ChevronLeft size={20} />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-400 text-sm font-bold text-primary-hijauTua">
                            1
                        </span>
                        <button className="text-gray-500 hover:text-primary-hijauTua disabled:text-gray-300">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default dashboard;
