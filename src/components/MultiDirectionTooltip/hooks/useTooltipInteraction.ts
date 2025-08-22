import { useCallback, useRef, useState } from 'react';
import type { HoverPopupMetadata } from '../types';

interface UseTooltipInteractionProps {
  type: 'hover' | 'click';
  hoverConfig?: HoverPopupMetadata;
}

export function useTooltipInteraction({ type, hoverConfig }: UseTooltipInteractionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openTimeout = useRef<number | null>(null);
  const closeTimeout = useRef<number | null>(null);

  const open = useCallback(() => {
    if (type === 'hover' && hoverConfig?.openDelay) {
      openTimeout.current = setTimeout(() => setIsOpen(true), hoverConfig.openDelay);
    } else {
      setIsOpen(true);
    }
    hoverConfig?.onOpenCallback?.();
  }, [type, hoverConfig]);

  const close = useCallback(() => {
    if (type === 'hover' && hoverConfig?.closeDelay) {
      closeTimeout.current = setTimeout(() => setIsOpen(false), hoverConfig.closeDelay);
    } else {
      setIsOpen(false);
    }
    hoverConfig?.onCloseCallback?.();
  }, [type, hoverConfig]);

  const cancelTimers = useCallback(() => {
  if (openTimeout.current) window.clearTimeout(openTimeout.current);
  if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
  }, []);

  return { isOpen, open, close, cancelTimers };
}
