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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('order_date');
            $table->date('estimated_date');
            $table->string('notes');
            $table->enum('order_type', ['internal', 'external', 'urgent'])->default('internal');
            $table->enum('status', ['received', 'in_progress', 'pending', 'disapproved', 'approved', 'completed'])->default('received');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
