<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Sample;
use App\Models\TestParameter;
use App\Models\TestMethod;
use App\Models\Reagent;
use App\Models\Equipment;
use App\Models\Analyst;
use App\Models\NOrderSample;
use App\Models\NAnalysesMethodsOrder;
use App\Models\NParameterMethod;
use App\Models\NReagent;
use App\Models\NEquipment;
use App\Models\NAnalyst;
use Illuminate\Support\Facades\DB;

class SeederHelpers
{
    /**
     * Validasi data master tersedia
     */
    public static function validateMasterData()
    {
        $required = [
            Sample::class => 'samples',
            TestParameter::class => 'test_parameters',
            TestMethod::class => 'test_methods',
            Reagent::class => 'reagents',
            Equipment::class => 'equipments',
            Analyst::class => 'analysts',
        ];

        foreach ($required as $model => $table) {
            if ($model::count() === 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Assign sampel ke order dengan kondisi:
     * - Setiap order dapat 1-3 sampel berbeda
     * - Setiap sampel hanya digunakan sekali per order
     * - Update sample status sesuai order status
     */
    public static function assignSamplesToOrders()
    {
        $orders = Order::all();
        $samples = Sample::all()->toArray();
        shuffle($samples);

        $sampleIndex = 0;
        $sampleCount = count($samples);

        foreach ($orders as $order) {
            $samplesPerOrder = rand(1, 3);

            for ($i = 0; $i < $samplesPerOrder; $i++) {
                if ($sampleIndex >= $sampleCount) {
                    $sampleIndex = 0;
                }

                $currentSample = $samples[$sampleIndex];

                NOrderSample::create([
                    'order_id' => $order->id,
                    'sample_id' => $currentSample['id'],
                    'sample_volume' => fake()->randomFloat(2, 0.5, 5) . ' ml',
                ]);

                // Update sample status berdasarkan order status
                Sample::find($currentSample['id'])->update([
                    'status' => self::getSampleStatusByOrderStatus($order->status),
                ]);

                $sampleIndex++;
            }
        }
    }

    /**
     * Get sample condition berdasarkan order status
     * (Note: 'condition' column is for 'good', 'damaged', 'expired')
     * (Note: 'status' column is for actual workflow status)
     */
    public static function getSampleConditionByOrderStatus($orderStatus)
    {
        return 'good'; // Always keep condition as 'good'
    }

    /**
     * Get sample status berdasarkan order status
     */
    public static function getSampleStatusByOrderStatus($orderStatus)
    {
        return match($orderStatus) {
            'received', 'pending_payment', 'paid' => 'pending',
            'in_progress', 'received_test', 'revision_test' => 'in_progress',
            'pending', 'completed' => 'done',
            default => 'pending',
        };
    }

    /**
     * Assign analyses methods ke order sesuai kriteria
     */
    public static function assignAnalysesMethodsToOrders()
    {
        $analysesMethods = \App\Models\AnalysesMethod::all();
        $descriptions = [
            'Analisis kualitas air lengkap untuk parameter fisik dan kimia',
            'Uji kandungan logam berat dalam sampel',
            'Analisis mikrobiologi untuk parameter E.coli dan total koliform',
            'Uji residu pestisida dalam produk pertanian',
            'Analisis kandungan nutrisi dan vitamin dalam makanan',
        ];
        $prices = [250000, 180000, 320000, 275000, 210000, 195000, 290000, 335000];

        if ($analysesMethods->isEmpty()) {
            return; // Skip jika tidak ada methods
        }

        $methodIndex = 0;
        $priceIndex = 0;
        $descIndex = 0;
        $methodCount = $analysesMethods->count();
        $priceCount = count($prices);
        $descCount = count($descriptions);

        foreach (Order::all() as $order) {
            // Status tertentu wajib punya analyses methods
            $mustHaveMethods = in_array($order->status, ['received', 'pending_payment', 'paid']);
            if (!$mustHaveMethods && rand(0, 1) === 0) {
                continue; // Skip untuk order lain yang random
            }

            $methodsCount = rand(1, 3);
            for ($i = 0; $i < $methodsCount; $i++) {
                $method = $analysesMethods[$methodIndex % $methodCount];
                $price = $prices[$priceIndex % $priceCount];
                $description = $descriptions[$descIndex % $descCount];

                NAnalysesMethodsOrder::create([
                    'order_id' => $order->id,
                    'analyses_method_id' => $method->id,
                    'description' => $description,
                    'price' => $price,
                ]);

                $methodIndex++;
                $priceIndex++;
                $descIndex++;
            }
        }
    }

    /**
     * Assign n_parameter_methods dengan detail sesuai order status
     */
    public static function assignParameterMethodsToOrders()
    {
        $parameters = TestParameter::all();
        $methods = TestMethod::all();

        foreach (Order::all() as $order) {
            // Hanya order dengan status: in_progress, received_test, revision_test, pending, completed
            if (!in_array($order->status, ['in_progress', 'received_test', 'revision_test', 'pending', 'completed'])) {
                continue;
            }

            // Ambil samples dari order ini
            $samples = $order->samples;

            foreach ($samples as $sample) {
                $paramCount = rand(1, 2);

                for ($p = 0; $p < $paramCount; $p++) {
                    $param = $parameters->random();
                    $method = $methods->random();

                    // Untuk revision_test, buat 2 dengan status berbeda
                    if ($order->status === 'revision_test' && $p === 1) {
                        NParameterMethod::create([
                            'sample_id' => $sample->id,
                            'test_parameter_id' => $param->id,
                            'test_method_id' => $method->id,
                            'result' => null,
                            'status' => 'failed',
                        ]);
                    } else {
                        $npm = NParameterMethod::create([
                            'sample_id' => $sample->id,
                            'test_parameter_id' => $param->id,
                            'test_method_id' => $method->id,
                            'result' => in_array($order->status, ['received_test', 'revision_test', 'pending', 'completed'])
                                ? fake()->randomFloat(2, 10, 99) . ' mg/L'
                                : null,
                            'status' => in_array($order->status, ['received_test', 'pending', 'completed'])
                                ? 'success'
                                : ($order->status === 'revision_test' ? 'in_progress' : 'in_progress'),
                        ]);
                    }
                }
            }
        }
    }

    /**
     * Assign relasi equipment dan reagent ke n_parameter_methods
     * Assign analyst ke orders
     */
    public static function assignRelatesToParameterMethods()
    {
        $reagents = Reagent::all();
        $equipments = Equipment::where('status', 'available')->get();
        $analysts = Analyst::all();

        // Ambil orders yang perlu relasi
        $validStatuses = ['in_progress', 'received_test', 'revision_test', 'pending', 'completed'];
        $validOrders = Order::whereIn('status', $validStatuses)->get();
        $validOrderIds = $validOrders->pluck('id')->toArray();

        // Ambil samples dari order valid
        $validSampleIds = NOrderSample::whereIn('order_id', $validOrderIds)->pluck('sample_id')->toArray();

        // Ambil n_parameter_methods dari samples valid
        $npmList = NParameterMethod::whereIn('sample_id', $validSampleIds)->get();

        foreach ($npmList as $npm) {
            // Assign reagents (1-3)
            if (!$reagents->isEmpty()) {
                $reagentCount = rand(1, 3);
                for ($i = 0; $i < $reagentCount; $i++) {
                    NReagent::create([
                        'n_parameter_method_id' => $npm->id,
                        'reagent_id' => $reagents->random()->id,
                    ]);
                }
            }

            // Assign equipment (1-2) - using DB::table since no model exists
            if (!$equipments->isEmpty()) {
                $equipmentCount = rand(1, 2);
                for ($i = 0; $i < $equipmentCount; $i++) {
                    DB::table('n_equipments')->insert([
                        'n_parameter_method_id' => $npm->id,
                        'equipment_id' => $equipments->random()->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        // Assign analyst ke orders (bukan ke parameter methods)
        foreach ($validOrders as $order) {
            if (!$analysts->isEmpty()) {
                $analystCount = rand(1, 2);
                for ($i = 0; $i < $analystCount; $i++) {
                    DB::table('n_analysts')->insert([
                        'order_id' => $order->id,
                        'analyst_id' => $analysts->random()->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
    }

    /**
     * Mark equipment unavailable jika sudah digunakan
     */
    public static function markEquipmentsUsed()
    {
        $usedEquipments = DB::table('n_equipments')
            ->distinct()
            ->pluck('equipment_id');

        Equipment::whereIn('id', $usedEquipments)->update(['status' => 'unavailable']);
    }
}
