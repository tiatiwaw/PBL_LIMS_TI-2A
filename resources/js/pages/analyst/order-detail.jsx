import DashboardLayout from "@/components/layouts/dashboard-layout";
import { CircleAlert } from "lucide-react";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import {
    Button
} from "@/components/ui/button"
import { Link } from "@inertiajs/react";

const detail = () => {
    const user = {
        name: 'Nardo',
        role: 'Analyst',
        avatar: 'https://i.pravatar.cc/150?img=3',
    };

    return (
        <DashboardLayout title="Detail Sampel" user={user} header="Selamat Datang Analyst!">
            <div className="text-primary-hijauGelap flex flex-col gap-6">
                <h1 className="font-bold">Detail Pemesanan</h1>

                <div className="bg-white w-full shadow-md rounded-md p-5">
                    <ul>
                        <li>
                            Judul : 
                        </li>
                        <li>
                            Nilai Hasil : 
                        </li>
                        <li>
                            Deadline : 
                        </li>
                        <li>
                            Laporan Hasil : 
                        </li>
                        <li>
                            Catatan : 
                        </li>
                    </ul>
                </div>

                <h1 className="font-bold">Daftar Sampel</h1>
                <div className="bg-white shadow-md rounded-md overflow-hidden">
                    <Table>
                        <TableHeader className="bg-primary-hijauTua">
                            <TableRow>
                            <TableHead className="text-white">Nama Sampel</TableHead>
                            <TableHead className="text-white">Status</TableHead>
                            <TableHead className="text-white">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell>Sampel 1</TableCell>
                                <TableCell><span className="bg-yellow-500 text-white px-3 rounded-full">In Progress</span></TableCell>
                                <TableCell><CircleAlert className="text-white bg-primary-hijauTua p-1 rounded-full"/></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Sampel 1</TableCell>
                                <TableCell><span className="bg-primary-hijauMuda text-white px-3 rounded-full">Done</span></TableCell>
                                <TableCell><CircleAlert className="text-white bg-primary-hijauTua p-1 rounded-full"/></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Sampel 1</TableCell>
                                <TableCell><span className="bg-yellow-500 text-white px-3 rounded-full">In Progress</span></TableCell>
                                <TableCell><CircleAlert className="text-white bg-primary-hijauTua p-1 rounded-full"/></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Sampel 1</TableCell>
                                <TableCell><span className="bg-primary-hijauMuda text-white px-3 rounded-full">Done</span></TableCell>
                                <TableCell><CircleAlert className="text-white bg-primary-hijauTua p-1 rounded-full"/></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <Button className="w-max bg-primary-hijauTua"><Link href=".">Kembali</Link></Button>
            </div>
        </DashboardLayout>
    );
};

export default detail;