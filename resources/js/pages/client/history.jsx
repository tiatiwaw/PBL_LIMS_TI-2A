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
    CalendarDays
} from 'lucide-react';

const history = ({ id }) => {
    const user = {
        name: 'Nardo',
        role: 'Client',
        avatar: 'https://i.pravatiar.cc/150?img=3',
    }

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
        <DashboardLayout title={`Riwayat ${id || ''}`} user={user} header='Selamat Datang, Sangwon!'>

            {/* --- 1. MODIFIKASI CARD UTAMA --- */}
            <div className="w-full flex flex-col text-primary-hijauTua px-6 pt-6 bg-cyan-100 overflow-auto rounded-2xl shadow-lg min-h-[75vh]">

                {/* --- 2. BAGIAN HEADER CARD (Kode Order) --- */}
                <div className="flex-shrink-0">
                    <span className="text-lg font-bold text-primary-hijauTua px-3 py-1 bg-white/50 rounded-md">
                        Kode Order: {id || 'M-XX'}
                    </span>
                </div>

                {/* --- 3. KONTEN TENGAH (TIMELINE) --- */}
                <div className="flex-grow flex flex-col justify-center w-full">

                    {/* Wrapper scroll */}
<div className="relative w-full py-8 overflow-x-auto">

    {/* Timeline Container */}
    <div className="relative flex flex-col lg:flex-row items-center gap-12 min-w-max px-6">

        {/* Garis Horizontal (Desktop) */}
        <div className="hidden lg:block absolute top-[48px] left-0 right-0 h-1 bg-primary-hijauTua rounded-full" />

        {/* Garis Vertikal (Mobile) */}
        <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-primary-hijauTua rounded-full" />

        {/* Timeline Items */}
        {timelineData.map((item, index) => (
            <div
                key={index}
                className="relative z-10 flex flex-col items-center text-center p-4 flex-shrink-0"
            >
                <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center shrink-0
                    ${item.status === 'active'
                        ? 'bg-white border-4 border-primary-hijauTua text-primary-hijauTua'
                        : 'bg-primary-hijauTua text-white'
                    }
                `}>
                    <item.icon size={32} />
                </div>

                <h3 className="text-base font-semibold mt-4 mb-1 whitespace-nowrap">
                    {item.title}
                </h3>

                <div className="text-xs font-medium flex items-center gap-2 text-primary-hijauTua/80 whitespace-nowrap">
                    <CalendarDays size={14} />
                    <span>{item.date}</span>
                </div>
            </div>
        ))}

    </div>
</div>

                </div>


                {/* --- 4. FOOTER CARD (Estimasi & Kembali) --- */}
                <div className="flex-shrink-0 w-full flex justify-between items-end py-6">
                    {/* Kiri Bawah: Estimasi */}
                    <div className="text-lg font-bold text-primary-hijauTua flex items-center gap-2">
                        <Clock size={16} />
                        <span>Total Estimasi: {totalEstimate} Hari</span>
                    </div>

                    {/* Kanan Bawah: Tombol Kembali */}
                    <Link href="../" className="bg-primary-hijauTua text-white font-semibold py-2 px-5 rounded-full flex items-center gap-2 text-sm shadow">
                        <ChevronsLeft size={18} />
                        Kembali
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default history;
