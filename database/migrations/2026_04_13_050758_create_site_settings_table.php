<?php



use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();

            // ── HEADER ────────────────────────────────────────
            $table->string('logo_image')->nullable();
            $table->string('nav1_en')->nullable(); $table->string('nav1_ja')->nullable(); $table->string('nav1_href')->nullable();
            $table->string('nav2_en')->nullable(); $table->string('nav2_ja')->nullable(); $table->string('nav2_href')->nullable();
            $table->string('nav3_en')->nullable(); $table->string('nav3_ja')->nullable(); $table->string('nav3_href')->nullable();
            $table->string('nav4_en')->nullable(); $table->string('nav4_ja')->nullable(); $table->string('nav4_href')->nullable();
            $table->string('nav5_en')->nullable(); $table->string('nav5_ja')->nullable(); $table->string('nav5_href')->nullable();
            $table->string('contact_label_en')->nullable();
            $table->string('contact_label_ja')->nullable();

            // ── FOOTER ────────────────────────────────────────
            $table->string('footer_company_heading_en')->nullable();
            $table->string('footer_company_heading_ja')->nullable();
            $table->string('footer_resources_heading_en')->nullable();
            $table->string('footer_resources_heading_ja')->nullable();
            $table->string('footer_copyright_en')->nullable();
            $table->string('footer_copyright_ja')->nullable();
            $table->string('footer_offices_en')->nullable();
            $table->string('footer_offices_ja')->nullable();
            $table->string('footer_sitemap_en')->nullable();
            $table->string('footer_sitemap_ja')->nullable();
            $table->string('footer_logo_image')->nullable();

            // ── FLOATING ACTIONS ──────────────────────────────
            $table->string('float_phone')->nullable();
            $table->string('float_email')->nullable();
            $table->string('float_whatsapp')->nullable();
            $table->string('float_whatsapp_message')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};