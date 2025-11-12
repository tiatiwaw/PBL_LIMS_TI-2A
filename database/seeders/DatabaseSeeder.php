<?php

namespace Database\Seeders;

use App\Models\NOrderSample;
use Illuminate\Database\Seeder;

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
<<<<<<< HEAD
                        // AnalystSeeder::class,
=======
                        OrderSeeder::class,
>>>>>>> a15a978d4845461964e5e26b4c0f5d32ce26f2b2
                ]);

                // // Master Data Independen
                $this->call([
<<<<<<< HEAD
                        // BrandTypeSeeder::class,
                        // GradeSeeder::class,
                        // SupplierSeeder::class,
                        SampleCategorySeeder::class,
                        // UnitValueSeeder::class,
                        // ReferenceStandardSeeder::class,
=======
                            BrandTypeSeeder::class,
                            GradeSeeder::class,
                            SupplierSeeder::class,
                        SampleCategorySeeder::class,
                            UnitValueSeeder::class,
                            ReferenceStandardSeeder::class,
>>>>>>> a15a978d4845461964e5e26b4c0f5d32ce26f2b2
                        AnalysesMethodSeeder::class,
                        SampleSeeder::class,
                ]);

                // Master Data Dependen
                $this->call([
                        // EquipmentSeeder::class,
                        // ReagentSeeder::class,
                        // TestMethodSeeder::class,
                        // TestParameterSeeder::class,
                ]);

                // Master Data Transaksional
                $this->call([
                        // OrderSeeder::class,
                        // NOrderSampleSeeder::class,
                        // NAnalysesMethodsOrdersSeeder::class,
                        // NAnalystSeeder::class,
                        // NParameterMethodSeeder::class,
                        // NEquipmentSeeder::class,
                        // NReagentSeeder::class,
                ]);
        }
}
