import DashboardLayout from "@/components/layouts/dashboard-layout";
import {ChevronRight} from 'lucide-react';

const Inbox = () => {
    const user = {
        name: 'Nardo',
        role: 'Analyst',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    const items = Array.from({ length: 10 }, (_, i) => `Nama Sample ${i + 1}`);

    return (
        <DashboardLayout title="Analyst" user={user} header='Selamat Datang Analyst!'>
            <div className="flex flex-col items-center justify-center text-primary-hijauTua font-bold gap-2">
                {items.map((name, index) => (
                    <div
                    key={index}
                    className="bg-[#75E2DF] w-full py-6 rounded-2xl shadow-md flex justify-between items-center px-6"
                    >
                    <p className="font-medium text-lg">{index + 1}. {name}</p>
                    <a
                        href="#"
                        className="bg-white rounded-3xl px-4 py-[4px] shadow-md flex hover:scale-110 hover:bg-gray-400 duration-200 gap-2 items-center"
                    >
                        Detail
                        <span className="bg-[#02364B] text-white rounded-full p-1 scale-75">
                        <ChevronRight />
                        </span>
                    </a>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}

export default Inbox
