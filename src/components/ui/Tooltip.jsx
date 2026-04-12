import * as RadixTooltip from '@radix-ui/react-tooltip';
import { useEffect, useRef, useState } from 'react';

const TOOLTIP_DELAY_MS = 300;

export function TooltipProvider({ children }) {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      {children}
    </RadixTooltip.Provider>
  );
}

export function Tooltip({ children, content }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  if (!content) return children;

  const clearScheduledOpen = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <RadixTooltip.Root open={open}>
      <RadixTooltip.Trigger
        asChild
        onPointerEnter={(event) => {
          if (event.pointerType !== 'mouse') return;
          clearScheduledOpen();
          timeoutRef.current = setTimeout(() => {
            setOpen(true);
            timeoutRef.current = null;
          }, TOOLTIP_DELAY_MS);
        }}
        onPointerLeave={() => {
          clearScheduledOpen();
          setOpen(false);
        }}
        onPointerDown={() => {
          clearScheduledOpen();
          setOpen(false);
        }}
        onFocus={() => {
          clearScheduledOpen();
          setOpen(false);
        }}
        onBlur={() => {
          clearScheduledOpen();
          setOpen(false);
        }}
      >
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side="top"
          sideOffset={6}
          style={{
            background: '#0f0f1a',
            border: '1px solid #bf5fff60',
            boxShadow: '0 0 12px #bf5fff30, 0 4px 16px #00000080',
            color: '#e0d8ff',
            fontFamily: 'monospace',
            fontSize: '14px',
            letterSpacing: '0.04em',
            padding: '6px 10px',
            borderRadius: '2px',
            maxWidth: '220px',
            lineHeight: '1.5',
            zIndex: 9999,
          }}
        >
          {content}
          <RadixTooltip.Arrow style={{ fill: '#bf5fff60' }} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
