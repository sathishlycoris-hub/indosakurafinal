<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Inertia\Inertia;
use App\Models\Seo;
class ClientPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Corporate/Clients', [
            // usually you will have only ONE client record
            'client' => Client::with(['sections' => function ($q) {
                $q->orderBy('name');
            }])->latest()->first(),

            'seo' => Seo::where('page', 'clients')->first(),
        ]);
    }
}
