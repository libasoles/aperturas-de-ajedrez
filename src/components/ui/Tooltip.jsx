import * as RadixTooltip from '@radix-ui/react-tooltip';

export function TooltipProvider({ children }) {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      {children}
    </RadixTooltip.Provider>
  );
}

export function Tooltip({ children, content }) {
  if (!content) return children;

  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
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
