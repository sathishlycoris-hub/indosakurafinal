<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    public function up(): void
    {
        Storage::disk('public')->makeDirectory('indiadesks/cs_logos');
    }

    public function down(): void
    {
        // Leave files intact on rollback
    }
};