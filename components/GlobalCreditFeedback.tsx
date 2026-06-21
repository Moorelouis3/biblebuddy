"use client";

import { useEffect, useState } from "react";
import CreditToast from "./CreditToast";
import { CREDIT_FEEDBACK_EVENT } from "@/lib/creditClient";

type CreditFeedbackDetail = {
  message: string;
};

export default function GlobalCreditFeedback() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<CreditFeedbackDetail>;
      const detail = customEvent.detail;
      if (!detail?.message) {
        return;
      }

      setMessage(detail.message);
      setOpen(true);
    };

    window.addEventListener(CREDIT_FEEDBACK_EVENT, handler as EventListener);
    return () => window.removeEventListener(CREDIT_FEEDBACK_EVENT, handler as EventListener);
  }, []);

  return <CreditToast open={open} onClose={() => setOpen(false)} message={message} />;
}
