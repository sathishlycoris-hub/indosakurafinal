<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /*
|--------------------------------------------------------------------------
| JOBS (Additional Japanese Fields)
|--------------------------------------------------------------------------
*/

        DB::statement("ALTER TABLE jobs ADD department_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs ADD location_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs ADD employment_type_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs ADD experience_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs ADD salary_ja VARCHAR(255) NULL");


        /*
|--------------------------------------------------------------------------
| BLOGS
|--------------------------------------------------------------------------
*/

        DB::statement("ALTER TABLE blogs ADD category_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE blogs ADD author_ja VARCHAR(255) NULL");


        /*
|--------------------------------------------------------------------------
| HISTORIES
|--------------------------------------------------------------------------
*/

        DB::statement("ALTER TABLE histories ADD month_ja VARCHAR(255) NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            //
        });
    }
};
