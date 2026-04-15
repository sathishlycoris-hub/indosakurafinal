<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
class BlogPageController extends Controller
{
    //
     public function index()
    {
     return Inertia::render('Blogs', [
            'blogs' => Blog::where('status', 'published')
                ->orderBy('published_date', 'desc')
                ->get(),
        ]);
    }

    public function show(Blog $blog)
    {
        abort_if($blog->status !== 'published', 404);

        return Inertia::render('Blogs/BlogDetails', [
            'blog' => $blog,
        ]);
    }
}
