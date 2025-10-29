import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ChevronRight, Clipboard } from "lucide-react";

const Dashboard = () => {
  const user = {
    name: "Puff",
    role: "Analis",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const upcomingTests = [
    { id: "M - 19", type: "Padat", date: "01 / 10 / 2025" },
    { id: "M - 20", type: "Cair", date: "05 / 10 / 2025" },
    { id: "M - 21", type: "Gas", date: "10 / 10 / 2025" },
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
            { value: 40, label: "Sampel Aktif" },
            { value: 6, label: "Pengujian Dijeda" },
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

        {/* Grid Tes Mendatang + Kotak Pesan & Riwayat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Kiri: Tes Mendatang + Kotak Pesan */}
          <div className="flex flex-col gap-8">

            {/* Tes Mendatang */}
            <div>
              <h2 className="font-bold text-lg mb-3">Tes Mendatang</h2>
              <table className="w-full text-left bg-[#FFF8F8] rounded-xl shadow-md overflow-hidden border border-gray-300">
                <thead className="bg-[#02364B] text-white">
                  <tr>
                    <th className="p-3 border border-gray-300">ID Sampel</th>
                    <th className="p-3 border border-gray-300">Jenis Sampel</th>
                    <th className="p-3 border border-gray-300">Waktu Pengujian</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTests.map((test, i) => (
                    <tr key={i} className="odd:bg-[#FFF8F8] even:bg-[#FFF8F8]">
                      <td className="p-3 border border-gray-300">{test.id}</td>
                      <td className="p-3 border border-gray-300">{test.type}</td>
                      <td className="p-3 border border-gray-300">{test.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Kotak Pesan */}
            <div>
              <h2 className="font-bold text-lg mb-3">Kotak Pesan</h2>
              <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
                {inboxItems.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white rounded-md px-4 py-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Icon kiri */}
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center shadow">
                      <Clipboard className="w-6 h-6 text-[#02364B]" />
                    </div>

                    {/* Nama tengah */}
                    <div className="flex-1">
                      <p className="text-lg font-medium text-[#02364B]">{name}</p>
                    </div>

                    {/* Tombol Detail */}
                    <button
                      className="flex items-center gap-2 bg-[#F5F8FA] rounded-full px-4 py-2 shadow hover:scale-105 transition-transform"
                      aria-label={`Lihat detail ${name}`}
                    >
                      <span className="text-sm font-medium">Detail</span>
                      <span className="w-6 h-6 rounded-full bg-[#02364B] flex items-center justify-center text-white">
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kanan: Riwayat */}
          <div>
            <h2 className="font-bold text-lg mb-3">Riwayat</h2>
            <table className="w-full text-left bg-white rounded-xl shadow-md overflow-hidden">
              <thead className="bg-[#02364B] text-white">
                <tr>
                  <th className="p-3">ID Sampel</th>
                  <th className="p-3">Nama Sampel</th>
                  <th className="p-3">Hasil Analisis</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item, index) => (
                  <tr key={index} className="odd:bg-[#EAF7F7] even:bg-[#D9EFF0]">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">
                      <button className="bg-white rounded-3xl px-4 py-[4px] shadow-md flex gap-2 items-center hover:scale-105 duration-200">
                        Detail
                        <span className="bg-[#02364B] text-white rounded-full p-1 scale-75">
                          <ChevronRight />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
