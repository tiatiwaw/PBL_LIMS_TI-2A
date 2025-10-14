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
        Schema::create('test_parameters', function (Blueprint $table) {
            $table->id();
            $table->string('unit_value_id')->unique();
            $table->string('name');
            $table->enum('category', ['kimia', 'mikrobiologi', 'fisika', 'klinik'])->default('kimia');
            $table->enum('detection_limit', ['LOD', 'LOQ'])->default('LOD');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_parameters');
    }
};
