<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected array $tables = [
        'histories',
        'newsevents',
        'philosophies',
        'policies',
        'profiles',
        'teams',
        'clients',
    ];

    public function up(): void
    {
        foreach ($this->tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->string('meta_title')->nullable();
                $table->string('meta_title_ja')->nullable();
                $table->text('meta_description')->nullable();
                $table->text('meta_description_ja')->nullable();
                $table->string('meta_keywords')->nullable();
                $table->string('meta_keywords_ja')->nullable();
                $table->string('og_image')->nullable();
            });
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropColumn([
                    'meta_title',
                    'meta_title_ja',
                    'meta_description',
                    'meta_description_ja',
                    'meta_keywords',
                    'meta_keywords_ja',
                    'og_image',
                ]);
            });
        }
    }
};