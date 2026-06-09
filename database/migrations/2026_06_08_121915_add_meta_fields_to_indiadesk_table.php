<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('india_desks', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('cta_url');
            $table->string('meta_title_ja')->nullable()->after('meta_title');
            $table->text('meta_description')->nullable()->after('meta_title_ja');
            $table->text('meta_description_ja')->nullable()->after('meta_description');
            $table->string('meta_keywords')->nullable()->after('meta_description_ja');
            $table->string('meta_keywords_ja')->nullable()->after('meta_keywords');
            $table->string('og_image')->nullable()->after('meta_keywords_ja');
        });
    }

    public function down(): void
    {
        Schema::table('india_desks', function (Blueprint $table) {
            $table->dropColumn([
                'meta_title', 'meta_title_ja',
                'meta_description', 'meta_description_ja',
                'meta_keywords', 'meta_keywords_ja',
                'og_image',
            ]);
        });
    }
};