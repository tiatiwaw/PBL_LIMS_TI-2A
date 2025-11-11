import React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Users, BarChart3, ClipboardList, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth"; // pastikan hook ini ada dan mengembalikan user & status login
import Loading from "@/components/ui/loading";
export default function ProfileLayout() {
  const { user, isLoading } = useAuth();

  // Jika masih loading atau belum ada user
  if (isLoading || !user) {
    return (
        <Loading />
    );
  }

  // Map ikon dan warna berdasarkan role
  const roleConfig = {
    manager: {
      icon: <UserCog size={60} className="text-blue-500" />,
      color: "from-blue-500 to-blue-700",
      description:
        "Bertanggung jawab atas pengelolaan tim dan pengambilan keputusan strategis.",
    },
    staff: {
      icon: <Users size={60} className="text-green-500" />,
      color: "from-green-500 to-green-700",
      description:
        "Melaksanakan tugas operasional sesuai dengan instruksi atasan.",
    },
    supervisor: {
      icon: <ClipboardList size={60} className="text-yellow-500" />,
      color: "from-yellow-500 to-yellow-700",
      description: "Mengawasi dan memastikan kualitas kerja anggota tim.",
    },
    analyst: {
      icon: <BarChart3 size={60} className="text-purple-500" />,
      color: "from-purple-500 to-purple-700",
      description:
        "Menganalisis data dan memberikan laporan untuk mendukung pengambilan keputusan.",
    },
    client: {
      icon: <User size={60} className="text-teal-500" />,
      color: "from-teal-500 to-teal-700",
      description:
        "Menggunakan layanan dan menerima hasil analisis dari tim laboratorium.",
    },
  };

  const { icon, color, description } = roleConfig[user?.role] || {
    icon: <User size={60} className="text-gray-400" />,
    color: "from-gray-400 to-gray-600",
    description: "Peran pengguna tidak dikenali.",
  };

  // Properti tambahan selain name, email, role
  const baseKeys = ["name", "email", "role"];
  const extraKeys = Object.keys(user).filter((key) => !baseKeys.includes(key));

  return (
    <DashboardLayout title="Profil" header="Profil Pengguna" user={user}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Profil */}
        <Card className={`bg-gradient-to-r ${color} text-white shadow-lg rounded-2xl border-none`}>
          <CardHeader className="flex flex-col items-center text-center space-y-4">
            {icon}
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
            <p className="text-sm opacity-90">{user.role}</p>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <p className="text-white/90 text-sm max-w-md mx-auto">{description}</p>
          </CardContent>
        </Card>

        {/* Informasi Akun */}
        <Card className="bg-white shadow-lg rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Informasi Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nama Lengkap</p>
              <p className="text-base font-medium text-gray-800">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium text-gray-800">{user.email || "user@example.com"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Peran</p>
              <p className="text-base font-medium text-gray-800">{user.role}</p>
            </div>

            {/* Properti tambahan */}
            {extraKeys.map((key) => (
              <div key={key}>
                <p className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                <p className="text-base font-medium text-gray-800">
                  {Array.isArray(user[key]) ? user[key].join(", ") : String(user[key])}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3">
          <Button onClick={() => window.history.back()} variant="outline" className="bg-primary-hijauTua text-white">
            Kembali
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
