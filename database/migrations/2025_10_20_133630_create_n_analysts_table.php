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
        Schema::create('n_analysts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('n_parameter_method_id')->nullable()->constrained('n_parameter_methods')->nullOnDelete(); // Dibuat nullable agar bisa migrate
            $table->foreignId('analyst_id')->constrained('analysts')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('n_analysts');
    }
};
