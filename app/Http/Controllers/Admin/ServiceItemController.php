<?php
// app/Http/Controllers/Admin/ServiceItemController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceItemController extends Controller
{
    public function index(Service $service)
    {
        return Inertia::render('Admin/Services/Items/Index', [
            'service' => $service->only(['id', 'title', 'slug']),
            'items'   => $service->items()->get(),
        ]);
    }

    private const JSON_KEYS = [
        'sub_services', 'features', 'benefits', 'process_steps',
        'tech_stack', 'industries', 'why_choose', 'faqs',
    ];

    private function validateAndDecode(Request $request, Service $service, ?int $ignoreId = null): array
    {
        $slugRule = 'required|string|max:255|unique:service_items,slug,'
            . ($ignoreId ?? 'NULL') . ',id,service_id,' . $service->id;

        $request->validate([
            'title'               => 'required|string|max:255',
            'title_ja'            => 'nullable|string|max:255',
            'slug'                => $slugRule,
            'card_description'    => 'nullable|string',
            'card_description_ja' => 'nullable|string',
            'subtitle'            => 'nullable|string',
            'subtitle_ja'         => 'nullable|string',
            'hero_description'    => 'nullable|string',
            'hero_description_ja' => 'nullable|string',
            'intro'               => 'nullable|string',
            'intro_ja'            => 'nullable|string',
            'cta_label'           => 'nullable|string|max:255',
            'cta_label_ja'        => 'nullable|string|max:255',
            'cta_url'             => 'nullable|string|max:255',
            'hero_image'          => 'nullable|image|max:4096',
            'meta_title'          => 'nullable|string|max:255',
            'meta_title_ja'       => 'nullable|string|max:255',
            'meta_description'    => 'nullable|string|max:500',
            'meta_description_ja' => 'nullable|string|max:500',
            'meta_keywords'       => 'nullable|string|max:500',
            'meta_keywords_ja'    => 'nullable|string|max:500',
            'og_image'            => 'nullable|image|max:4096',
        ], [
            'title.required' => 'The item title is required.',
            'slug.required'  => 'The slug is required.',
            'slug.unique'    => 'This slug is already used within this service.',
        ]);

        $decoded = [];
        foreach (self::JSON_KEYS as $key) {
            $decoded[$key] = $request->filled($key)
                ? json_decode($request->input($key), true)
                : [];
        }
        return $decoded;
    }

    private function buildPayload(Request $request, Service $service, array $decoded, ?string $hero, ?string $og): array
    {
        $slug = trim($request->input('slug', ''));
        if ($slug === '') {
            $slug = Str::slug($request->input('title', 'item-' . time()));
        }

        return array_merge([
            'service_id'          => $service->id,
            'slug'                => $slug,
            'sort_order'          => (int) $request->input('sort_order', 0),
            'title'               => $request->title,
            'title_ja'            => $request->title_ja,
            'card_description'    => $request->card_description,
            'card_description_ja' => $request->card_description_ja,
            'subtitle'            => $request->subtitle,
            'subtitle_ja'         => $request->subtitle_ja,
            'hero_description'    => $request->hero_description,
            'hero_description_ja' => $request->hero_description_ja,
            'intro'               => $request->intro,
            'intro_ja'            => $request->intro_ja,
            'cta_label'           => $request->cta_label,
            'cta_label_ja'        => $request->cta_label_ja,
            'cta_url'             => $request->cta_url ?? '/contact',
            'hero_image'          => $hero,
            'meta_title'          => $request->meta_title,
            'meta_title_ja'       => $request->meta_title_ja,
            'meta_description'    => $request->meta_description,
            'meta_description_ja' => $request->meta_description_ja,
            'meta_keywords'       => $request->meta_keywords,
            'meta_keywords_ja'    => $request->meta_keywords_ja,
            'og_image'            => $og,
        ], $decoded);
    }

    public function store(Request $request, Service $service)
    {
        $decoded = $this->validateAndDecode($request, $service);

        DB::transaction(function () use ($request, $service, $decoded) {
            $hero = $request->hasFile('hero_image')
                ? $request->file('hero_image')->store('service-items', 'public') : null;
            $og = $request->hasFile('og_image')
                ? $request->file('og_image')->store('service-items/og', 'public') : null;

            ServiceItem::create($this->buildPayload($request, $service, $decoded, $hero, $og));
        });

        return back()->with('success', 'Service item saved successfully.');
    }

    public function update(Request $request, Service $service, ServiceItem $item)
    {
        abort_unless($item->service_id === $service->id, 404);
        $decoded = $this->validateAndDecode($request, $service, $item->id);

        DB::transaction(function () use ($request, $service, $item, $decoded) {
            $hero = $item->hero_image;
            if ($request->hasFile('hero_image')) {
                if ($item->hero_image) Storage::disk('public')->delete($item->hero_image);
                $hero = $request->file('hero_image')->store('service-items', 'public');
            }

            $og = $item->og_image;
            if ($request->hasFile('og_image')) {
                if ($item->og_image) Storage::disk('public')->delete($item->og_image);
                $og = $request->file('og_image')->store('service-items/og', 'public');
            }

            $item->update($this->buildPayload($request, $service, $decoded, $hero, $og));
        });

        return back()->with('success', 'Service item updated successfully.');
    }

    public function destroy(Service $service, ServiceItem $item)
    {
        abort_unless($item->service_id === $service->id, 404);

        DB::transaction(function () use ($item) {
            foreach (['hero_image', 'og_image'] as $img) {
                if ($item->{$img}) Storage::disk('public')->delete($item->{$img});
            }
            $item->delete();
        });

        return back()->with('success', 'Service item deleted successfully.');
    }
}