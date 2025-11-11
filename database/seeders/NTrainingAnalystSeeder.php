<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Analyst;
use App\Models\Training;
use Illuminate\Support\Facades\DB;

class NTrainingAnalystSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $analysts = Analyst::all();
        $trainings = Training::all();

        if ($analysts->isEmpty() || $trainings->isEmpty()) {
            $this->command->warn('⚠️ Data analyst atau training belum ada. Jalankan seeder AnalystSeeder dan TrainingSeeder dulu.');
            return;
        }

        foreach ($analysts as $analyst) {
            // Ambil 1–3 training secara acak untuk setiap analyst
            $selectedTrainings = $trainings->random(rand(1, min(3, $trainings->count())));

            foreach ($selectedTrainings as $training) {
                DB::table('n_training_analysts')->insert([
                    'analyst_id'  => $analyst->id,
                    'training_id' => $training->id,
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ]);
            }
        }

        $this->command->info('✅ NTrainingAnalystSeeder berhasil dijalankan!');
    }
}
