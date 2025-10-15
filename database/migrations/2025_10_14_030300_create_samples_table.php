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
        Schema::create('samples', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('sample_category_id')->constrained('sample_categories')->onDelete('cascade');
            $table->string('name');
            $table->enum('form', ['solid', 'liquid', 'gas'])->default('solid');
            $table->string('preservation_method');
            $table->enum('condition', ['good', 'damages', 'expired'])->default('good');
            $table->string('temperature');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('samples');
    }
};
