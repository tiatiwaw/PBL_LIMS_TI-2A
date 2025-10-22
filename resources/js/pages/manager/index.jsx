import DashboardLayout from "@/components/layouts/dashboard-layout";
import { stats } from "@/data/manager/beranda";

export default function HomePage() {
    const user = {
        name: 'Yapi',
        role: 'Manager',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    return (
        <DashboardLayout title="Home" user={user} header='Selamat Datang, Manager!'>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
                            <div className="bg-primary-hijauTerang p-4 rounded-lg">
                                <stat.icon size={28} className="text-primary-hijauTua" />
                            </div>
                            <div>
                                <p className="text-primary-hijauTua font-bold text-sm">{stat.title}</p>
                                <p className="text-3xl font-bold text-primary-hijauTua">{stat.value}</p>
                                <p className="text-primary-hijauTua font-bold text-xs mt-1">{stat.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
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