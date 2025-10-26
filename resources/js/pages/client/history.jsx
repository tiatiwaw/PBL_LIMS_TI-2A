import React from 'react'
import DashboardLayout from "@/components/layouts/dashboard-layout";

import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

const history = ({ id }) => {
    const user = {
        name: 'Nardo',
        role: 'Client',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    const timelineData = [
        { date: 'Senin, 20 Oktober 2025', title: 'Uji Lab 2' },
        { date: 'Jumat, 17 Oktober 2025', title: 'Persetujuan Supervisor' },
        { date: 'Kamis, 16 Oktober 2025', title: 'Uji Lab 1' },
        { date: 'Kamis, 16 Oktober 2025', title: 'Penyerahan Sampel Uji' },
    ];

    return (
        <DashboardLayout title={`Riwayat ${id || ''}`} user={user} header='Selamat Datang, Sangwon!'>

            <div className="w-full mx-auto flex flex-col justify-between min-h-[70vh] text-primary-hijauTua p-4">
                <div className="relative pl-8 py-4">
                    <div className="absolute left-4 top-5 bottom-5 w-1.5 bg-primary-hijauTua rounded-full -translate-x-1/2"></div>
                    <div className="flex flex-col gap-10">
                        {timelineData.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-4 top-1 w-5 h-5 bg-primary-hijauTua rounded-full border-4 border-white -translate-x-1/2"></div>
                                <div className="ml-6">
                                    <p className="font-medium text-gray-500 text-sm">{item.date}</p>
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full flex justify-end mt-10">
                    <Link
                        href="/"
                        className="bg-primary-hijauTua text-white font-semibold py-2 px-5 rounded-full flex items-center gap-2 text-sm shadow"
                    >
                        Kembali
                        <span className="bg-white/30 rounded-full w-5 h-5 flex items-center justify-center">
                            <ChevronRight size={16} />
                        </span>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default history;
