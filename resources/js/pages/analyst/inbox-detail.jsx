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
            <div className="gap-4 flex flex-col items-center p-6 justify-center text-primary-hijauTua font-bold">
               <div className="bg-primary-hijauPudar shadow-md w-full min-h-60 rounded-xl p-4 flex flex-col gap-4">
                    <div className="bg-primary-hijauMuda h-10 px-10 rounded-md flex items-center gap-2 font-bold shadow-md"><NotebookText/> {"Sample"}</div>
                    
                    <div className="grid grid-cols-2 w-3/4 gap-2">
                        <p>Kode Sampel</p>
                        <p>: {"G-155"}</p>

                        <p>Nama Sampel</p>
                        <p>: {"Gas Metabolisme Tubuh"}</p>

                        <p>Jenis Sampel</p>
                        <p>: {"Gas"}</p>

                        <p>Kuantitas</p>
                        <p>: {"5 ml"}</p>
                        
                        <p>Kondisi</p>
                        <p>: {"Good"}</p>

                        <p>Suhu</p>
                        <p>: {"18 C"}</p>

                        <p>Tanggal Masuk</p>
                        <p>: {"32 September 2025"}</p>
                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <a href="../" className="cursor-pointer hover:bg-primary-hijauGelap bg-primary-hijauTua text-white rounded-full py-1 px-4">
                        Kembali
                    </a>
                </div>
            </div>
            
        </DashboardLayout>
    )
}

export default History
