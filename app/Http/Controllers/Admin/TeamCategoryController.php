<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamCategory;
use Illuminate\Http\Request;

class TeamCategoryController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255|unique:team_categories,name',
            'name_ja'    => 'nullable|string|max:255',
        ]);

        $data['sort_order'] = TeamCategory::max('sort_order') + 1;

        TeamCategory::create($data);

        return back()->with('success', 'Category added successfully');
    }

    public function update(Request $request, TeamCategory $teamCategory)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255|unique:team_categories,name,' . $teamCategory->id,
            'name_ja' => 'nullable|string|max:255',
        ]);

        $teamCategory->update($data);

        return back()->with('success', 'Category updated successfully');
    }

    public function destroy(TeamCategory $teamCategory)
    {
        $teamCategory->delete();

        return back()->with('success', 'Category deleted successfully');
    }
}