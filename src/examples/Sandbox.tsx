import { MultiDirectionTooltip } from '../components/MultiDirectionTooltip/MultiDirectionTooltip';
import type { MultiDirectionPopupConfig } from '../components/MultiDirectionTooltip/types';

const basicHoverConfig: MultiDirectionPopupConfig = {
  top: {
    hover: {
      element: "This is a simple hover tooltip",
      offset: 8,
      openDelay: 200,
      closeDelay: 100,
    },
  },
};

const richClickConfig: MultiDirectionPopupConfig = {
  bottom: {
    click: {
      element: ({ closePopup }) => (
        <div className="p-4 max-w-sm">
          <h3 className="font-semibold mb-2">Rich Content</h3>
          <p className="text-sm text-gray-600 mb-3">This tooltip contains rich content with multiple elements.</p>
          <button onClick={closePopup} className="text-blue-600">Close</button>
        </div>
      ),
      offset: 12,
      applyDefaultClassNames: false,
    },
  },
};

export const Sandbox = () => (
  <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <h2 className="text-2xl font-bold mb-4">MultiDirectionTooltip Demo</h2>
    <div>
      <MultiDirectionTooltip
        config={basicHoverConfig}
        trigger={<button className="px-4 py-2 bg-blue-600 text-white rounded">Hover Me (Top)</button>}
      />
    </div>
    <div>
      <MultiDirectionTooltip
        config={richClickConfig}
        trigger={<button className="px-4 py-2 bg-green-600 text-white rounded">Click Me (Bottom)</button>}
      />
    </div>
    {/* Add more examples for all placements, hover vs click, custom offsets, accessibility, edge cases */}
  </div>
);
