import { useWindowDimensions } from 'react-native';

export const RESPONSIVE_LAYOUT = {
  tabletMinWidth: 768,
  tabletMinHeight: 500,
  compactLandscapeMaxHeight: 500,
  columns: {
    phonePortrait: 3,
    phoneLandscape: 4,
    tabletPortrait: 4,
    tabletLandscape: 6,
  },
  gridGap: {
    phone: 8,
    tablet: 14,
  },
  screenPadding: {
    phone: 12,
    compactLandscape: 8,
    tablet: 24,
  },
  cardMaxWidth: {
    phone: 180,
    tablet: 200,
  },
} as const;

export type ResponsiveLayout = {
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
  isTablet: boolean;
  isCompactLandscape: boolean;
  numberOfColumns: number;
  gridGap: number;
  screenPadding: number;
  cardMaxWidth: number;
};

export function getResponsiveLayout(
  width: number,
  height: number,
): ResponsiveLayout {
  const isPortrait: boolean = height > width;
  const isLandscape: boolean = width > height;
  const isTablet: boolean =
    width >= RESPONSIVE_LAYOUT.tabletMinWidth &&
    height >= RESPONSIVE_LAYOUT.tabletMinHeight;
  const isCompactLandscape: boolean =
    isLandscape &&
    !isTablet &&
    height < RESPONSIVE_LAYOUT.compactLandscapeMaxHeight;

  let numberOfColumns: number = RESPONSIVE_LAYOUT.columns.phonePortrait;

  if (isTablet && isLandscape) {
    numberOfColumns = RESPONSIVE_LAYOUT.columns.tabletLandscape;
  } else if (isTablet) {
    numberOfColumns = RESPONSIVE_LAYOUT.columns.tabletPortrait;
  } else if (isLandscape) {
    numberOfColumns = RESPONSIVE_LAYOUT.columns.phoneLandscape;
  }

  return {
    width,
    height,
    isPortrait,
    isLandscape,
    isTablet,
    isCompactLandscape,
    numberOfColumns,
    gridGap: isTablet
      ? RESPONSIVE_LAYOUT.gridGap.tablet
      : RESPONSIVE_LAYOUT.gridGap.phone,
    screenPadding: isTablet
      ? RESPONSIVE_LAYOUT.screenPadding.tablet
      : isCompactLandscape
        ? RESPONSIVE_LAYOUT.screenPadding.compactLandscape
        : RESPONSIVE_LAYOUT.screenPadding.phone,
    cardMaxWidth: isTablet
      ? RESPONSIVE_LAYOUT.cardMaxWidth.tablet
      : RESPONSIVE_LAYOUT.cardMaxWidth.phone,
  };
}

export function useResponsiveLayout(): ResponsiveLayout {
  const { width, height } = useWindowDimensions();

  return getResponsiveLayout(width, height);
}
