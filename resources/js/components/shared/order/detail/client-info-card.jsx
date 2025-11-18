import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    User,
    MapPin,
    Phone,
    Mail,
    Barcode,
    SquareUser,
} from "lucide-react";

export default function ClientInfoCard({ client }) {
    return (
        <Card className="border border-slate-200 shadow-xl bg-white">
            <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                        <SquareUser className="w-5 h-5 text-white" />
                    </div>
                    Informasi Klien
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <User className="w-4 h-4" />
                            <span>Kontak Person</span>
                        </div>
                        <p className="font-bold text-primary-hijauTua text-lg">
                            {client.name}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                        </div>
                        <p className="font-semibold text-primary-hijauTua break-all">
                            {client.users.email}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Phone className="w-4 h-4" />
                            <span>Telepon</span>
                        </div>
                        <p className="font-semibold text-primary-hijauTua">
                            {client.phone_number}
                        </p>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>Alamat</span>
                        </div>
                        <p className="font-semibold text-primary-hijauTua">
                            {client.address}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Barcode className="w-4 h-4" />
                            <span>NPWP</span>
                        </div>
                        <p className="font-semibold text-primary-hijauTua">
                            {client.npwp_number}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}