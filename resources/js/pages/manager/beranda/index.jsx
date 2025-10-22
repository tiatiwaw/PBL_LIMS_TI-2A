import DashboardLayout from "@/components/layouts/dashboard-layout";
import { BookText, Wallet, Clock } from 'lucide-react';


const StatCard = ({ icon: Icon, title, value, subtitle }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
            <div className="bg-primary-hijauTerang p-4 rounded-lg">
                <Icon size={28} className="text-primary-hijauTua" />
            </div>
            <div>
                <p className="text-primary-hijauTua font-bold text-sm">{title}</p>
                <p className="text-3xl font-bold text-primary-hijauTua">{value}</p>
                <p className="text-primary-hijauTua font-bold text-xs mt-1">{subtitle}</p>
            </div>
        </div>
    );
};
// Statistik
const stats = [
    { title: 'Total Orders', value: '40', subtitle: 'Increased from last month', icon: BookText },
    { title: 'Pendapatan', value: '40', subtitle: 'Increased from last month', icon: Wallet },
    { title: 'Jatuh Tempo', value: '40', subtitle: 'Increased from last month', icon: Clock },
];


// --- Halaman Utama Anda (Sudah Diperbaiki) ---
export default function HomePage() {
    const user = {
        name: 'Yapi',
        role: 'Manager',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    return (
        <DashboardLayout title="Home" user={user} header='Selamat Datang, Manager!'>
            <div className="space-y-8">
                {/* Bagian Kartu Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                    {/* Diubah dari lg:grid-cols-4 menjadi lg:grid-cols-3 */}
                    {stats.map((stat, index) => (
                        <StatCard 
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            subtitle={stat.subtitle}
                            icon={stat.icon}
                        />
                    ))}
                </div>

                {/* Bagian Grafik dan Konten Lainnya */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Kolom Grafik */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                        {/* INI BAGIAN YANG DIUPDATE */}
                        <h2 className="text-xl font-bold text-primary-hijauTua text-center mb-4">Times</h2> 
                        <p className="text-center text-gray-400 py-16">
                            [Komponen Grafik Akan Ditampilkan Di Sini]
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}