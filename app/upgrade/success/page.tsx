import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function UpgradeSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
