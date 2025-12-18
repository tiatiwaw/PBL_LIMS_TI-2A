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
            $endDate = Carbon::now()->endOfMonth();
            $startDate = Carbon::now()->subMonths(5)->startOfMonth();

            $orders = Order::with(['analysesMethods'])
                ->whereBetween('order_date', [$startDate, $endDate])
                ->where('status', '!=', 'disapproved')
                ->get();

            $totalOrders = $orders->count();

            $totalRevenue = $orders->sum(function ($order) {
                return $order->analysesMethods->sum('pivot.price');
            });

            $chartData = [];

            for ($i = 5; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $monthKey = $date->format('Y-m');
                $monthLabel = $date->format('M Y');

                $monthlyOrders = $orders->filter(function ($order) use ($monthKey) {
                    return Carbon::parse($order->order_date)->format('Y-m') === $monthKey;
                });

                $chartData[] = [
                    'month' => $monthLabel,
                    'orders' => $monthlyOrders->count(),
                    'revenue' => $monthlyOrders->sum(function ($order) {
                        return $order->analysesMethods->sum('pivot.price');
                    }),
                ];
            }

            return response()->json([
                'total_orders' => $totalOrders,
                'total_revenue' => $totalRevenue,
                'chart' => $chartData,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Gagal mengambil data dashboard',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
