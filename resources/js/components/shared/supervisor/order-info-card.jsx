import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderInfoCard({ order }) {
    return (
        <Card>
            <CardHeader className="bg-gray-50 border-b">
                <CardTitle>Informasi Order</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Nomor Order</p>
                        <p className="font-semibold text-lg">
                            {order?.order_number}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Klien</p>
                        <p className="font-semibold text-lg">
                            {order?.clients?.name}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Jumlah Sampel</p>
                        <p className="font-semibold text-lg">
                            {order?.samples?.length || 0}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
