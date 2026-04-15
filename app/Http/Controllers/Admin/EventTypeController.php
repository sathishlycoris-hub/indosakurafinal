<?php
namespace App\Http\Controllers\Admin;
 
use App\Http\Controllers\Controller;
use App\Models\EventType;
use Illuminate\Http\Request;
 
class EventTypeController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:100|unique:event_types,name',
            'name_ja' => 'nullable|string|max:100',
        ]);
        $data['sort_order'] = EventType::max('sort_order') + 1;
        EventType::create($data);
        return back()->with('success', 'Event type added');
    }
 
    public function update(Request $request, EventType $eventType)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:100|unique:event_types,name,' . $eventType->id,
            'name_ja' => 'nullable|string|max:100',
        ]);
        $eventType->update($data);
        return back()->with('success', 'Event type updated');
    }
 
    public function destroy(EventType $eventType)
    {
        $eventType->delete();
        return back()->with('success', 'Event type deleted');
    }
}
