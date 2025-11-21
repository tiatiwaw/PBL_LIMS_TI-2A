import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleAlert, Edit, ChevronRight } from "lucide-react";

export default function SupervisorParametersIndex() {
    // Mock data
    const samples = [
        { id: 1, name: "Sample 1" },
        { id: 2, name: "Sample 2" },
        { id: 3, name: "Sample 3" },
        { id: 4, name: "Sample 4" },
        { id: 5, name: "Sample 5" },
    ];

    return (
        <DashboardLayout title="Parameter" header="Parameter">
            <div>
                {/* HEADER */}
                <div className="flex items-center justify-between mb-10">
                    {/* Stepper */}
                    <div className="flex items-center gap-6">
                        {/* STEP 1 */}
                        <div
                            className="w-20 h-20 rounded-full border-2 border-[#0F5668] bg-[#68C1C5]
                                        flex items-center justify-center text-[#000000] font-bold text-3xl"
                        >
                            1
                        </div>
                        {/* STEP 2 */}
                        <div
                            className="w-20 h-20 rounded-full border-2 border-[#0F5668] bg-white
                                        flex items-center justify-center text-[#000000] font-bold text-center text-lg px-2 leading-tight"
                        >
                            Analist
                        </div>
                        {/* STEP 3 */}
                        <div
                            className="w-20 h-20 rounded-full border-2 border-[#0F5668] bg-white
                                        flex items-center justify-center text-[#000000] font-bold text-center text-lg px-2 leading-tight"
                        >
                            Tinjau
                            <br />
                            Ulang
                        </div>
                    </div>
                </div>

                {/* LIST SAMPLE */}
                <div className="space-y-4 flex-1">
                    {samples.map((s) => (
                        <Card
                            key={s.id}
                            className="shadow-md border border-gray-200 rounded-2xl"
                        >
                            <CardContent className="flex items-center justify-between py-8 px-5">
                                <div className="font-bold text-lg text-[#02364B]">
                                    {s.name}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3">
                                    {/* Detail */}
                                    <Link href="/supervisor/parameters/detail">
                                        <Button
                                            size="icon"
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md w-10 h-10"
                                        >
                                            <CircleAlert
                                                size={25}
                                                className="transform scale-y-[-1]"
                                            />
                                        </Button>
                                    </Link>

                                    {/* Edit */}
                                    <Link href="/supervisor/parameters/first">
                                        <Button
                                            size="icon"
                                            className="bg-green-500 hover:bg-green-600 text-white rounded-md w-10 h-10"
                                        >
                                            <Edit size={25} />
                                        </Button>
                                    </Link>

                                    {/* Arrow */}
                                    <Link href="/supervisor/parameters/first">
                                        <Button
                                            size="icon"
                                            className="bg-red-500 hover:bg-red-600 text-white rounded-md w-10 h-10"
                                        >
                                            <ChevronRight size={25} />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {/* BUTTON LANJUT */}
                    <div className="flex justify-end mt-6 pb-6">
                        <Button className="bg-green-500 hover:bg-green-600 text-white px-10 py-3 rounded-lg text-lg shadow-lg">
                            Lanjut
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
