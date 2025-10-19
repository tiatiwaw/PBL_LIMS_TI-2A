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
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('analyses_method_id')->constrained('analyses_types')->onDelete('cascade');
            $table->foreignId('sample_id')->constrained('samples')->onDelete('cascade');
            $table->foreignId('analyst_id')->constrained('n_parameter_methods')->onDelete('cascade');
            $table->string('order_number');
            $table->string('title');
            $table->string('result_value');
            $table->date('order_date');
            $table->date('estimate_date');
            $table->date('report_issued_at');
            $table->string('report_file_path');
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
