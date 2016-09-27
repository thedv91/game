<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTypeToFixTheLeakTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('fix_the_leaks', function (Blueprint $table) {
            $table->tinyInteger('type')->default(1)->nullable()->after('score');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('fix_the_leaks', function (Blueprint $table) {
            $table->dropColumn(['type']);
        });
    }
}
