// Responsive utility functions
export const getResponsiveClasses = {
  // Container classes for different screen sizes
  container: "w-full max-w-mobile mx-auto px-4 sm:max-w-tablet sm:px-6 lg:max-w-desktop lg:px-8",
  
  // Button classes optimized for touch
  button: "btn-touch min-h-[44px] min-w-[44px] touch-manipulation transition-all duration-200 active:scale-95",
  
  // Input classes for forms
  input: "btn-touch w-full py-3 sm:py-4 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-responsive-base",
  
  // Panel classes for modals/popups
  panel: "fixed w-full z-20 bottom-0 bg-white spacing-responsive pb-safe rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto",
  
  // Card classes for content blocks
  card: "bg-white rounded-xl shadow-lg spacing-responsive",
  
  // Text classes for different hierarchies
  heading: "text-responsive-2xl font-bold",
  subheading: "text-responsive-lg font-semibold",
  body: "text-responsive-base",
  caption: "text-responsive-sm text-gray-600"
};

// Breakpoint detection
export const useBreakpoint = () => {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  if (width < 475) return 'xs';
  if (width < 640) return 'sm';
  if (width < 768) return 'md';
  if (width < 1024) return 'lg';
  if (width < 1280) return 'xl';
  return '2xl';
};

// Touch device detection
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Safe area utilities
export const getSafeAreaClasses = () => {
  return {
    top: 'pt-safe',
    bottom: 'pb-safe',
    left: 'pl-safe',
    right: 'pr-safe',
    all: 'pt-safe pb-safe pl-safe pr-safe'
  };
};