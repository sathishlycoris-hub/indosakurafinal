<?php
// ── FILE 1: app/Models/EventType.php ─────────────────────────────────────────
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class EventType extends Model
{
    protected $fillable = ['name', 'name_ja', 'sort_order'];
}
 