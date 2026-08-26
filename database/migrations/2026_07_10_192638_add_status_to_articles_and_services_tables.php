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
        Schema::table('articles', function (Blueprint $table) {
            // Check if column exists, since it was already in fillable it might be in the original migration
            if (! Schema::hasColumn('articles', 'status')) {
                $table->string('status')->default('draft')->after('is_featured');
            }
        });

        Schema::table('services', function (Blueprint $table) {
            if (! Schema::hasColumn('services', 'status')) {
                $table->string('status')->default('draft')->after('is_enabled');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            if (Schema::hasColumn('articles', 'status')) {
                $table->dropColumn('status');
            }
        });

        Schema::table('services', function (Blueprint $table) {
            if (Schema::hasColumn('services', 'status')) {
                $table->dropColumn('status');
            }
        });
    }
};
