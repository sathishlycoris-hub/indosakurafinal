<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {

            // ── Text / rich-text columns ──────────────────────────────────
            if (!Schema::hasColumn('services', 'overview')) {
                $table->longText('overview')->nullable()->after('hero_description');
            }
            if (!Schema::hasColumn('services', 'overview_ja')) {
                $table->longText('overview_ja')->nullable()->after('overview');
            }
            if (!Schema::hasColumn('services', 'how_it_works_ja')) {
                $table->longText('how_it_works_ja')->nullable()->after('how_it_works');
            }

            // ── CTA ───────────────────────────────────────────────────────
            if (!Schema::hasColumn('services', 'cta_label')) {
                $table->string('cta_label')->nullable();
            }
            if (!Schema::hasColumn('services', 'cta_label_ja')) {
                $table->string('cta_label_ja')->nullable();
            }
            if (!Schema::hasColumn('services', 'cta_url')) {
                $table->string('cta_url')->nullable()->default('/contact');
            }

            // ── JSON sections (stored on the service row) ─────────────────
            if (!Schema::hasColumn('services', 'service_items')) {
                $table->json('service_items')->nullable();   // Our Services list
            }
            if (!Schema::hasColumn('services', 'why_choose')) {
                $table->json('why_choose')->nullable();      // Why Choose Indo-Sakura
            }
            if (!Schema::hasColumn('services', 'approach_steps')) {
                $table->json('approach_steps')->nullable();  // Development Approach steps
            }
            if (!Schema::hasColumn('services', 'testimonials')) {
                $table->json('testimonials')->nullable();
            }
            if (!Schema::hasColumn('services', 'tech_stack')) {
                $table->json('tech_stack')->nullable();
            }
        });

        // ── Add JA columns to highlights if missing ───────────────────────
        if (!Schema::hasColumn('service_highlights', 'title_ja')) {
            Schema::table('service_highlights', function (Blueprint $table) {
                $table->string('title_ja')->nullable()->after('title');
            });
        }
        if (!Schema::hasColumn('service_highlights', 'description_ja')) {
            Schema::table('service_highlights', function (Blueprint $table) {
                $table->longText('description_ja')->nullable()->after('description');
            });
        }

        // ── Add JA columns to benefits if missing ─────────────────────────
        if (!Schema::hasColumn('service_benefits', 'title_ja')) {
            Schema::table('service_benefits', function (Blueprint $table) {
                $table->string('title_ja')->nullable()->after('title');
            });
        }
        if (!Schema::hasColumn('service_benefits', 'description_ja')) {
            Schema::table('service_benefits', function (Blueprint $table) {
                $table->longText('description_ja')->nullable()->after('description');
            });
        }
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'overview', 'overview_ja', 'how_it_works_ja',
                'cta_label', 'cta_label_ja', 'cta_url',
                'service_items', 'why_choose', 'approach_steps',
                'testimonials', 'tech_stack',
            ]);
        });
    }
};