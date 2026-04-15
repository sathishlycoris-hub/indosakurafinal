<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\TeamCategory;
use Inertia\Inertia;

class TeamPageController extends Controller
{
    public function index()
    {
        $teams      = Team::orderBy('id')->get();
        $categories = TeamCategory::orderBy('sort_order')->get();

        // Dynamically group members by category so adding a new
        // category in the admin panel reflects on the page immediately.
        $grouped = $categories->mapWithKeys(function ($cat) use ($teams) {
            return [
                $cat->name => [
                    'label'    => $cat->name,
                    'label_ja' => $cat->name_ja,
                    'members'  => $teams->where('category', $cat->name)->values(),
                ],
            ];
        });

        return Inertia::render('Corporate/Team', [
            'grouped'    => $grouped,   // NEW: used by the updated Team.tsx
            'categories' => $categories, // also pass for easy iteration
        ]);
    }
}