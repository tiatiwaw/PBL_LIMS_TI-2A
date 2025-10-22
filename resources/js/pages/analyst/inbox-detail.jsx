import DashboardLayout from "@/components/layouts/dashboard-layout";
import { NotebookText } from "lucide-react";

const History = () => {
    const user = {
        name: 'Nardo',
        role: 'Analyst',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    return (
        <DashboardLayout title="Analyst" user={user} header='Selamat Datang Analyst!'>
            <div className="flex flex-col items-center p-6 justify-center text-primary-hijauTua font-bold">
               <div className="bg-primary-hijauMuda w-full min-h-10 rounded-xl">
                    
               </div>
            </div>
        </DashboardLayout>
    )
}

export default History
