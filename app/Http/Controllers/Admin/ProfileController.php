<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Profile/Index', [
            'profiles' => Profile::orderBy('sort_order')->get(),
        ]);
    }

    /**
     * Store new profile (Sheet - Add)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            // 'title'     => 'nullable|string|max:255',
            'sub_title' => 'nullable|string|max:255',
            'sub_title_ja' => 'nullable|string|max:255',
            'content'   => 'nullable|string',
            'content_ja' => 'nullable|string',
        ]);

        Profile::create($data);

        return redirect()
            ->route('admin.profile.index')
            ->with('success', 'Profile added successfully');
    }

    /**
     * Update profile (Sheet - Edit)
     */
    public function update(Request $request, Profile $profile)
    {
        $data = $request->validate([
            // 'title'     => 'nullable|string|max:255',
            'sub_title' => 'nullable|string|max:255',
            'sub_title_ja' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'content_ja' => 'nullable|string',
        ]);

        $profile->update($data);

        return redirect() 
            ->route('admin.profile.index')
            ->with('success', 'Profile updated successfully');
    }

    /**
     * Delete profile
     */
    public function destroy(Profile $profile)
    {
        $profile->delete();

        return back()->with('success', 'Profile deleted successfully');
    }

    public function reorder(Request $request)
    {
        $request->validate(['ids' => 'required|array']);

        foreach ($request->ids as $index => $id) {
            Profile::where('id', $id)->update(['sort_order' => $index]);
        }

        return redirect()->route('admin.profile.index');
    }
}
