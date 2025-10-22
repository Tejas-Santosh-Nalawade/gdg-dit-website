/**
 * Official Google Developer Groups Color Palette
 * Use ONLY these colors across the entire website
 */

export const GOOGLE_COLORS = {
  // CORE COLORS
  BLUE_500: '#4285f4',
  GREEN_500: '#34a853',
  YELLOW_600: '#f9ab00',
  RED_500: '#ea4335',

  // HALFTONES
  HALFTONE_BLUE: '#57caff',
  HALFTONE_GREEN: '#5cdb6d',
  HALFTONE_YELLOW: '#ffd427',
  HALFTONE_RED: '#ff7daf',

  // PASTELS
  PASTEL_BLUE: '#c3ecf6',
  PASTEL_GREEN: '#ccf6c5',
  PASTEL_YELLOW: '#ffe7a5',
  PASTEL_RED: '#f8d8d8',

  // GRAYSCALE
  OFF_WHITE: '#f0f0f0',
  BLACK_02: '#1e1e1e',
};

// Semantic color names for easier use
export const COLORS = {
  // Primary brand colors
  primary: GOOGLE_COLORS.BLUE_500,
  success: GOOGLE_COLORS.GREEN_500,
  warning: GOOGLE_COLORS.YELLOW_600,
  danger: GOOGLE_COLORS.RED_500,

  // Light variants
  primaryLight: GOOGLE_COLORS.HALFTONE_BLUE,
  successLight: GOOGLE_COLORS.HALFTONE_GREEN,
  warningLight: GOOGLE_COLORS.HALFTONE_YELLOW,
  dangerLight: GOOGLE_COLORS.HALFTONE_RED,

  // Pastel variants
  primaryPastel: GOOGLE_COLORS.PASTEL_BLUE,
  successPastel: GOOGLE_COLORS.PASTEL_GREEN,
  warningPastel: GOOGLE_COLORS.PASTEL_YELLOW,
  dangerPastel: GOOGLE_COLORS.PASTEL_RED,

  // Text colors
  textPrimary: GOOGLE_COLORS.BLACK_02,
  textSecondary: '#5f6368',

  // Background colors
  bgLight: GOOGLE_COLORS.OFF_WHITE,
  bgWhite: '#ffffff',
};

// Pre-defined gradients using official colors only
export const GRADIENTS = {
  blueRed: `linear-gradient(to right, ${GOOGLE_COLORS.BLUE_500}, ${GOOGLE_COLORS.RED_500})`,
  greenBlue: `linear-gradient(to right, ${GOOGLE_COLORS.GREEN_500}, ${GOOGLE_COLORS.BLUE_500})`,
  yellowGreen: `linear-gradient(to right, ${GOOGLE_COLORS.YELLOW_600}, ${GOOGLE_COLORS.GREEN_500})`,
  yellowRed: `linear-gradient(to right, ${GOOGLE_COLORS.YELLOW_600}, ${GOOGLE_COLORS.RED_500})`,
  rainbow: `linear-gradient(to right, ${GOOGLE_COLORS.BLUE_500} 0%, ${GOOGLE_COLORS.RED_500} 33%, ${GOOGLE_COLORS.YELLOW_600} 66%, ${GOOGLE_COLORS.GREEN_500} 100%)`,
};

export default GOOGLE_COLORS;
