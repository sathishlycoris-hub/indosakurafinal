<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Seminar;
use Illuminate\Http\Request;

class SeminarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Admin/Seminar/Index', [
            'seminars' => Seminar::select(
                'id',
                'title',
                'title_ja',

                'description',
                'description_ja',

                'location',
                'location_ja',

                'organizer',
                'organizer_ja',

                'participation_fee',
                'participation_fee_ja',
                'sponsorship',
                'sponsorship_ja',
                'cooperation',
                'cooperation_ja',

                'date',
                'time',
                'status',
                'tags',
                'image'

            )
                ->orderBy('date', 'desc')
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'date' => 'nullable|date',
            'time' => 'nullable|string',
            'status' => 'nullable|in:upcoming,archived',

            'title_ja' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'location_ja' => 'nullable|string',

            'participation_fee' => 'nullable|string',
            'participation_fee_ja' => 'nullable|string',
            'organizer' => 'nullable|string',
            'organizer_ja' => 'nullable|string',
            'sponsorship' => 'nullable|string',
            'sponsorship_ja' => 'nullable|string',
            'cooperation' => 'nullable|string',
            'cooperation_ja' => 'nullable|string',

            'tags' => 'nullable|string',
            'image' => 'nullable|image|max:4096',
        ]);

        if ($request->tags) {
            $data['tags'] = array_map('trim', explode(',', $request->tags));
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('seminars', 'public');
        }

        Seminar::create($data);

        return back()->with('success', 'Seminar added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Seminar $seminar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Seminar $seminar) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Seminar $seminar)
    {
        $data = $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
            'date' => 'nullable|date',
            'time' => 'nullable|string',
            'status' => 'nullable|in:upcoming,archived',

            'title_ja' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'location_ja' => 'nullable|string',

            'participation_fee' => 'nullable|string',
            'participation_fee_ja' => 'nullable|string',
            'organizer' => 'nullable|string',
            'organizer_ja' => 'nullable|string',
            'sponsorship' => 'nullable|string',
            'sponsorship_ja' => 'nullable|string',
            'cooperation' => 'nullable|string',
            'cooperation_ja' => 'nullable|string',

            'tags' => 'nullable|string',
            'image' => 'nullable|image|max:4096',
        ]);

        if ($request->filled('tags')) {
            $data['tags'] = array_map(
                'trim',
                explode(',', $request->tags)
            );
        } else {
            $data['tags'] = [];
        }

        // ✅ VERY IMPORTANT FIX
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('seminars', 'public');
        } else {
            unset($data['image']); // ← DO NOT overwrite existing image
        }

        $seminar->update($data);

        return back()->with('success', 'Seminar updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seminar $seminar)
    {
        //
        $seminar->delete();
        return back()->with('success', 'Seminar deleted');
    }
}
