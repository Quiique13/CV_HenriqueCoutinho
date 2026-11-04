import { useEffect, useRef, useState } from "react";
import { copyText } from "../services/clipboard";

export function useClipboard(resetAfter = 2500) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copy(text: string) {
    try {
      await copyText(text);
      setCopied(true);
      setCopyError(false);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), resetAfter);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return { copied, copyError, copy };
}
