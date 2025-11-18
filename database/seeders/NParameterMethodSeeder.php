<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NParameterMethod;
use App\Models\Sample;
use App\Models\TestParameter;
use App\Models\TestMethod;

class NParameterMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan ada data sample, parameter, dan method
        $sampleIds = Sample::pluck('id');
        $parameterIds = TestParameter::pluck('id');
        $methodIds = TestMethod::pluck('id');

        if ($sampleIds->isEmpty() || $parameterIds->isEmpty() || $methodIds->isEmpty()) {
            $this->command->warn('⚠️  Pastikan tabel samples, test_parameters, dan test_methods sudah diisi terlebih dahulu.');
            return;
        }

        // Loop untuk buat data kombinasi
        foreach ($sampleIds as $sampleId) {
            foreach ($parameterIds as $parameterId) {

                $methodId = $methodIds->random();

                try {
                    NParameterMethod::create([
                        'sample_id' => $sampleId,
                        'test_parameter_id' => $parameterId,
                        'test_method_id' => $methodId,
                        'result' => null,
                        'status' => fake()->randomElement(['success', 'failed']),
                    ]);
                } catch (\Throwable $e) {
                    dd([
                        'error' => $e->getMessage(),
                        'sample_id' => $sampleId,
                        'parameter_id' => $parameterId,
                        'method_id' => $methodId,
                    ]);
                }

            }
        }


        $this->command->info('✅ NParameterMethodSeeder berhasil dijalankan.');
    }
}
