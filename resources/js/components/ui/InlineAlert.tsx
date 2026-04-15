import { usePage } from "@inertiajs/react";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function InlineAlert() {
  const { flash } = usePage<{
    flash?: {
      success?: string;
      error?: string;
    };
  }>().props;

  if (!flash?.success && !flash?.error) return null;

  return (
    <div className="mb-6">
      {flash.success && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          <CheckCircle className="w-5 h-5 mt-0.5" />
          <span className="text-sm font-medium">
            {flash.success}
          </span>
        </div>
      )}

      {flash.error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          <AlertTriangle className="w-5 h-5 mt-0.5" />
          <span className="text-sm font-medium">
            {flash.error}
          </span>
        </div>
      )}
    </div>
  );
}
