<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Philosophy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PhilosophyController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Philosophy/Index', [
            'philosophies' => Philosophy::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'content_ja' => 'nullable|string',
            'description' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'image' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')
                ->store('philosophy', 'public');
        }

        Philosophy::create($data);

        return redirect()
            ->route('admin.philosophy.index')
            ->with('success', 'Philosophy added successfully');
    }

    public function update(Request $request, Philosophy $philosophy)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'content_ja' => 'nullable|string',
            'description' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'image' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {

            if ($philosophy->image) {
                Storage::disk('public')->delete($philosophy->image);
            }

            $data['image'] = $request->file('image')
                ->store('philosophy', 'public');
        } else {
            // Prevent image becoming NULL
            unset($data['image']);
        }

        $philosophy->update($data);

        return redirect()
            ->route('admin.philosophy.index')
            ->with('success', 'Philosophy updated successfully');
    }

    public function destroy(Philosophy $philosophy)
    {
        if ($philosophy->image) {
            Storage::disk('public')->delete($philosophy->image);
        }

        $philosophy->delete();

        return back()->with('success', 'Philosophy deleted successfully');
    }
}