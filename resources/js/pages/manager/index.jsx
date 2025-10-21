import DashboardLayout from "@/components/layouts/dashboard-layout";
import { BookText, FlaskConical, Beaker, TestTube } from 'lucide-react';

// --- Komponen kecil untuk Kartu Statistik ---
const StatCard = ({ icon: Icon, title, value, subtitle }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
            <div className="bg-primary-hijauTerang p-4 rounded-lg">
                <Icon size={28} className="text-primary-hijauTua" />
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <p className="text-gray-400 text-xs mt-1">{subtitle}</p>
            </div>
        </div>
    );
};


// --- Halaman Utama Anda ---
export default function HomePage() {
    const user = {
        name: 'Yapi',
        role: 'Manager',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    // Data dummy untuk kartu
    const stats = [
        { title: 'Total Clients', value: '40', subtitle: 'increased from last month', icon: BookText },
        { title: 'Total Orders', value: '40', subtitle: 'increased from last month', icon: FlaskConical },
        { title: 'Total Analis', value: '40', subtitle: 'increased from last month', icon: Beaker },
        { title: 'Total Reagen', value: '40', subtitle: 'increased from last month', icon: TestTube },
    ];

    return (
        <DashboardLayout title="Home" user={user} header='Selamat Datang, Manager!'>
            <div className="space-y-8">
                {/* Bagian Kartu Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Kolom Grafik */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Clients</h2>
                        {/* Di sini Anda bisa menaruh komponen grafik */}
                        <p className="text-center text-gray-400 py-16">
                            [Komponen Grafik Akan Ditampilkan Di Sini]
                        </p>
                    </div>


                </div>
            </div>

        </DashboardLayout>
    );
}