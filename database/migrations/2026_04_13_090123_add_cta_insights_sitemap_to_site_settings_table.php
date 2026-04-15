<?php

// Run: php artisan make:migration add_cta_insights_sitemap_to_site_settings_table
// Paste this class, then: php artisan migrate

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {

            // ── Contact CTA section ───────────────────────
            $table->text('cta_title_en')->nullable()->after('contact_subtext_ja');
            $table->text('cta_title_ja')->nullable()->after('cta_title_en');
            $table->text('cta_description_en')->nullable()->after('cta_title_ja');
            $table->text('cta_description_ja')->nullable()->after('cta_description_en');
            $table->text('cta_button_en')->nullable()->after('cta_description_ja');
            $table->text('cta_button_ja')->nullable()->after('cta_button_en');
            $table->text('cta_button_href')->nullable()->after('cta_button_ja');

            // ── Insights nav tabs ─────────────────────────
            $table->text('ins1_en')->nullable()->after('cta_button_href');
            $table->text('ins1_ja')->nullable()->after('ins1_en');
            $table->text('ins1_href')->nullable()->after('ins1_ja');
            $table->text('ins2_en')->nullable()->after('ins1_href');
            $table->text('ins2_ja')->nullable()->after('ins2_en');
            $table->text('ins2_href')->nullable()->after('ins2_ja');
            $table->text('ins3_en')->nullable()->after('ins2_href');
            $table->text('ins3_ja')->nullable()->after('ins3_en');
            $table->text('ins3_href')->nullable()->after('ins3_ja');
            $table->text('ins4_en')->nullable()->after('ins3_href');
            $table->text('ins4_ja')->nullable()->after('ins4_en');
            $table->text('ins4_href')->nullable()->after('ins4_ja');

            // ── Sitemap — Company links ───────────────────
            $table->text('sitemap_company1_en')->nullable(); $table->text('sitemap_company1_ja')->nullable(); $table->text('sitemap_company1_href')->nullable();
            $table->text('sitemap_company2_en')->nullable(); $table->text('sitemap_company2_ja')->nullable(); $table->text('sitemap_company2_href')->nullable();
            $table->text('sitemap_company3_en')->nullable(); $table->text('sitemap_company3_ja')->nullable(); $table->text('sitemap_company3_href')->nullable();
            $table->text('sitemap_company4_en')->nullable(); $table->text('sitemap_company4_ja')->nullable(); $table->text('sitemap_company4_href')->nullable();
            $table->text('sitemap_company5_en')->nullable(); $table->text('sitemap_company5_ja')->nullable(); $table->text('sitemap_company5_href')->nullable();

            // ── Sitemap — Resources links ─────────────────
            $table->text('sitemap_resources1_en')->nullable(); $table->text('sitemap_resources1_ja')->nullable(); $table->text('sitemap_resources1_href')->nullable();
            $table->text('sitemap_resources2_en')->nullable(); $table->text('sitemap_resources2_ja')->nullable(); $table->text('sitemap_resources2_href')->nullable();
            $table->text('sitemap_resources3_en')->nullable(); $table->text('sitemap_resources3_ja')->nullable(); $table->text('sitemap_resources3_href')->nullable();
            $table->text('sitemap_resources4_en')->nullable(); $table->text('sitemap_resources4_ja')->nullable(); $table->text('sitemap_resources4_href')->nullable();
            $table->text('sitemap_resources5_en')->nullable(); $table->text('sitemap_resources5_ja')->nullable(); $table->text('sitemap_resources5_href')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn([
                'cta_title_en','cta_title_ja','cta_description_en','cta_description_ja',
                'cta_button_en','cta_button_ja','cta_button_href',
                'ins1_en','ins1_ja','ins1_href','ins2_en','ins2_ja','ins2_href',
                'ins3_en','ins3_ja','ins3_href','ins4_en','ins4_ja','ins4_href',
                'sitemap_company1_en','sitemap_company1_ja','sitemap_company1_href',
                'sitemap_company2_en','sitemap_company2_ja','sitemap_company2_href',
                'sitemap_company3_en','sitemap_company3_ja','sitemap_company3_href',
                'sitemap_company4_en','sitemap_company4_ja','sitemap_company4_href',
                'sitemap_company5_en','sitemap_company5_ja','sitemap_company5_href',
                'sitemap_resources1_en','sitemap_resources1_ja','sitemap_resources1_href',
                'sitemap_resources2_en','sitemap_resources2_ja','sitemap_resources2_href',
                'sitemap_resources3_en','sitemap_resources3_ja','sitemap_resources3_href',
                'sitemap_resources4_en','sitemap_resources4_ja','sitemap_resources4_href',
                'sitemap_resources5_en','sitemap_resources5_ja','sitemap_resources5_href',
            ]);
        });
    }
};