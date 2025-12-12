<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // Range 6 bulan terakhir
            $startDate = Carbon::now()->subMonths(6)->startOfMonth();
            $endDate = Carbon::now()->endOfMonth();

            // Ambil orders lengkap (termasuk analysesMethods)
            $orders = Order::with(['analysesMethods'])
                ->whereBetween('order_date', [$startDate, $endDate])
                ->get();

            /* -----------------------------------------------------
            | 1. TOTAL ORDER 6 BULAN
            ------------------------------------------------------*/
            $totalOrders = $orders->count();

            /* -----------------------------------------------------
            | 2. TOTAL PENDAPATAN 6 BULAN
            | Sum dari pivot price (analysesMethods)
            ------------------------------------------------------*/
            $totalRevenue = $orders->flatMap(function ($order) {
                return $order->analysesMethods->pluck('pivot.price');
            })->sum();

            /* -----------------------------------------------------
            | 3. TOTAL ORDER PER BULAN (Grafik)
            ------------------------------------------------------*/
            $ordersPerMonth = $orders->groupBy(function ($order) {
                return Carbon::parse($order->order_date)->format('Y-m');
            })->map->count();

            /* -----------------------------------------------------
            | 4. TOTAL PENDAPATAN PER BULAN (Grafik)
            ------------------------------------------------------*/
            $revenuePerMonth = $orders->groupBy(function ($order) {
                return Carbon::parse($order->order_date)->format('Y-m');
            })->map(function ($group) {
                return $group->flatMap(function ($order) {
                    return $order->analysesMethods->pluck('pivot.price');
                })->sum();
            });

            /* -----------------------------------------------------
            | Format output untuk Recharts (React)
            ------------------------------------------------------*/
            $months = collect();
            for ($i = 5; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $monthKey = $date->format('Y-m');
                $monthLabel = $date->format('M Y');

                $months->push([
                    'month' => $monthLabel,
                    'orders' => $ordersPerMonth[$monthKey] ?? 0,
                    'revenue' => $revenuePerMonth[$monthKey] ?? 0,
                ]);
            }

            return response()->json([
                'total_orders' => $totalOrders,
                'total_revenue' => $totalRevenue,
                'chart' => $months,
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Gagal mengambil data dashboard',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
