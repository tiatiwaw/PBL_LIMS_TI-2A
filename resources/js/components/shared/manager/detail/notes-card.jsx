import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

export default function NotesCard({ notes }) {
    return (
        <Card className=" shadow-2xl bg-primary-hijauTua text-white">
            <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                        <Pencil className="w-4 h-4" />
                    </div>
                    Catatan
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-30">
                    <p className="text-sm leading-relaxed">
                        {notes}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}