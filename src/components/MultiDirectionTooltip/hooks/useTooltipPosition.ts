import { useMemo } from 'react';
import type { PopupPlacement } from '../types';

interface Position {
  top: number;
  left: number;
  placement: PopupPlacement;
}

interface UseTooltipPositionProps {
  triggerRef: React.RefObject<HTMLDivElement | null>;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  placement: PopupPlacement;
  offset?: number;
  disableFlip?: boolean;
}

/**
 * Calculates tooltip position based on placement and offset.
 * Flips placement if tooltip would overflow viewport (unless disableFlip is true).
 */
export function useTooltipPosition({
  triggerRef,
  tooltipRef,
  placement,
  offset = 8,
  disableFlip = false,
}: UseTooltipPositionProps): Position {
  return useMemo(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) {
      return { top: 0, left: 0, placement };
    }
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let top = 0, left = 0, finalPlacement = placement;
    // Calculate initial position
    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + offset;
        break;
    }
    // Auto-flip if overflow
    if (!disableFlip) {
      if (placement === 'top' && top < 0) {
        finalPlacement = 'bottom';
        top = triggerRect.bottom + offset;
      } else if (placement === 'bottom' && top + tooltipRect.height > viewportHeight) {
        finalPlacement = 'top';
        top = triggerRect.top - tooltipRect.height - offset;
      } else if (placement === 'left' && left < 0) {
        finalPlacement = 'right';
        left = triggerRect.right + offset;
      } else if (placement === 'right' && left + tooltipRect.width > viewportWidth) {
        finalPlacement = 'left';
        left = triggerRect.left - tooltipRect.width - offset;
      }
    }
    return { top, left, placement: finalPlacement };
  }, [triggerRef, tooltipRef, placement, offset, disableFlip]);
}
