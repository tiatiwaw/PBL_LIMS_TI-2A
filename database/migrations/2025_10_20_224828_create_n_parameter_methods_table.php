<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('n_parameter_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('test_parameter_id')->constrained('test_parameters')->cascadeOnDelete();
            $table->foreignId('test_method_id')->constrained('test_methods')->cascadeOnDelete();
            $table->foreignId('n_equipment_id')->constrained('n_equipments')->cascadeOnDelete();
            $table->foreignId('n_analyst_id')->constrained('n_analysts')->cascadeOnDelete();
            $table->foreignId('n_reagent_id')->constrained('n_reagents')->cascadeOnDelete();
            $table->string('result');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('n_parameter_methods');
    }
};
