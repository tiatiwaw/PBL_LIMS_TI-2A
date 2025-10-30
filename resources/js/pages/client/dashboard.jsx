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
        { title: 'Total Sampel', value: 20, subtitle: 'Berdasarkan Bulan Terakhir' },
        { title: 'Sedang Diuji', value: 20, subtitle: 'Berdasarkan Bulan Terakhir' },
        { title: 'Selesai', value: 20, subtitle: 'Berdasarkan Bulan Terakhir' },
    ];

    const tableData = [
        { kode: 'M-10', status: 'Sedang Diuji', tanggal: '12/10/25' },
        { kode: 'M-09', status: 'Sedang Diuji', tanggal: '10/10/25' },
        { kode: 'M-08', status: 'Selesai', tanggal: '07/10/25' },
        { kode: 'M-07', status: 'Selesai', tanggal: '12/10/25' },
        { kode: 'M-02', status: 'Selesai', tanggal: '12/10/25' },
    ];

    return (
        <DashboardLayout title="Client" user={user} header='Selamat Datang Client!'>
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">

                {/* --- Bagian 3 Kartu Statistik --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {statCardsData.map((card) => (
                        <div key={card.title} className="bg-white rounded-xl shadow-lg p-5 flex items-center gap-2 border border-gray-100">
                            <div className="p-3 bg-cyan-100 rounded-lg">
                                <ClipboardList size={28} className="text-cyan-200" />
                            </div>
                            <div className="text-primary-hijauTua">
                                <span className="text-sm font-semibold text-gray-500">{card.title}</span>
                                <p className="text-3xl font-bold">{card.value}</p>
                                <span className="text-xs text-gray-200">{card.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Judul "Sampel" --- */}
                <h2 className="text-2xl font-bold text-center text-primary-hijauTua">
                    Daftar Pesanan
                </h2>

                {/* --- Kontainer Tabel --- */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-2 py-3 text-center text-sm font-semibold text-primary-hijauTua">Kode Order</th>
                                <th className="px-2 py-3 text-center text-sm font-semibold text-primary-hijauTua">Status</th>
                                <th className="px-2 py-3 text-center text-sm font-semibold text-primary-hijauTua">Tanggal</th>
                                <th className="px-2 py-3 text-center text-sm font-semibold text-primary-hijauTua">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tableData.map((item) => (
                                <tr key={item.kode} className="text-gray-700">
                                    <td className="px-2 py-3 whitespace-nowrap text-sm text-center font-medium">{item.kode}</td>
                                    <td className="px-2 py-3 whitespace-nowrap text-sm text-center font-medium">
                                        <span className={`px-2 py-1.5 rounded-full text-xs font-semibold text-white
                                            ${item.status === 'Sedang Diuji' ? 'bg-teal-500' : 'bg-cyan-500'}
                                        `}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-2 py-3 whitespace-nowrap text-sm text-center font-medium">{item.tanggal}</td>
                                    <td className="px-2 py-3 whitespace-nowrap align-middle text-center">
                                        <div className="flex items-center justify-center gap-2">

                                            {item.status === 'Sedang Diuji' ? (
                                                <Link
                                                    href="/client/details"
                                                    className="bg-cyan-100 text-cyan-800 p-2 rounded-full hover:bg-cyan-200 flex items-center gap-1.5 relative group"
                                                >
                                                    <FileText size={18} />
                                                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white bg-gray-800 rounded-md scale-0 group-hover:scale-100 transition-all duration-150 whitespace-nowrap">
                                                        Lihat Detail
                                                    </span>
                                                </Link>
                                            ) : (
                                                <button
                                                    className="bg-cyan-100 text-cyan-800 p-2 rounded-full hover:bg-cyan-200 flex items-center gap-1.5 relative group"
                                                >
                                                    <Download size={18} />
                                                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white bg-gray-800 rounded-md scale-0 group-hover:scale-100 transition-all duration-150 whitespace-nowrap">
                                                        Unduh Laporan
                                                    </span>
                                                </button>
                                            )}

                                            <Link
                                                href={`/client/history/`}
                                                className="bg-gray-100 text-gray-800 p-2 rounded-full hover:bg-gray-200 flex items-center gap-1.5 relative group"
                                            >
                                                <History size={18} />
                                                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white bg-gray-800 rounded-md scale-0 group-hover:scale-100 transition-all duration-150 whitespace-nowrap">
                                                    Lihat Riwayat
                                                </span>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* --- Pagination --- */}
                    <div className="px-2 py-3 flex items-center gap-3 border-t border-gray-200">
                        <button className="text-gray-500 hover:text-primary-hijauTua disabled:text-gray-300">
                            <ChevronLeft size={20} />
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-sm font-bold text-primary-hijauTua">
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
