# MultiDirectionTooltip

A production-ready, highly customizable React tooltip component supporting multiple directions, hover/click interactions, auto-flip, accessibility, and rich content. Built with TypeScript, Bun, Tailwind CSS, shadcn/ui, and framer-motion.

---

## Quick Start

### Installation

```
bun add framer-motion tailwindcss shadcn-ui
```

### Import and Usage

```tsx
import { MultiDirectionTooltip } from "./src/components/MultiDirectionTooltip/MultiDirectionTooltip";
import {
  PopupPlacement,
  PopupType,
} from "./src/components/MultiDirectionTooltip/types";
```

---

## API Reference

### `<MultiDirectionTooltip />` Props

| Prop               | Type                                                                 | Description                                                            |
| ------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `disableFlip`      | `boolean`                                                            | Disable auto-flip if tooltip would overflow viewport. Default: `false` |
| `defaultOffset`    | `number`                                                             | Default offset in pixels. Default: `8`                                 |
| `triggerClassName` | `string`                                                             | Custom class for trigger element.                                      |
| `config`           | `MultiDirectionPopupConfig`                                          | Tooltip configuration for each direction/type.                         |
| `trigger`          | `React.ReactNode \| (props: { isOpen: boolean }) => React.ReactNode` | Trigger element or render function.                                    |
| `triggerCallbacks` | `{ onClick?, onMouseEnter?, onMouseLeave? }`                         | Optional callbacks for trigger events.                                 |
| ...rest            | `HTMLAttributes<HTMLDivElement>`                                     | Other div props.                                                       |

### `MultiDirectionPopupConfig`

```ts
export type MultiDirectionPopupConfig = Partial<
  Record<
    PopupPlacement,
    {
      [PopupType.CLICK]?: BasePopupMetadata;
      [PopupType.HOVER]?: HoverPopupMetadata;
    }
  >
>;
```

#### `BasePopupMetadata`

- `offset?`: number
- `onMouseEnter?`, `onMouseLeave?`, `onOpenCallback?`, `onCloseCallback?`: () => void
- `applyDefaultClassNames?`: boolean
- `element`: React.ReactNode | (({ closePopup }) => React.ReactNode)

#### `HoverPopupMetadata` (extends BasePopupMetadata)

- `openDelay?`: number
- `closeDelay?`: number
- `enterable?`: boolean

#### `PopupPlacement`

- `TOP`, `BOTTOM`, `LEFT`, `RIGHT`

#### `PopupType`

- `HOVER`, `CLICK`

---

## Usage Examples

### Basic Hover Tooltip

```tsx
const basicHoverConfig = {
  [PopupPlacement.TOP]: {
    [PopupType.HOVER]: {
      element: "This is a simple hover tooltip",
      offset: 8,
      openDelay: 200,
      closeDelay: 100,
    },
  },
};
<MultiDirectionTooltip
  config={basicHoverConfig}
  trigger={<button>Hover Me (Top)</button>}
/>;
```

### Click Tooltip with Rich Content

```tsx
const richClickConfig = {
  [PopupPlacement.BOTTOM]: {
    [PopupType.CLICK]: {
      element: ({ closePopup }) => (
        <div>
          <h3>Rich Content</h3>
          <p>This tooltip contains rich content with multiple elements.</p>
          <button onClick={closePopup}>Close</button>
        </div>
      ),
      offset: 12,
      applyDefaultClassNames: false,
    },
  },
};
<MultiDirectionTooltip
  config={richClickConfig}
  trigger={<button>Click Me (Bottom)</button>}
/>;
```

### All Placements, Hover vs Click, Custom Offsets

```tsx
const allPlacementsConfig = {
  [PopupPlacement.TOP]: {
    [PopupType.HOVER]: { element: "Top Hover", offset: 8 },
    [PopupType.CLICK]: { element: "Top Click", offset: 8 },
  },
  [PopupPlacement.BOTTOM]: {
    [PopupType.HOVER]: { element: "Bottom Hover", offset: 12 },
    [PopupType.CLICK]: { element: "Bottom Click", offset: 12 },
  },
  [PopupPlacement.LEFT]: {
    [PopupType.HOVER]: { element: "Left Hover", offset: 10 },
  },
  [PopupPlacement.RIGHT]: {
    [PopupType.CLICK]: { element: "Right Click", offset: 10 },
  },
};
```

---

## Configuration Options

- **Placement**: Choose direction (`TOP`, `BOTTOM`, `LEFT`, `RIGHT`).
- **Type**: Hover or Click.
- **Delays**: `openDelay`, `closeDelay` for hover tooltips.
- **Offset**: Space between trigger and tooltip.
- **Custom Content**: Pass React nodes or render functions.
- **Class Names**: Use `applyDefaultClassNames` to enable/disable default styling.

---

## Accessibility Features

- ARIA attributes (`aria-describedby`, `role="tooltip"`).
- Keyboard navigation: ESC to close, tabIndex for focus.
- Screen reader friendly.
- Focus management for interactive content.

---

## Performance Considerations

- Uses `useMemo` and `useCallback` for optimal rendering.
- Only renders tooltip when open (via `AnimatePresence`).
- Minimal DOM updates and event listeners.
- Strict TypeScript and Biome linting for code quality.

---