<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: Arial, sans-serif; color: #333; }
  .box { max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eee; border-radius: 8px; }
  h2 { color: #e63946; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 10px; border-bottom: 1px solid #f0f0f0; }
  td:first-child { font-weight: bold; width: 160px; color: #555; }
</style></head>
<body>
<div class="box">
  <h2>New Contact Form Submission</h2>
  <table>
    <tr><td>Name</td><td>{{ $contact->name_en }}</td></tr>
    <tr><td>Email</td><td>{{ $contact->email }}</td></tr>
    <tr><td>Phone</td><td>{{ $contact->telephone }}</td></tr>
    <tr><td>Location</td><td>{{ $contact->address }}</td></tr>
    <tr><td>Message</td><td>{{ $contact->product_service }}</td></tr>
    <tr><td>Submitted At</td><td>{{ $contact->created_at->format('Y-m-d H:i') }}</td></tr>
  </table>
</div>
</body>
</html>