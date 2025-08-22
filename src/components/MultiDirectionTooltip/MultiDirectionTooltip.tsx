import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTooltipInteraction } from './hooks/useTooltipInteraction';
import { useTooltipPosition } from './hooks/useTooltipPosition';
// import { MultiDirectionTooltipProps, PopupPlacement, PopupType } from './types';
import type { MultiDirectionTooltipProps, PopupPlacement, PopupType } from './types';

const defaultTooltipClass =
  'z-50 rounded bg-gray-900 text-white dark:bg-gray-800 dark:text-gray-100 shadow-lg px-3 py-2 text-sm transition-colors duration-200';

export const MultiDirectionTooltip: React.FC<MultiDirectionTooltipProps> = ({
  disableFlip = false,
  defaultOffset = 8,
  triggerClassName,
  config,
  trigger,
  triggerCallbacks,
  ...rest
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Determine active placement/type/config
  const placements = useMemo(() => Object.keys(config) as PopupPlacement[], [config]);
  const activePlacement = placements[0] || 'top';
  const activeConfig = config[activePlacement] || {};
  const hoverConfig = activeConfig['hover'];
  const clickConfig = activeConfig['click'];

  // Interaction hooks
  const hover = useTooltipInteraction({ type: 'hover', hoverConfig });
  const click = useTooltipInteraction({ type: 'click' });

  // Positioning
  const position = useTooltipPosition({
    triggerRef,
    tooltipRef,
    placement: activePlacement,
    offset: (hoverConfig?.offset ?? clickConfig?.offset ?? defaultOffset),
    disableFlip,
  });

  // ARIA id for accessibility
  const tooltipId = useMemo(() => `tooltip-${Math.random().toString(36).slice(2, 10)}`, []);

  // Keyboard handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      hover.close();
      click.close();
    }
  }, [hover, click]);

  // Enterable hover logic
  const isEnterable = hoverConfig?.enterable;
  const handleTooltipMouseEnter = useCallback(() => {
    if (isEnterable) hover.cancelTimers();
  }, [isEnterable, hover]);
  const handleTooltipMouseLeave = useCallback(() => {
    if (isEnterable) hover.close();
  }, [isEnterable, hover]);

  // Render tooltip content
  const renderTooltip = useCallback((type: PopupType) => {
    const cfg = type === 'hover' ? hoverConfig : clickConfig;
    if (!cfg) return null;
    const content = typeof cfg.element === 'function' ? cfg.element({ closePopup: type === 'hover' ? hover.close : click.close }) : cfg.element;
    const className = [
      cfg.applyDefaultClassNames !== false ? defaultTooltipClass : '',
      cfg.className || ''
    ].join(' ');
    return (
      <motion.div
        ref={tooltipRef}
        id={tooltipId}
        role="tooltip"
        tabIndex={-1}
        className={className}
        style={{ position: 'absolute', top: position.top, left: position.left }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        aria-live="polite"
        onKeyDown={handleKeyDown}
        onMouseEnter={isEnterable ? handleTooltipMouseEnter : undefined}
        onMouseLeave={isEnterable ? handleTooltipMouseLeave : undefined}
      >
        {content}
      </motion.div>
    );
  }, [hoverConfig, clickConfig, position, tooltipId, handleKeyDown, isEnterable, handleTooltipMouseEnter, handleTooltipMouseLeave]);

  // Trigger event handlers
  const handleMouseEnter = useCallback(() => {
    hover.open();
    triggerCallbacks?.onMouseEnter?.();
  }, [hover, triggerCallbacks]);
  const handleMouseLeave = useCallback(() => {
    if (!isEnterable) hover.close();
    triggerCallbacks?.onMouseLeave?.();
  }, [hover, triggerCallbacks, isEnterable]);
  const handleClick = useCallback(() => {
    click.isOpen ? click.close() : click.open();
    triggerCallbacks?.onClick?.();
  }, [click, triggerCallbacks]);

  // Render trigger
  const triggerNode = typeof trigger === 'function' ? trigger({ isOpen: hover.isOpen || click.isOpen }) : trigger;

  // Accessibility props
  const isClick = !!clickConfig;
  const isHover = !!hoverConfig;
  const isOpen = hover.isOpen || click.isOpen;

  // Click outside/Esc logic for click tooltips
  useEffect(() => {
    if (!isClick || !click.isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node)
      ) {
        click.close();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') click.close();
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isClick, click.isOpen, click]);

  // Keyboard open for click
  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      click.open();
    }
    handleKeyDown(e);
  }, [isClick, click, handleKeyDown]);

  return (
    <div
      ref={triggerRef}
      className={triggerClassName}
      {...rest}
      aria-describedby={isHover && isOpen ? tooltipId : undefined}
      aria-haspopup={isClick ? 'true' : undefined}
      aria-expanded={isClick ? isOpen : undefined}
      tabIndex={0}
      onMouseEnter={hoverConfig ? handleMouseEnter : undefined}
      onMouseLeave={hoverConfig ? handleMouseLeave : undefined}
      onClick={clickConfig ? handleClick : undefined}
      onKeyDown={handleTriggerKeyDown}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {triggerNode}
      <AnimatePresence>
        {hoverConfig && hover.isOpen && renderTooltip('hover')}
        {clickConfig && click.isOpen && renderTooltip('click')}
      </AnimatePresence>
    </div>
  );
};
