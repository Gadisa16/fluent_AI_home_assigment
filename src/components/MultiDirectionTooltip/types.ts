export interface BasePopupMetadata {
  offset?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onOpenCallback?: () => void;
  onCloseCallback?: () => void;
  applyDefaultClassNames?: boolean;
  className?: string;
  element: React.ReactNode | ((props: { closePopup: () => void }) => React.ReactNode);
}

export interface HoverPopupMetadata extends BasePopupMetadata {
  openDelay?: number;
  closeDelay?: number;
  enterable?: boolean;
}

export const POPUP_PLACEMENTS = ['top', 'left', 'right', 'bottom'] as const;
export type PopupPlacement = typeof POPUP_PLACEMENTS[number];

export type PopupType = 'hover' | 'click';

export type MultiDirectionPopupConfig = Partial<
  Record<
    PopupPlacement,
    {
      click?: BasePopupMetadata;
      hover?: HoverPopupMetadata;
    }
  >
>;

export interface MultiDirectionTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  disableFlip?: boolean;
  defaultOffset?: number;
  triggerClassName?: string;
  config: MultiDirectionPopupConfig;
  trigger: React.ReactNode | ((props: { isOpen: boolean }) => React.ReactNode);
  triggerCallbacks?: {
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  };
}
