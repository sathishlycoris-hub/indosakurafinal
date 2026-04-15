<?php

// ── ProfilePageController.php (updated) ──────────────────────────────────────
// Pass corp profile settings alongside existing companyProfiles data.

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CorpProfileSetting;
use App\Models\Profile;
use Inertia\Inertia;

class ProfilePageController extends Controller
{
    public function index()
    {
        return Inertia::render('Corporate/Profile', [
            // Existing company profile table rows (unchanged)
            'companyProfiles' => Profile::orderBy('sort_order')->get(),

            // NEW: Our Strengths CMS settings (auto-created with defaults if not exists)
            'corpSettings' => CorpProfileSetting::firstOrCreate([]),
        ]);
    }
}


