<?php

namespace Database\Seeders;

use App\Models\UnitValue;
use App\Models\TestParameter;
use App\Models\NOrderSample;
use Illuminate\Database\Seeder;
use App\Models\NParameterMethod;
use Database\Seeders\UserRoleSeeder;
use League\CommonMark\Reference\Reference;

class DatabaseSeeder extends Seeder
{
<<<<<<< HEAD
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seeder User
        $this->call([
            UserRoleSeeder::class,
            ClientSeeder::class,
            OrderSeeder::class,
            SampleCategorySeeder::class,
            SampleSeeder::class,
            NOrderSampleSeeder::class,
            TestParameterSeeder::class,
            TestMethodSeeder::class,
            UnitValueSeeder::class,
            ReferenceStandardSeeder::class,
            NParameterMethodSeeder::class,
            AnalystSeeder::class,
            CertificateSeeder::class,
            TrainingSeeder::class,
            NTrainingAnalystSeeder::class,
            NAnalystSeeder::class,
        ]);
=======
        /**
         * Seed the application's database.
         */
        public function run(): void
        {
                // Seeder User
                $this->call([
                        UserRoleSeeder::class,
                        ClientSeeder::class,
                        OrderSeeder::class,
                ]);
>>>>>>> a15a978d4845461964e5e26b4c0f5d32ce26f2b2

                // // Master Data Independen
                $this->call([
                            BrandTypeSeeder::class,
                            GradeSeeder::class,
                            SupplierSeeder::class,
                        SampleCategorySeeder::class,
                            UnitValueSeeder::class,
                            ReferenceStandardSeeder::class,
                        AnalysesMethodSeeder::class,
                        SampleSeeder::class,
                        NOrderSampleSeeder::class,
                        NAnalysesMethodsOrdersSeeder::class,
                ]);

        // // Master Data Dependen
        // $this->call([
        //     EquipmentSeeder::class,
        //     ReagentSeeder::class,
        //     TestMethodSeeder::class,
        //     TestParameterSeeder::class,
        // ]);

        // // Data Transaksional
        // $this->call([
        //     AnalystSeeder::class,
        //     ClientSeeder::class,
        //     SampleSeeder::class,
        // ]);
    }
}
