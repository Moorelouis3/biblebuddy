"use client";

import { useEffect, useState } from "react";
import CreditToast from "./CreditToast";
import CreditWarning from "./CreditWarning";
import { CREDIT_FEEDBACK_EVENT } from "@/lib/creditClient";

type CreditFeedbackDetail =
  | { type: "toast"; message: string }
  | { type: "warning"; message: string };

export default function GlobalCreditFeedback() {
  const [toastMessage, setToastMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<CreditFeedbackDetail>;
      const detail = customEvent.detail;
      if (!detail) {
        return;
      }

      if (detail.type === "toast") {
        setToastMessage(detail.message);
        setShowToast(true);
        return;
      }

      setWarningMessage(detail.message);
      setShowWarning(true);
    };

    window.addEventListener(CREDIT_FEEDBACK_EVENT, handler as EventListener);
    return () => window.removeEventListener(CREDIT_FEEDBACK_EVENT, handler as EventListener);
  }, []);

  return (
    <>
      <CreditToast open={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
      <CreditWarning open={showWarning} onClose={() => setShowWarning(false)} message={warningMessage} />
    </>
  );
}
