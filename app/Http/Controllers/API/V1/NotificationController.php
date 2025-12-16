<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Reagent;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role;

        $notifications = [];

        // =======================================
        // Notifikasi untuk ADMIN
        // =======================================
        if ($role === 'admin') {
            $notifications['low_stock'] = $this->getLowStockReagents();
            $notifications['expired_certificates'] = $this->getExpiredCertificates();
        }

        return response()->json($notifications);
    }

    private function getLowStockReagents()
    {
        try {
            $items = Reagent::where('stock', '<', 5)
                ->orderBy('stock', 'asc')
                ->get();

            return $items->map(function ($r) {
                return [
                    "title"   => "Peringatan Stok Rendah",
                    "content" => "Produk reagent dengan nama \"{$r->name}\" memiliki stok rendah ({$r->stock}). Periksa dan pesan ulang sebelum stok habis."
                ];
            })->toArray();
        } catch (Exception $e) {
            return [
                [
                    "title"   => "Terjadi Kesalahan",
                    "content" => "Gagal memuat data notifikasi stok: {$e->getMessage()}."
                ]
            ];
        }
    }

    private function getExpiredCertificates()
    {
        try {
            $today = Carbon::today();

            $expired = Certificate::with('analyst')
                ->whereDate('expired_date', '<', $today)
                ->orderBy('expired_date', 'asc')
                ->get();

            return $expired->map(function ($cert) {

                $expiredDate = $cert->expired_date instanceof Carbon
                    ? $cert->expired_date
                    : Carbon::parse($cert->expired_date);

                $analystName = $cert->analyst->name ?? 'Tidak Diketahui';

                return [
                    'title'   => 'Sertifikat Kedaluwarsa',
                    'content' => "Sertifikat \"{$cert->name}\" milik analis {$analystName} telah kedaluwarsa pada {$expiredDate->format('d-m-Y')}. Segera lakukan perpanjangan.",
                ];
            });
        } catch (Exception $e) {
            return [
                [
                    "title"   => "Terjadi Kesalahan",
                    "content" => "Gagal memuat data notifikasi sertifikat: {$e->getMessage()}."
                ]
            ];
        }
    }
}
