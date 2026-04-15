<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Philosophy;
use Inertia\Inertia;

class PhilosophyPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Corporate/Philosophy', [
            'philosophies' => Philosophy::orderBy('id')->get(),
        ]);
    }
}
