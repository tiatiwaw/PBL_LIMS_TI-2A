<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\SampleSeeder;
use Database\Seeders\NAnalystSeeder;
use Database\Seeders\TrainingSeeder;
use Database\Seeders\UserRoleSeeder;
use Database\Seeders\UnitValueSeeder;
use Database\Seeders\CertificateSeeder;
use Database\Seeders\AnalysesMethodSeeder;
use League\CommonMark\Reference\Reference;
use Database\Seeders\NParameterMethodSeeder;
use Database\Seeders\NTrainingAnalystSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seeder User
        $this->call([

            UserRoleSeeder::class,
            ClientSeeder::class,
            AnalystSeeder::class,
        ]);

        // Master Data Independen
        $this->call([
            // BrandTypeSeeder::class,
            GradeSeeder::class,
            SupplierSeeder::class,
            SampleCategorySeeder::class,
            UnitValueSeeder::class,
            AnalysesMethodSeeder::class,
            SampleSeeder::class,
        ]);

        // Master Data Dependen
        $this->call([
            EquipmentSeeder::class,
            ReagentSeeder::class,
            TestMethodSeeder::class,
            TestParameterSeeder::class,
            CertificateSeeder::class,
            TrainingSeeder::class,
        ]);

        // Data Transaksional
        $this->call([
            OrderSeeder::class,
            NOrderSampleSeeder::class,
            NAnalysesMethodsOrdersSeeder::class,
            NAnalystSeeder::class,
            NParameterMethodSeeder::class,
            GradeSeeder::class,
            NReagentSeeder::class,
            NReagentSeeder::class,
            NEquipmentSeeder::class,
            NTrainingAnalystSeeder::class,
        ]);
    }
}
