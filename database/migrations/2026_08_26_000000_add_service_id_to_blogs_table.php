<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * A blog can optionally belong to one Service (one-to-many: a service has
     * many blogs, a blog belongs to at most one service). Nullable so
     * existing/general blogs unrelated to any service keep working unchanged.
     */
    public function up(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            if (!Schema::hasColumn('blogs', 'service_id')) {
                $table->foreignId('service_id')
                    ->nullable()
                    ->after('id')
                    ->constrained('services')
                    ->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            if (Schema::hasColumn('blogs', 'service_id')) {
                $table->dropConstrainedForeignId('service_id');
            }
        });
    }
};
