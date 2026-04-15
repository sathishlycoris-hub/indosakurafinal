<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\Greeting;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GreetingPageController extends Controller
{
    //
     public function index()
    {
        return Inertia::render('Corporate/Greetings', [
            'greeting' => Greeting::latest()->first(),
        ]);
    }
}
