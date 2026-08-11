"use client";

import { useEffect, useRef } from "react";

export function useDialogA11y(isOpen: boolean, onClose: () => void) {
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
    } else if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);
}
