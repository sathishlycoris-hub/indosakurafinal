<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\History;
use Inertia\Inertia;

class HistoryPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Corporate/History', [
            'histories' => History::orderBy('year', 'desc')
                ->orderBy('month', 'desc')
                ->get(),
        ]);
    }
}
