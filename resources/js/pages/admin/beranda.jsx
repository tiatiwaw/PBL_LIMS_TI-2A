import DashboardLayout from "@/components/layouts/dashboard-layout";
import { BookText } from "lucide-react";

// StatCard.jsx
const StatCard = ({ icon: Icon, title, value, subtitle }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-56 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1">

      <div className="flex items-center justify-left gap-3">
        <div
          className=" bg-primary-hijauTua p-2 rounded-md flex items-center justify-center"
        >
          <Icon size={20} className="text-white" />
        </div>

        <div>
          <p className="text-primary-hijauTua font-semibold">{title}</p>
        </div>
      </div>

      <p className="text-5xl font-bold text-primary-hijauTua my-2">{value}</p>

      <p className="text-sm text-primary-hijauTua mt-1">{subtitle}</p>
    </div>
  );
};

const BottomDiagramSection = ({ title }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 h-[250px]">
    <h2 className="text-xl font-semibold text-primary-hijauTua mb-4">{title}</h2>
    <p>Diagram di sini...</p>
  </div>
);

const BottomTableSection = ({ title }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 h-[400px]">
    <h2 className="text-xl font-semibold text-primary-hijauTua mb-4">{title}</h2>
    <p>Konten di sini...</p>
  </div>
);

const BottomLayout = () => {
  return (
    <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <BottomDiagramSection title="Clients" />
      <BottomTableSection title="Bahan" />
      <BottomDiagramSection title="Order" />
      <BottomTableSection title="Alat" />
      <BottomDiagramSection title="User" />
    </div>
  );
};


export default function berandaPage() {
    const user = {
        name: 'Ben No Han',
        role: 'Admin',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    const stats = [
        { title: 'Total Clients', value: '40', subtitle: 'increased from last month', icon: BookText },
        { title: 'Total Orders', value: '15', subtitle: 'increased from last month', icon: BookText },
        { title: 'Total Analis', value: '30', subtitle: 'increased from last month', icon: BookText },
        { title: 'Total Reagen', value: '25', subtitle: 'increased from last month', icon: BookText },
    ];

    return (
        <DashboardLayout title="Home" user={user} header='Selamat Datang Admin!'>
            <div className="flex items-center justify-center text-primary-hijauTua font-bold flex gap-2">
                {stats.map((stat, index) => (
                        <StatCard 
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            subtitle={stat.subtitle}
                            icon={stat.icon}
                            color={stat.color}

                        />
                    ))}
            </div>

            <div><BottomLayout/></div>            


        </DashboardLayout>
    );
}
