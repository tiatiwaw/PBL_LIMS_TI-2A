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
        Schema::create('tests', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique();
            $table->string('sample_id')->unique();
            $table->string('test_parameter_id')->unique();
            $table->string('analyst_id')->unique();
            $table->string('test_method_id')->unique();
            $table->string('equipment_id')->unique();
            $table->string('reagent_id')->unique();
            $table->string('result_value');
            $table->enum('status', ['approved', 'in_progredd', 'disapproved']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tests');
    }
};
