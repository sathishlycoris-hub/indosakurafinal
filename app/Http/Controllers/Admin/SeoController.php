<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Seo;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Seo/Index', [
            'seos' => Seo::orderBy('id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        Seo::updateOrCreate(
            ['page' => $request->page],
            $request->only('meta_title', 'meta_description', 'meta_keywords')
        );

        return back()->with('success', 'SEO saved successfully');;
    }
}

