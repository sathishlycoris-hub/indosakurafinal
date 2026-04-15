export default function ContactDrawer({ contact, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end">
      <div className="w-[420px] bg-white p-6 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Contact Enquiry Details</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <Field label="Name" value={contact.name_en} />
        <Field label="Name (JP)" value={contact.name_ja} />
        <Field label="Email" value={contact.email} />
        <Field label="Mobile" value={contact.telephone} />
        <Field label="Company" value={contact.company_name} />
        <Field label="Department" value={contact.department} />
        <Field label="Post" value={contact.post} />
        <Field label="Product / Service" value={contact.product_service} />
        <Field label="Expected Date" value={contact.expected_date} />
        <Field
          label="Classification"
          value={contact.classification?.join(', ')}
        />
        <Field label="Address" value={contact.address} />
        <Field label="Prefecture" value={contact.prefecture} />
        <Field label="Message" value={contact.requests} />
      </div>
    </div>
  );
}

function Field({ label, value }: any) {
  return (
    <div className="mb-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm">{value || '-'}</div>
    </div>
  );
}
