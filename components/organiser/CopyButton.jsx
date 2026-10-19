'use client';

import { useState } from 'react';

export default function CopyButton({ text, label = 'Copy email text' }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      className="rounded-md bg-[#4285f4] px-4 py-2 text-sm font-medium text-white hover:bg-[#3367d6]"
    >
      {copied ? 'Copied' : label}
    </button>
  );
}
