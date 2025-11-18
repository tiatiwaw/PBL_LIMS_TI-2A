<?php

namespace Database\Seeders;

use App\Models\BrandType;
use App\Models\SampleCategory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1) Users first (required by clients and analysts)
        $this->call(UserSeeder::class);

        // 2) Entities that depend on users
        $this->call(ClientSeeder::class);
        $this->call(OrderSeeder::class);
        $this->call(AnalystSeeder::class);

        // 3) Independent lookups
        $this->call(SupplierSeeder::class);
        $this->call(GradeSeeder::class);
        $this->call(BrandTypeSeeder::class);
        $this->call(UnitValueSeeder::class);
        $this->call(ReferenceStandardSeeder::class);

        // 4) Entities depending on the above
        $this->call(TestMethodSeeder::class);       // needs reference_standards
        $this->call(TestParameterSeeder::class);    // needs unit_values and reference_standards
        $this->call(EquipmentSeeder::class);        // needs brand_types
        $this->call(ReagentSeeder::class);          // needs suppliers and grades

        // 5) Samples and categories
        $this->call(SampleCategorySeeder::class);
        $this->call(SampleSeeder::class);

        // 6) Independent
        $this->call(AnalysesMethodSeeder::class);
    }
}