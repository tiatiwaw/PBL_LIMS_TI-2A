<?php

namespace Database\Seeders;

use App\Models\UnitValue;
use App\Models\TestParameter;
use Illuminate\Database\Seeder;
use App\Models\NParameterMethod;
use Database\Seeders\UserRoleSeeder;
use League\CommonMark\Reference\Reference;

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
            OrderSeeder::class,
            SampleCategorySeeder::class,
            SampleSeeder::class,
            NOrderSampleSeeder::class,
            TestParameterSeeder::class,
            TestMethodSeeder::class,
            UnitValueSeeder::class,
            ReferenceStandardSeeder::class,
            NParameterMethodSeeder::class,
        ]);

        // // Master Data Independen
        // $this->call([
        //     BrandTypeSeeder::class,
        //     GradeSeeder::class,
        //     SupplierSeeder::class,
        //     SampleCategorySeeder::class,
        //     UnitValueSeeder::class,
        //     ReferenceStandardSeeder::class,
        //     AnalysesMethodSeeder::class,
        // ]);

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
