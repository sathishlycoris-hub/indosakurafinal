<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();       // EN — stored in newsevents.eventtype
            $table->string('name_ja')->nullable();  // JA display name
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
 
        // Seed defaults
        $defaults = [
            ['name' => 'All',           'name_ja' => 'すべて',             'sort_order' => 0],
            ['name' => 'Press Release', 'name_ja' => 'プレスリリース',     'sort_order' => 1],
            ['name' => 'Updates',       'name_ja' => 'アップデート',       'sort_order' => 2],
            ['name' => 'Media',         'name_ja' => 'メディア',           'sort_order' => 3],
            ['name' => 'Event',         'name_ja' => 'イベント',           'sort_order' => 4],
            ['name' => 'Notice',        'name_ja' => 'お知らせ',           'sort_order' => 5],
        ];
        foreach ($defaults as $d) \App\Models\EventType::create($d);
    }
 
    public function down(): void
    {
        Schema::dropIfExists('event_types');
    }
};
