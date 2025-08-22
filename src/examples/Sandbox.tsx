import { motion } from 'framer-motion';
import React from 'react';
import { Tooltip } from 'react-tooltip';

// Utility function to log interactions
const logInteraction = (action: string, tooltipId: string) => {
  console.log(`Tooltip ${tooltipId}: ${action}`);
};

// Card component for consistent styling
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 ${className}`}
  >
    {children}
  </motion.div>
);

// Section component for organized layout
const Section = ({ title, description, children }: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
}) => (
  <Card>
    <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 text-center">{title}</h2>
    <p className="text-gray-600 dark:text-gray-400 text-base mb-6 text-center">{description}</p>
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {children}
    </div>
  </Card>
);

// Demo button component
const DemoButton = ({ 
  children, 
  tooltipId, 
  tooltipContent, 
  placement = "top",
  delayShow = 0,
  delayHide = 0,
  className = ""
}: {
  children: React.ReactNode;
  tooltipId: string;
  tooltipContent: string;
  placement?: "top" | "right" | "bottom" | "left";
  delayShow?: number;
  delayHide?: number;
  className?: string;
}) => (
  <div className="inline-block">
    <button
      data-tooltip-id={tooltipId}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      onMouseEnter={() => logInteraction('hovered', tooltipId)}
      onClick={() => logInteraction('clicked', tooltipId)}
    >
      {children}
    </button>
    <Tooltip
      id={tooltipId}
      place={placement}
      delayShow={delayShow}
      delayHide={delayHide}
      className="max-w-xs z-50"
      style={{
        backgroundColor: '#1f2937',
        color: 'white',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        lineHeight: '1.5',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        maxWidth: '300px',
        textAlign: 'left'
      }}
      positionStrategy="fixed"
      float={true}
    >
      {tooltipContent}
    </Tooltip>
  </div>
);

export const Sandbox = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-6xl mx-auto p-8 text-center">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
            React Tooltip Sandbox
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg text-center max-w-2xl mx-auto">
            Explore interactive tooltips with dynamic positioning, hover and click interactions, and automatic boundary handling.
          </p>
        </div>
      </motion.div>

      {/* Instructions */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="mx-auto my-1">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                How to Use
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-blue-800 dark:text-blue-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span><strong>Hover</strong> over buttons to see tooltips</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span><strong>Click</strong> buttons to trigger click events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span><strong>Resize</strong> browser window to see positioning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span><strong>Check console</strong> for interaction logs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        
        {/* Section 1: Basic Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Section
            title="Basic Positioning"
            description="Simple tooltips in all four directions. Hover over buttons to see tooltips appear in their specified positions."
          >
          <DemoButton
            tooltipId="top-tooltip"
            tooltipContent="This tooltip appears on top of the button. It will automatically flip to bottom if there's not enough space above."
            placement="top"
            className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
          >
            Top Tooltip
          </DemoButton>
          
          <DemoButton
            tooltipId="right-tooltip"
            tooltipContent="This tooltip appears to the right of the button. It will automatically flip to left if there's not enough space on the right side."
            placement="right"
            className="bg-green-500 text-white hover:bg-green-600 focus:ring-green-500"
          >
            Right Tooltip
          </DemoButton>
          
          <DemoButton
            tooltipId="bottom-tooltip"
            tooltipContent="This tooltip appears below the button. It will automatically flip to top if there's not enough space below."
            placement="bottom"
            className="bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500"
          >
            Bottom Tooltip
          </DemoButton>
          
          <DemoButton
            tooltipId="left-tooltip"
            tooltipContent="This tooltip appears to the left of the button. It will automatically flip to right if there's not enough space on the left side."
            placement="left"
            className="bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500"
          >
            Left Tooltip
          </DemoButton>
          </Section>
        </motion.div>

        {/* Section 2: Dynamic Positioning & Auto-Flipping */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Section
            title="Dynamic Positioning & Auto-Flipping"
            description="Tooltips automatically flip when near screen boundaries. Try resizing your browser window to see this in action."
          >
          <div className="w-full flex justify-between max-w-4xl mx-auto">
            <DemoButton
              tooltipId="edge-left"
              tooltipContent="This tooltip is positioned to the left but will automatically flip to the right when near the left edge of the viewport. This ensures the tooltip content remains fully visible and accessible to users."
              placement="left"
              className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
            >
              Near Left Edge
            </DemoButton>
            
            <DemoButton
              tooltipId="edge-right"
              tooltipContent="This tooltip is positioned to the right but will automatically flip to the left when near the right edge of the viewport. This prevents the tooltip from being cut off or going outside the visible area."
              placement="right"
              className="bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500"
            >
              Near Right Edge
            </DemoButton>
          </div>
          </Section>
        </motion.div>

        {/* Section 3: Hover Interactions with Delays */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Section
            title="Hover Interactions with Delays"
            description="Tooltips with custom show and hide delays for better user experience."
          >
          <DemoButton
            tooltipId="fast-tooltip"
            tooltipContent="This tooltip appears quickly with a 100ms delay. Fast tooltips are useful for immediate feedback when users hover over interactive elements."
            placement="top"
            delayShow={100}
            delayHide={50}
            className="bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500"
          >
            Fast Tooltip
          </DemoButton>
          
          <DemoButton
            tooltipId="slow-tooltip"
            tooltipContent="This tooltip has a longer delay of 500ms to prevent accidental triggers. Slow tooltips are useful when you want to avoid showing tooltips for brief mouse movements."
            placement="top"
            delayShow={500}
            delayHide={200}
            className="bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-500"
          >
            Slow Tooltip
          </DemoButton>
          
          <DemoButton
            tooltipId="instant-tooltip"
            tooltipContent="This tooltip appears instantly with no delay. Instant tooltips provide immediate feedback but can be triggered by accidental mouse movements."
            placement="top"
            delayShow={0}
            delayHide={0}
            className="bg-yellow-500 text-black hover:bg-yellow-600 focus:ring-yellow-500"
          >
            Instant Tooltip
          </DemoButton>
          </Section>
        </motion.div>

        {/* Section 4: Rich Content Tooltips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Section
            title="Rich Content Tooltips"
            description="Tooltips can contain rich content including multiple lines, formatting, and interactive elements. Long text automatically wraps to new lines."
          >
          <DemoButton
            tooltipId="rich-tooltip"
            tooltipContent="This is a multi-line tooltip with rich content. It can contain multiple sentences and provide detailed information to users. The text automatically wraps to new lines to prevent overflow and ensure readability."
            placement="top"
            className="bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500"
          >
            Rich Content
          </DemoButton>
          
          <DemoButton
            tooltipId="info-tooltip"
            tooltipContent="ℹ️ Information tooltip with emoji and special characters. This demonstrates how tooltips can handle various content types including symbols, emojis, and formatted text while maintaining proper text wrapping and positioning."
            placement="right"
            className="bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500"
          >
            Info with Emoji
          </DemoButton>
          
          <DemoButton
            tooltipId="warning-tooltip"
            tooltipContent="⚠️ Warning: This is an important message that requires user attention. Tooltips are perfect for displaying contextual warnings and important information. The text wraps properly to ensure all content is visible."
            placement="bottom"
            className="bg-amber-500 text-black hover:bg-amber-600 focus:ring-amber-500"
          >
            Warning Message
          </DemoButton>
          </Section>
        </motion.div>

        {/* Section 5: Edge Cases & Long Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Section
            title="Edge Cases & Long Content"
            description="Testing tooltips with very long content and edge case scenarios. Text automatically wraps to prevent overflow."
          >
          <DemoButton
            tooltipId="long-tooltip"
            tooltipContent="This is an extremely long tooltip that contains a lot of text to demonstrate how the tooltip handles overflow and positioning when the content is much longer than typical tooltip content. It should automatically adjust its position and size to accommodate the content while remaining readable and accessible to users. The text will wrap to new lines as needed to prevent any overflow issues."
            placement="top"
            className="bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500"
          >
            Very Long Tooltip
          </DemoButton>
          
          <DemoButton
            tooltipId="short-tooltip"
            tooltipContent="Short"
            placement="bottom"
            className="bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-500"
          >
            Very Short Tooltip
          </DemoButton>
          </Section>
        </motion.div>

        {/* Section 6: Interactive Testing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Section
            title="Interactive Testing"
            description="Test different interaction patterns and see console logs for debugging."
          >
          <DemoButton
            tooltipId="test-tooltip"
            tooltipContent="Click this button and check the console to see interaction logs. This helps with debugging and understanding user behavior. The tooltip positioning and text wrapping features are fully functional and ready for testing."
            placement="top"
            className="bg-violet-500 text-white hover:bg-violet-600 focus:ring-violet-500"
          >
            Test Interactions
          </DemoButton>
          
          <DemoButton
            tooltipId="debug-tooltip"
            tooltipContent="Hover and click events are logged to the console. Open developer tools to see the logs. This tooltip demonstrates proper text wrapping and positioning while maintaining all interactive functionality."
            placement="right"
            className="bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500"
          >
            Debug Mode
          </DemoButton>
          </Section>
        </motion.div>

      
      </div>
    </div>
  );
};
