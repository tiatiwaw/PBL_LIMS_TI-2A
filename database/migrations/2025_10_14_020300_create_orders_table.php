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
            $table->foreignId(column: 'client_id')->constrained('clients')->cascadeOnDelete();
            $table->string('order_number')->nullable();
            $table->string('title')->nullable();
            $table->string('result_value')->nullable();
            $table->date('order_date');
            $table->date('estimate_date')->nullable();
            $table->date('report_issued_at')->nullable();
            $table->string('report_file_path')->nullable();
            $table->string('notes')->nullable();
            $table->enum('order_type', ['internal', 'regular', 'external', 'urgent'])->default('internal');
            $table->enum('status', ['received', 'disapproved', 'pending_payment', 'paid', 'in_progress', 'received_test', 'revision_test', 'pending', 'completed'])->default('received');
            /* Keterangan Status :
             received = order baru dibuat oleh client
             dissaproved = order ditolak oleh supervisor
             pending_payment = order disetujui supervisor & menunggu client membayar order
             paid = pembayaran client sukses & supervisor dapat memasukkan bahan yang dibutuhkan order
             in_progress = order siap untuk dilakukan pengujian oleh analis (setiap proses pengujian statusnya in_progress)
             received_test = pengujian selesai dan siap dilakukan Quality Control oleh Supervisor
             revision_test = Quality Control tidak sesuai dan harus dilakukan uji ulang
             pending = Quality Control sesuai dan menunggu bersetujuan laporan oleh Manager
             completed = manager menyetujui laporan dan order selesai
            */
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
