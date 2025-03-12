
const BASE_COLORS = [
  '#1e40af', // Blue
  '#b45309', // Amber
  '#047857', // Emerald
  '#6d28d9', // Violet
  '#be185d', // Pink
  '#0e7490', // Cyan
  '#7f1d1d', // Red
];

// Map to store property name to color mappings
const propertyColorMap = new Map<string, string>();
let colorIndex = 0;

/**
 * Gets a consistent color for a property name
 */
export const getPropertyColor = (propertyName: string): string => {
  if (!propertyColorMap.has(propertyName)) {
    // Assign next color in rotation
    propertyColorMap.set(propertyName, BASE_COLORS[colorIndex % BASE_COLORS.length]);
    colorIndex++;
  }
  return propertyColorMap.get(propertyName) || BASE_COLORS[0];
};

/**
 * Gets a lighter version of a color for broker events
 */
export const getLighterColor = (color: string): string => {
  // For known colors, return pre-defined lighter shades
  const lighterShades: Record<string, string> = {
    '#1e40af': '#93c5fd', // Blue -> Light blue
    '#b45309': '#fbbf24', // Amber -> Light amber
    '#047857': '#6ee7b7', // Emerald -> Light emerald
    '#6d28d9': '#ddd6fe', // Violet -> Light violet
    '#be185d': '#fbcfe8', // Pink -> Light pink
    '#0e7490': '#a5f3fc', // Cyan -> Light cyan
    '#7f1d1d': '#fecaca', // Red -> Light red
  };
  
  return lighterShades[color] || '#f3e8ff'; // Default light purple if color not found
};

/**
 * Gets a darker version of a color for hover states
 */
export const getDarkerColor = (color: string): string => {
  // For known colors, return pre-defined darker shades
  const darkerShades: Record<string, string> = {
    '#1e40af': '#1e3a8a', // Blue -> Darker blue
    '#b45309': '#92400e', // Amber -> Darker amber
    '#047857': '#065f46', // Emerald -> Darker emerald
    '#6d28d9': '#5b21b6', // Violet -> Darker violet
    '#be185d': '#9d174d', // Pink -> Darker pink
    '#0e7490': '#155e75', // Cyan -> Darker cyan
    '#7f1d1d': '#7f1d1d', // Red -> Darker red
    // Also add lighter shades entries for broker events hover
    '#93c5fd': '#60a5fa', // Light blue -> Slightly darker light blue
    '#fbbf24': '#f59e0b', // Light amber -> Slightly darker light amber
    '#6ee7b7': '#34d399', // Light emerald -> Slightly darker light emerald
    '#ddd6fe': '#c4b5fd', // Light violet -> Slightly darker light violet
    '#fbcfe8': '#f9a8d4', // Light pink -> Slightly darker light pink
    '#a5f3fc': '#67e8f9', // Light cyan -> Slightly darker light cyan
    '#fecaca': '#fca5a5', // Light red -> Slightly darker light red
  };
  
  return darkerShades[color] || '#ede9fe'; // Default for hover if not found
};
