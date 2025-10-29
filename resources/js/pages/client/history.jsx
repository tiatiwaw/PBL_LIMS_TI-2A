// resources/js/pages/client/history.jsx

import React from 'react'; // <-- PENTING: Untuk menghindari error 'React is not defined'
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from '@inertiajs/react';
import { ChevronsLeft } from 'lucide-react';

const history = ({ id }) => {
    const user = {
        name: 'Nardo',
        role: 'Client',
        avatar: 'https://i.pravatiar.cc/150?img=3',
    }

    const timelineData = [
        { date: 'Senin, 20 Oktober 2025', title: 'Uji Lab 2' },
        { date: 'Jumat, 17 Oktober 2025', title: 'Persetujuan Supervisor' },
        { date: 'Kamis, 16 Oktober 2025', title: 'Uji Lab 1' },
        { date: 'Kamis, 16 Oktober 2025', title: 'Penyerahan Sampel Uji' },
    ];

    return (
        <DashboardLayout title={`Riwayat ${id || ''}`} user={user} header='Selamat Datang, Sangwon!'>

            <div className="w-full flex flex-col justify-between min-h-[70vh] text-primary-hijauTua p-6 bg-cyan-100 rounded-2xl shadow-lg">

                {/* Kontainer timeline */}
                <div className="relative pl-8 py-4">
                    {/* Garis vertikal (tetap sama) */}
                    <div className="absolute left-4 top-5 bottom-5 w-1.5 bg-primary-hijauTua rounded-full -translate-x-1/2"></div>

                    <div className="flex flex-col gap-10">
                        {timelineData.map((item, index) => (
                            <div key={index} className="relative">

                                {/* MODIFIKASI: Styling titik (dot) diubah
                                  - 'index === 0' (item pertama) akan mendapat style 'outline'
                                  - Sisanya akan mendapat style 'solid'
                                */}
                                <div className={`absolute -left-4 top-1 w-5 h-5 rounded-full -translate-x-1/2
                                    ${index === 0
                                        ? 'bg-white border-4 border-primary-hijauTua' // Style 'outline' untuk item pertama
                                        : 'bg-primary-hijauTua' // Style 'solid' untuk sisanya
                                    }
                                `}></div>

                                <div className="ml-6">
                                    {/* MODIFIKASI: Warna teks tanggal diubah dari gray-500 */}
                                    <p className="font-medium text-primary-hijauTua text-sm">{item.date}</p>
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tombol Kembali (tetap ada untuk navigasi) */}
                <div className="w-full flex justify-end mt-10"> {/* Diberi margin-top agar tidak menempel */}
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
