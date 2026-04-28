<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use App\Models\Seo;
class BlogPageController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Blogs', [
            'blogs' => Blog::where('status', 'published')
                ->orderBy('published_date', 'desc')
                ->get(),
                 'seo' => Seo::where('page', 'insights')->first(),
        ]);
    }

    public function show(string $slug)
    {
        $blog = Blog::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return Inertia::render('Blogs/BlogDetails', [
            'blog' => $blog,
        ]);
    }
}
