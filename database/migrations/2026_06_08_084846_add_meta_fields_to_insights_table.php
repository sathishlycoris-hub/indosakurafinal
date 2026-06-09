<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ── BLOGS ──────────────────────────────────────────────
        Schema::table('blogs', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('status');
            $table->string('meta_title_ja')->nullable()->after('meta_title');
            $table->text('meta_description')->nullable()->after('meta_title_ja');
            $table->text('meta_description_ja')->nullable()->after('meta_description');
            $table->string('meta_keywords')->nullable()->after('meta_description_ja');
            $table->string('meta_keywords_ja')->nullable()->after('meta_keywords');
            $table->string('og_image')->nullable()->after('meta_keywords_ja');
        });

        // ── CASE STUDIES ───────────────────────────────────────
        Schema::table('case_studies', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('tags');
            $table->string('meta_title_ja')->nullable()->after('meta_title');
            $table->text('meta_description')->nullable()->after('meta_title_ja');
            $table->text('meta_description_ja')->nullable()->after('meta_description');
            $table->string('meta_keywords')->nullable()->after('meta_description_ja');
            $table->string('meta_keywords_ja')->nullable()->after('meta_keywords');
            $table->string('og_image')->nullable()->after('meta_keywords_ja');
        });

        // ── INFOGRAPHICS ───────────────────────────────────────
        Schema::table('infographics', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('status');
            $table->string('meta_title_ja')->nullable()->after('meta_title');
            $table->text('meta_description')->nullable()->after('meta_title_ja');
            $table->text('meta_description_ja')->nullable()->after('meta_description');
            $table->string('meta_keywords')->nullable()->after('meta_description_ja');
            $table->string('meta_keywords_ja')->nullable()->after('meta_keywords');
            $table->string('og_image')->nullable()->after('meta_keywords_ja');
        });

        // ── SEMINARS ───────────────────────────────────────────
        Schema::table('seminars', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('status');
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
        $seoColumns = [
            'meta_title', 'meta_title_ja',
            'meta_description', 'meta_description_ja',
            'meta_keywords', 'meta_keywords_ja',
            'og_image',
        ];

        foreach (['blogs', 'case_studies', 'infographics', 'seminars'] as $table) {
            Schema::table($table, function (Blueprint $table) use ($seoColumns) {
                $table->dropColumn($seoColumns);
            });
        }
    }
};