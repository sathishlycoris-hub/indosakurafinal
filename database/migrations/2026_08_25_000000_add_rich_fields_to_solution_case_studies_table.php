<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Brings solution_case_studies up to the same field set as the India Desk
     * embedded case studies — field names match Admin/IndiaDesks/Index.tsx's
     * CaseStudy interface exactly (subtitle / benefit / implementation /
     * content).
     *
     * The base table (2026_01_02_113933) only ever had:
     * id, solution_id, title, client, summary, result, sort_order, timestamps.
     * The SolutionCaseStudy model's fillable list already assumed title_ja,
     * client_ja, summary_ja, result_ja, and image existed — they didn't, so
     * this migration adds them too, alongside the new rich fields below.
     *
     * IDEMPOTENT: an earlier version of this migration failed partway through
     * (MySQL applied some ADD COLUMN statements before erroring on another),
     * leaving some of these columns already present. Every column add below
     * is now guarded with hasColumn(), so this is safe to run regardless of
     * how far that first attempt got.
     */
    public function up(): void
    {
        Schema::table('solution_case_studies', function (Blueprint $table) {
            $has = fn (string $col) => Schema::hasColumn('solution_case_studies', $col);

            // Legacy bilingual/image columns the model expected but the base
            // table never had.
            if (!$has('title_ja'))    $table->string('title_ja')->nullable()->after('title');
            if (!$has('client_ja'))   $table->string('client_ja')->nullable()->after('client');
            if (!$has('summary_ja'))  $table->text('summary_ja')->nullable()->after('summary');
            if (!$has('result_ja'))   $table->string('result_ja')->nullable()->after('result');
            if (!$has('image'))       $table->string('image')->nullable()->after('result_ja');

            if (!$has('slug'))        $table->string('slug')->nullable()->after('solution_id');

            if (!$has('subtitle'))    $table->string('subtitle')->nullable()->after('title_ja');
            if (!$has('subtitle_ja')) $table->string('subtitle_ja')->nullable()->after('subtitle');

            if (!$has('company_name'))    $table->string('company_name')->nullable()->after('subtitle_ja');
            if (!$has('company_name_ja')) $table->string('company_name_ja')->nullable()->after('company_name');
            if (!$has('ceo_name'))        $table->string('ceo_name')->nullable()->after('company_name_ja');
            if (!$has('ceo_name_ja'))     $table->string('ceo_name_ja')->nullable()->after('ceo_name');

            if (!$has('logo'))             $table->string('logo')->nullable()->after('image');
            if (!$has('hero_image'))       $table->string('hero_image')->nullable()->after('logo');
            if (!$has('secondary_image'))  $table->string('secondary_image')->nullable()->after('hero_image');

            if (!$has('tags'))     $table->string('tags')->nullable()->after('secondary_image');
            if (!$has('tags_ja'))  $table->string('tags_ja')->nullable()->after('tags');

            if (!$has('hero_description'))    $table->text('hero_description')->nullable()->after('tags_ja');
            if (!$has('hero_description_ja')) $table->text('hero_description_ja')->nullable()->after('hero_description');

            // "Subject" box on the show page
            if (!$has('benefit'))    $table->text('benefit')->nullable()->after('hero_description_ja');
            if (!$has('benefit_ja')) $table->text('benefit_ja')->nullable()->after('benefit');

            // "Implementation Effect" box on the show page
            if (!$has('implementation'))    $table->text('implementation')->nullable()->after('benefit_ja');
            if (!$has('implementation_ja')) $table->text('implementation_ja')->nullable()->after('implementation');

            // Long-form body at bottom of show page
            if (!$has('content'))    $table->longText('content')->nullable()->after('implementation_ja');
            if (!$has('content_ja')) $table->longText('content_ja')->nullable()->after('content');

            // SEO — mirrors CaseStudy / IndiaDesk case study meta fields
            if (!$has('meta_title'))          $table->string('meta_title')->nullable()->after('content_ja');
            if (!$has('meta_title_ja'))       $table->string('meta_title_ja')->nullable()->after('meta_title');
            if (!$has('meta_description'))    $table->string('meta_description', 500)->nullable()->after('meta_title_ja');
            if (!$has('meta_description_ja')) $table->string('meta_description_ja', 500)->nullable()->after('meta_description');
            if (!$has('meta_keywords'))       $table->string('meta_keywords', 500)->nullable()->after('meta_description_ja');
            if (!$has('meta_keywords_ja'))    $table->string('meta_keywords_ja', 500)->nullable()->after('meta_keywords');
            if (!$has('og_image'))            $table->string('og_image')->nullable()->after('meta_keywords_ja');
        });

        // Unique index — check via doctrine/dbal-free approach: try/catch,
        // since Schema::hasColumn doesn't cover indexes and getIndexes()
        // requires doctrine/dbal which may not be installed here.
        try {
            Schema::table('solution_case_studies', function (Blueprint $table) {
                $table->unique(['solution_id', 'slug']);
            });
        } catch (\Throwable $e) {
            // Already exists from the earlier partial run — safe to ignore.
        }
    }

    public function down(): void
    {
        Schema::table('solution_case_studies', function (Blueprint $table) {
            try {
                $table->dropUnique(['solution_id', 'slug']);
            } catch (\Throwable $e) {
                // Index may not exist — ignore.
            }

            $columns = [
                'title_ja', 'client_ja', 'summary_ja', 'result_ja', 'image',
                'slug',
                'subtitle', 'subtitle_ja',
                'company_name', 'company_name_ja',
                'ceo_name', 'ceo_name_ja',
                'logo', 'hero_image', 'secondary_image',
                'tags', 'tags_ja',
                'hero_description', 'hero_description_ja',
                'benefit', 'benefit_ja',
                'implementation', 'implementation_ja',
                'content', 'content_ja',
                'meta_title', 'meta_title_ja',
                'meta_description', 'meta_description_ja',
                'meta_keywords', 'meta_keywords_ja',
                'og_image',
            ];

            $existing = array_filter($columns, fn ($c) => Schema::hasColumn('solution_case_studies', $c));
            if ($existing) {
                $table->dropColumn(array_values($existing));
            }
        });
    }
};
