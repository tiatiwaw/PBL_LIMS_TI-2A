import DashboardLayout from "@/components/layouts/dashboard-layout";
import {ChevronRight} from 'lucide-react';
import { Link } from "@inertiajs/react";

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
                    className="bg-white border w-full py-6 rounded-2xl shadow-lg flex justify-between items-center px-6"
                    >
                    <div className="flex gap-2 items-center">
                        <p className="font-medium text-lg">{index + 1}. {name}</p>
                        <div className="bg-[#75E2DF] text-primary-hijauTua rounded-full scale-75 px-3">
                            In Progress
                        </div>
                    </div>
                    

                        
                        <Link
                            href="/analyst/inbox/details"
                            className="bg-primary-hijauTua text-white rounded-3xl px-4 py-[4px] shadow-md flex hover:scale-110 hover:bg-gray-400 duration-200 gap-2 items-center"
                        >
                            Detail
                            <span className="bg-[#75E2DF] text-primary-hijauTua rounded-full p-1 scale-75">
                            <ChevronRight />
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}

export default Inbox
