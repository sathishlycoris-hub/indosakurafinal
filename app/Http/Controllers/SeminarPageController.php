<?php

namespace App\Http\Controllers;

use App\Models\Seminar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeminarPageController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Seminars', [
            'upcomingSeminars' => Seminar::where('status', 'upcoming')
                ->orderBy('date')
                ->get(),

            'archivedSeminars' => Seminar::where('status', 'archived')
                ->orderBy('date', 'desc')
                ->get(),
        ]);
    }

    public function show(Seminar $seminar)
    {
        return Inertia::render('Seminar/SeminarDetail', [
            'seminar' => $seminar,
        ]);
    }
}
