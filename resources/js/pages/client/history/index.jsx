import React from 'react';
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from '@inertiajs/react';
import {
    ChevronsLeft,
    FlaskConical,
    ClipboardCheck,
    RotateCw,
    PackageCheck,
    Clock,
    CalendarDays,
    CheckCircle2
} from 'lucide-react';

export default function HistoryPage({ auth, id }) {
    const currentUser = auth?.user || { name: "King Akbar", role: "Client" };

    const timelineData = [
        {
            title: 'Sample 1 selesai diuji',
            date: 'Senin, 20 Okt 2025',
            estimateTime: 2,
            icon: FlaskConical,
            status: 'active'
        },
        {
            title: 'Sample 2 selesai diuji',
            date: 'Jumat, 17 Okt 2025',
            estimateTime: 3,
            icon: FlaskConical,
            status: 'completed'
        },
        {
            title: 'Sample 1 diuji ulang',
            date: 'Kamis, 16 Okt 2025',
            estimateTime: 1,
            icon: RotateCw,
            status: 'completed'
        },
        {
            title: 'Sample 1 selesai diproses & siap',
            date: 'Kamis, 16 Okt 2025',
            estimateTime: 1,
            icon: PackageCheck,
            status: 'completed'
        },
        {
            title: 'Pesanan diselesaikan',
            date: 'Kamis, 16 Okt 2025',
            estimateTime: 1,
            icon: ClipboardCheck,
            status: 'completed'
        },
    ];

    const totalEstimate = timelineData.reduce((acc, item) => acc + item.estimateTime, 0);

    return (
        <DashboardLayout title={`Riwayat ${id || ''}`} user={currentUser} header='Selamat Datang, Sangwon!'>

            <div className="w-full flex flex-col px-8 pt-8 pb-6 bg-gradient-to-br from-primary-hijauTerang via-white to-primary-toska overflow-auto rounded-3xl shadow-xl border border-primary-hijauPudar min-h-[75vh]">

                <div className="flex-shrink-0 mb-8">
                    <div className="inline-flex items-center gap-3 bg-primary-hijauTua text-white px-6 py-3 rounded-2xl shadow-md">
                        <div className="w-2 h-2 rounded-full bg-primary-hijauMuda animate-pulse" />
                        <span className="text-lg font-bold tracking-wide">
                            Kode Order: {id || 'M-XX'}
                        </span>
                    </div>
                </div>

                <div className="flex-grow flex flex-col justify-center w-full">
                    <div className="relative w-full py-8 overflow-x-auto">

                        <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 min-w-max px-6">

                            <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-1.5 bg-primary-hijauPudar rounded-full">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-hijauTua to-primary-hijauMuda rounded-full transition-all duration-1000"
                                    style={{ width: '80%' }}
                                />
                            </div>

                            <div className="lg:hidden absolute left-[31px] top-0 bottom-0 w-1.5 bg-primary-hijauPudar rounded-full">
                                <div
                                    className="w-full bg-gradient-to-b from-primary-hijauTua to-primary-hijauMuda rounded-full transition-all duration-1000"
                                    style={{ height: '80%' }}
                                />
                            </div>

                            {timelineData.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative z-10 flex flex-row lg:flex-col items-center lg:items-center text-left lg:text-center gap-4 lg:gap-0 flex-shrink-0 group"
                                >
                                    <div className={`
                                        relative w-16 h-16 top-5 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300
                                        ${item.status === 'active'
                                            ? 'bg-white border-4 border-primary-hijauTua text-primary-hijauTua shadow-lg scale-110'
                                            : 'bg-primary-hijauTua text-white border-4 border-primary-hijauMuda shadow-md'
                                        }
                                        group-hover:scale-110 group-hover:shadow-xl
                                    `}>
                                        <item.icon size={28} strokeWidth={2.5} />

                                        {item.status === 'completed' && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-hijauMuda rounded-full flex items-center justify-center border-2 border-white">
                                                <CheckCircle2 size={14} className="text-white" strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 lg:flex-none lg:mt-10">
                                        <h3 className={`text-base font-bold mb-2 transition-colors ${item.status === 'active'
                                            ? 'text-primary-hijauTua'
                                            : 'text-primary-hijauGelap'
                                            }`}>
                                            {item.title}
                                        </h3>

                                        <div className="flex justify-center items-center gap-2 text-sm text-primary-hijauTua/70">
                                            <CalendarDays size={16} />
                                            <span className="whitespace-nowrap font-medium">{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 mt-6 border-t-2 border-primary-hijauPudar">
                    <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md border border-primary-hijauPudar">
                        <div className="w-10 h-10 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                            <Clock size={20} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-primary-hijauTua/60 font-medium">Total Estimasi</span>
                            <span className="text-xl font-bold text-primary-hijauTua">{totalEstimate} Hari</span>
                        </div>
                    </div>

                    <Link
                        href="/client"
                        className="bg-primary-hijauTua hover:bg-primary-hijauGelap text-white font-semibold py-3 px-8 rounded-2xl flex items-center gap-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                        <ChevronsLeft size={20} />
                        <span>Kembali</span>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
};