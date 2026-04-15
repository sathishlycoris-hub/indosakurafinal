import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function FlashMessage() {
  const { flash } = usePage().props as any;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (flash?.success || flash?.error) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [flash]);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-4 z-50">
      {flash?.success && (
        <div className="bg-green-600 text-white px-4 py-2 rounded shadow">
          {flash.success}
        </div>
      )}

      {flash?.error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded shadow">
          {flash.error}
        </div>
      )}
    </div>
  );
}
