// import DashboardLayout from "@/components/layouts/dashboard-layout";
// import {ChevronRight} from 'lucide-react';

// const dashboard = () => {
//     const user = {
//             name: 'Nardo',
//             role: 'Client',
//             avatar: 'https://i.pravatar.cc/150?img=3',
//         }

//         // const items = Array.from({ length: 10 }, (_, i) => `Nama Sample ${i + 1}`);

//         return (
//             <DashboardLayout title="Client" user={user} header='Selamat Datang Client!'>
//                 <div className="flex flex-col items-center justify-center text-primary-hijauTua font-bold gap-2">

//                 </div>
//             </DashboardLayout>
//         )
// }

// export default dashboard


import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ChevronsLeft } from 'lucide-react';

const details = () => {
    const user = {
        name: 'Nardo',
        role: 'Client',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    // Data untuk ditampilkan di kartu
    const sampleInfo1 = [
        { label: 'Nama Sample', value: 'Gas Metabolisme Tubuh' },
        { label: 'Jenis Sample', value: 'Gas' },
        { label: 'Banyak Sample', value: '5 ml' },
        { label: 'Kondisi Sample', value: 'Good' },
        { label: 'Suhu Sample', value: '18 C' },
        { label: 'Tanggal Masuk', value: '12 September 2025' },
    ];

    const sampleInfo2 = [
        { label: 'Tanggal Diuji', value: '10 Oktober 2025' },
        { label: 'Status', value: 'Sedang Diuji' },
    ];

    // const items = Array.from({ length: 10 }, (_, i) => `Nama Sample ${i + 1}`);

    return (
        <DashboardLayout title="Client" user={user} header='Selamat Datang Client!'>
            <div className="flex flex-col items-center justify-center text-primary-hijauTua font-bold gap-2">

                {/* --- Bagian Header Konten --- */}
                <div className="flex justify-between items-center w-full text-xl font-bold">
                    <button className="">
                        Detail
                    </button>
                    <div className="flex items-center gap-3">
                        <h2 className="">Buah Naga</h2>
                    </div>
                </div>

                {/* --- Kartu Informasi Sample --- */}
                <div className="bg-cyan-100 rounded-2xl p-6 w-full shadow-lg">

                    {/* Bagian Sample 1 */}
                    <div className="mb-6">
                        <div className="bg-teal-500 text-white font-bold text-lg py-3 px-5 rounded-lg mb-5">
                            Sample
                        </div>
                        <div className="pl-3 space-y-3">
                            {sampleInfo1.map((item) => (
                                <div key={item.label} className="flex text-base">
                                    {/* Memberi lebar tetap pada label agar rapi */}
                                    <span className="w-40 font-medium">{item.label}</span>
                                    <span className="mr-3">:</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bagian Sample 2 */}
                    <div>
                        <div className="bg-teal-500 text-white font-bold text-lg py-3 px-5 rounded-lg mb-5">
                            Sample
                        </div>
                        <div className="pl-3 space-y-3">
                            {sampleInfo2.map((item) => (
                                <div key={item.label} className="flex text-base">
                                    <span className="w-40 font-medium">{item.label}</span>
                                    <span className="mr-3">:</span>
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Tombol Aksi Footer --- */}
                <div className="w-full flex justify-end">
                    <a href="./" className="bg-primary-hijauTua text-white font-semibold py-2 px-5 rounded-full flex items-center gap-2 text-sm shadow">
                    <ChevronsLeft size={18} />
                        Kembali
                    </a>
                </div>

            </div>
        </DashboardLayout>
    )
}

export default details;
