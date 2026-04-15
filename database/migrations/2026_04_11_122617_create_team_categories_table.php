<?php

// php artisan make:migration create_team_categories_table
// Then paste this and run: php artisan migrate

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();       // EN name — also used as the key in teams.category
            $table->string('name_ja')->nullable();  // JA display name
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        // ── Seed the default categories ──────────────────────────────────
        // Run after migration or place in a seeder
        $defaults = [
            ['name' => 'Management Team',                    'name_ja' => 'マネジメントチーム',              'sort_order' => 1],
            ['name' => 'Our Growth Leaders',                 'name_ja' => '成長リーダー',                    'sort_order' => 2],
            ['name' => 'Technology & Innovation Leadership', 'name_ja' => 'テクノロジー＆イノベーションリーダーシップ', 'sort_order' => 3],
            ['name' => 'Strategic Alliance Partners',        'name_ja' => '戦略的アライアンスパートナー',     'sort_order' => 4],
        ];

        foreach ($defaults as $cat) {
            \App\Models\TeamCategory::create($cat);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('team_categories');
    }
};