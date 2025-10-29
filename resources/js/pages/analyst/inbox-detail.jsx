import DashboardLayout from "@/components/layouts/dashboard-layout";
import { OctagonAlert } from "lucide-react";
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

const History = () => {
    const user = {
        name: 'Nardo',
        role: 'Analyst',
        avatar: 'https://i.pravatar.cc/150?img=3',
    };

    return (
        <DashboardLayout title="Detail Sampel" user={user} header="Selamat Datang Analyst!">
            <div className="text-primary-hijauGelap">
                <h1>Detail Pemesanan</h1>
                <Table>
                    
                    <TableHeader>
                        <TableRow>
                        <TableHead>Nama Sampel</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell>Sampel 1</TableCell>
                            <TableCell><span className="bg-yellow-500 text-white px-3 rounded-full">In Progress</span></TableCell>
                            <TableCell><OctagonAlert className="text-yellow-500"/></TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Sampel 1</TableCell>
                            <TableCell><span className="bg-primary-hijauMuda text-white px-3 rounded-full">Done</span></TableCell>
                            <TableCell><OctagonAlert className="text-yellow-500"/></TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Sampel 1</TableCell>
                            <TableCell><span className="bg-yellow-500 text-white px-3 rounded-full">In Progress</span></TableCell>
                            <TableCell><OctagonAlert className="text-yellow-500"/></TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Sampel 1</TableCell>
                            <TableCell><span className="bg-primary-hijauMuda text-white px-3 rounded-full">Done</span></TableCell>
                            <TableCell><OctagonAlert className="text-yellow-500"/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </DashboardLayout>
    );
};

export default History;
