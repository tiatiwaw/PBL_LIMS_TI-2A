import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function ProfileLayout({ user }) {
  // Role config dengan ikon sudah diberi warna agar muncul
  const roleConfig = {
    Manager: { icon: <User size={60} className="text-[#024D60]" />, description: "Bertanggung jawab atas pengelolaan tim dan pengambilan keputusan strategis." },
    Staff: { icon: <User size={60} className="text-[#024D60]" />, description: "Melaksanakan tugas operasional sesuai instruksi atasan." },
    Supervisor: { icon: <User size={60} className="text-[#024D60]" />, description: "Mengawasi kualitas kerja anggota tim." },
    Analyst: { icon: <User size={60} className="text-[#024D60]" />, description: "Menganalisis data dan memberi laporan." },
    Client: { icon: <User size={60} className="text-[#024D60]" />, description: "Menggunakan layanan dan menerima hasil analisis dari tim laboratorium." },
  };

  const { icon, description } = roleConfig[user.role] || roleConfig["Client"];
  const baseKeys = ["name", "email", "role"];
  const extraKeys = Object.keys(user).filter((key) => !baseKeys.includes(key));

  return (
    <DashboardLayout title="Profil Pengguna" user={user}>
      <div className="w-full flex justify-center py-6">
        <div className="w-full max-w-5xl bg-[#E8F5FF] p-6 rounded-lg">

          {/* Layout kiri & kanan */}
          <div className="flex flex-col md:flex-row gap-6">

            {/* === KIRI: CARD FOTO & ROLE === */}
            <div className="bg-[#024D60] text-white rounded-xl w-full md:w-1/3 p-6 flex flex-col items-center shadow-md">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                {icon}
              </div>
              <h3 className="mt-4 text-lg font-bold uppercase">{user.role || "Client"}</h3>
              <p className="text-xs text-center mt-2 opacity-80">{description}</p>
            </div>

            {/* === KANAN: INFORMASI AKUN === */}
            <Card className="w-full md:w-2/3 rounded-xl shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Informasi Akun</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-y-4 text-sm">
                <p className="text-gray-600">Nama</p>
                <p className="font-medium text-gray-800">: {user.name}</p>

                <p className="text-gray-600">Email</p>
                <p className="font-medium text-gray-800">: {user.email}</p>

                <p className="text-gray-600">Peran</p>
                <p className="font-medium text-gray-800">: {user.role}</p>

                {extraKeys.map((key) => (
                  <React.Fragment key={key}>
                    <p className="text-gray-600">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <p className="font-medium text-gray-800">: {user[key]}</p>
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* === TOMBOL BAWAH === */}
          <div className="flex justify-end gap-3 mt-6">
            <Button className="bg-[#024D60] hover:bg-[#036377] text-white">Edit Profil</Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">Kembali</Button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
