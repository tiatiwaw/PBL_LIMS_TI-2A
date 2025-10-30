import React from 'react';
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from '@inertiajs/react';
import {
    ChevronsLeft,
    FlaskConical,
    UserCheck,
    Box,
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
            title: 'Uji Lab 2',
            date: 'Senin, 20 Okt 2025',
            estimateTime: 2,
            icon: FlaskConical,
            status: 'active'
        },
        {
            title: 'Persetujuan Supervisor',
            date: 'Jumat, 17 Okt 2025',
            estimateTime: 3,
            icon: UserCheck,
            status: 'completed'
        },
        {
            title: 'Uji Lab 1',
            date: 'Kamis, 16 Okt 2025',
            estimateTime: 1,
            icon: FlaskConical,
            status: 'completed'
        },
        {
            title: 'Penyerahan Sampel Uji',
            date: 'Kamis, 16 Okt 2025',
            estimateTime: 1,
            icon: Box,
            status: 'completed'
        }
    ];

    const totalEstimate = timelineData.reduce((acc, item) => acc + item.estimateTime, 0);

    return (
        <DashboardLayout title={`Riwayat ${id || ''}`} user={user} header='Selamat Datang, Sangwon!'>

            {/* --- 1. MODIFIKASI CARD UTAMA --- */}
            <div className="w-full flex flex-col text-primary-hijauTua px-6 pt-6 bg-cyan-100 rounded-2xl shadow-lg min-h-[75vh]">

                {/* --- 2. BAGIAN HEADER CARD (Kode Order) --- */}
                <div className="flex-shrink-0">
                    <span className="text-lg font-bold text-primary-hijauTua px-3 py-1 bg-white/50 rounded-md">
                        Kode Order: {id || 'M-XX'}
                    </span>
                </div>

                {/* --- 3. KONTEN TENGAH (TIMELINE) --- */}
                <div className="flex-grow flex flex-col justify-center">

                    {/* Kontainer Timeline (relative) */}
                    <div className="relative flex flex-col lg:flex-row w-full justify-between py-8">

                        {/* Garis Penghubung (Horizontal) */}
                        <div className="hidden lg:block absolute bg-primary-hijauTua"
                             style={{
                                 top: '72px',
                                 left: '50px',
                                 width: 'calc(100% - 100px)',
                                 height: '8px',
                                 borderRadius: '9999px'
                             }}
                        />
                        {/* Garis Vertikal (Mobile) */}
                        <div className="lg:hidden absolute bg-primary-hijauTua"
                             style={{
                                 left: 'calc(50% - 4px)',
                                 top: '50px',
                                 height: 'calc(100% - 100px)',
                                 width: '8px',
                                 borderRadius: '9999px'
                             }}
                        />

                        {/* Looping Item Timeline */}
                        {timelineData.map((item, index) => (
                            <div
                                key={index}
                                className="relative z-10 flex flex-col items-center text-center p-4 w-full lg:w-1/4"
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-cyan-100
                                    ${item.status === 'active'
                                        ? 'bg-white border-4 border-primary-hijauTua'
                                        : 'bg-primary-hijauTua text-white'
                                    }
                                `}>
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
                                <div className="text-sm font-medium space-y-1 text-primary-hijauTua/80">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={14} />
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
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
