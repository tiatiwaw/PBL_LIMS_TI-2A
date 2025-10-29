import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ChevronRight, Clipboard } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  const user = {
    name: "Puff",
    role: "Analis",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const upcomingTests = [
    { id: "M - 19", type: "Urgent", date: "01 / 10 / 2025" },
    { id: "M - 20", type: "Reguler", date: "05 / 10 / 2025" },
    { id: "M - 21", type: "Internal", date: "10 / 10 / 2025"},
  ];

  const historyData = [
    { id: "M - 1", name: "Buah Naga" },
    { id: "M - 2", name: "Jus Seledri" },
    { id: "M - 3", name: "Sagu Tempe" },
    { id: "M - 4", name: "Buah Naga" },
    { id: "M - 5", name: "Jus Seledri" },
    { id: "M - 6", name: "Sagu Tempe" },
    { id: "M - 7", name: "Buah Naga" },
    { id: "M - 8", name: "Jus Seledri" },
  ];

  const inboxItems = ["Buah Naga", "Jus Seledri", "Sagu Tempe"];

  return (
    <DashboardLayout title="Dashboard" user={user} header="Selamat Datang, Analis">
      <div className="flex flex-col gap-10 text-[#02364B]">

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { value: 40, label: "Total Pesanan" },
            { value: 6, label: "Pengujian Diterima" },
            { value: 25, label: "Pengujian Selesai" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl py-6 font-bold flex flex-col items-center"
            >
              <p className="text-4xl">{stat.value}</p>
              <p className="text-base">{stat.label}</p>
            </div>
          ))}
        </div>
          {/* Tes Mendatang */}
          <h2 className="font-bold text-lg mt-3 -mb-6">Tes Mendatang</h2>
            
          <div className="rounded-md overflow-hidden bg-white">
            <Table>
            <TableHeader className="bg-primary-hijauTua">
              <TableRow>
                <TableHead className="text-white">Kode Pesanan</TableHead>
                <TableHead className="text-white">Deadline Pengujian</TableHead>
                <TableHead className="text-white">Tipe Pesanan</TableHead>
                <TableHead className="text-white">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {upcomingTests.map((test, i) => (
                <TableRow key={i}>
                  <TableCell>{test.id}</TableCell>
                  <TableCell>{test.date}</TableCell>
                  <TableCell>{test.type}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="border-primary-hijauTua hover:bg-primary-hijauTua hover:text-white">Terima</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
