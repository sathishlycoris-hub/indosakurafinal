<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\TeamCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Team/Index', [
            'teams'      => Team::orderBy('id', 'desc')->get(),
            'categories' => TeamCategory::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'           => 'nullable|string',
            'name_ja'        => 'nullable|string',
            'designation'    => 'nullable|string',
            'designation_ja' => 'nullable|string',
            'category'       => 'nullable|string',
            'description'    => 'nullable|string',
            'description_ja' => 'nullable|string',
            'image'          => 'nullable|image',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('team', 'public');
        }

        Team::create($data);

        return back()->with('success', 'Team member added');
    }

    public function update(Request $request, Team $team)
    {
        $data = $request->validate([
            'name'           => 'nullable|string',
            'name_ja'        => 'nullable|string',
            'designation'    => 'nullable|string',
            'designation_ja' => 'nullable|string',
            'category'       => 'nullable|string',
            'description'    => 'nullable|string',
            'description_ja' => 'nullable|string',
            'image'          => 'nullable|image',
        ]);

        if (!$request->hasFile('image')) {
            unset($data['image']);
        } else {
            if ($team->image) {
                Storage::disk('public')->delete($team->image);
            }
            $data['image'] = $request->file('image')->store('team', 'public');
        }

        $team->update($data);

        return back()->with('success', 'Team member updated');
    }

    public function destroy(Team $team)
    {
        if ($team->image) {
            Storage::disk('public')->delete($team->image);
        }

        $team->delete();

        return back()->with('success', 'Team member deleted');
    }
}