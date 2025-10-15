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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->nullable();
            $table->foreignId('sample_id')->constrained('samples')->onDelete('cascade')->nullable();
            $table->foreignId('test_parameter_id')->constrained('test_parameters')->onDelete('cascade')->nullable();
            $table->foreignId('test_method_id')->constrained('test_methods')->onDelete('cascade')->nullable();
            $table->foreignId('equipment_id')->constrained('equipments')->onDelete('cascade')->nullable();
            $table->foreignId('reagent_id')->constrained('reagents')->onDelete('cascade')->nullable();
            $table->string('result_value')->nullable();
            $table->date('order_date')->nullable();
            $table->date('estimate_date')->nullable();
            $table->date('report_issued_at')->nullable();
            $table->string('report_file_path')->nullable();
            $table->string('notes')->nullable();
            $table->enum('order_type', ['internal', 'external', 'regular', 'urgent'])->default('internal');
            $table->enum('status', ['received', 'pending', 'approved', 'in_progress', 'completed', 'disapproved'])->default('received');
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
