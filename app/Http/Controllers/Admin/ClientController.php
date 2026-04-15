<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ClientSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * List clients (Table + Sheet)
     */
    public function index()
    {
        return Inertia::render('Admin/Clients/Index', [
            'clients' => Client::with('sections')->latest()->get(),
        ]);
    }

    /**
     * Store new client (Sheet - Add)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'description' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'sections' => 'nullable|array|min:1',
            'sections.*.type' => 'nullable|in:customer,alliance,contract,partner',
            'sections.*.name' => 'nullable|string|max:255',
            'sections.*.name_ja' => 'nullable|string|max:255',
            'sections.*.link' => 'nullable|string|max:255',
        ]);

        $client = Client::create([
            'description' => $data['description'],
            'description_ja' => $data['description_ja'] ?? null,
        ]);

        foreach ($data['sections'] as $index => $section) {
            ClientSection::create([
                'client_id' => $client->id,
                'section_type' => $section['type'],
                'name' => $section['name'],
                'name_ja' => $section['name_ja'] ?? null,
                'link' => $section['link'] ?? null,
                'sort_order' => $index,
            ]);
        }

        return redirect()
            ->route('admin.clients.index')
            ->with('success', 'Clients added successfully');
    }

    /**
     * Update client (Sheet - Edit)
     */
    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'description' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'sections' => 'nullable|array|min:1',
            'sections.*.type' => 'nullable|in:customer,alliance,contract,partner',
            'sections.*.name' => 'nullable|string|max:255',
            'sections.*.name_ja' => 'nullable|string|max:255',
            'sections.*.link' => 'nullable|string|max:255',
        ]);

        $client->update([
            'description' => $data['description'],
            'description_ja' => $data['description_ja'],
        ]);

        // Replace sections (same as Jobs)
        $client->sections()->delete();

        foreach ($data['sections'] as $index => $section) {
            ClientSection::create([
                'client_id' => $client->id,
                'section_type' => $section['type'],
                'name' => $section['name'],
                'name_ja' => $section['name_ja'] ?? null,
                'link' => $section['link'] ?? null,
                'sort_order' => $index,
            ]);
        }

        return redirect()
            ->route('admin.clients.index')
            ->with('success', 'Clients updated successfully');
    }

    /**
     * Delete client
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return back()->with('success', 'Clients deleted successfully');
    }
}
