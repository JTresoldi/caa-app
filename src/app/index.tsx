import * as Speech from 'expo-speech';
import { Fragment, useRef, useState } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PictogramButton } from '@/components/PictogramButton';
import { SentenceBar } from '@/components/SentenceBar';
import {
  PICTOGRAM_SECTIONS,
  PICTOGRAMS,
  Pictogram,
  PictogramSection,
  PictogramSectionId,
} from '@/data/pictograms';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';

type SectionItemLayout = {
  x: number;
  width: number;
};

const SECTION_SCROLL_EDGE_PADDING = 8;
const MORE_SECTIONS_INDICATOR_WIDTH = 30;

export default function HomeScreen(): React.JSX.Element {
  const [sentence, setSentence] = useState<Pictogram[]>([]);
  const [activeSection, setActiveSection] =
    useState<PictogramSectionId>('favorites');
  const [sectionViewportWidth, setSectionViewportWidth] = useState<number>(0);
  const [sectionContentWidth, setSectionContentWidth] = useState<number>(0);
  const [sectionScrollX, setSectionScrollX] = useState<number>(0);
  const sectionScrollRef = useRef<ScrollView | null>(null);
  const sectionItemLayouts = useRef<
    Partial<Record<PictogramSectionId, SectionItemLayout>>
  >({});
  const layout = useResponsiveLayout();
  const filteredPictograms: Pictogram[] = PICTOGRAMS
    .filter(
      (pictogram: Pictogram): boolean =>
        activeSection === 'favorites'
          ? pictogram.isFavorite
          : pictogram.category === activeSection,
    )
    .sort(
      (first: Pictogram, second: Pictogram): number =>
        first.order - second.order,
    );
  const hasSectionOverflow: boolean =
    sectionContentWidth > sectionViewportWidth + 1;
  const hasMoreSectionsToRight: boolean =
    hasSectionOverflow &&
    sectionScrollX + sectionViewportWidth < sectionContentWidth - 8;

  const handleSectionLayout = (event: LayoutChangeEvent): void => {
    setSectionViewportWidth(event.nativeEvent.layout.width);
  };

  const handleSectionScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ): void => {
    setSectionScrollX(event.nativeEvent.contentOffset.x);
  };

  const selectSection = (sectionId: PictogramSectionId): void => {
    setActiveSection(sectionId);

    if (!hasSectionOverflow) {
      return;
    }

    const itemLayout: SectionItemLayout | undefined =
      sectionItemLayouts.current[sectionId];

    if (!itemLayout) {
      return;
    }

    const visibleLeft: number = sectionScrollX + SECTION_SCROLL_EDGE_PADDING;
    const visibleRight: number =
      sectionScrollX +
      sectionViewportWidth -
      MORE_SECTIONS_INDICATOR_WIDTH -
      SECTION_SCROLL_EDGE_PADDING;
    let targetX: number = sectionScrollX;

    if (itemLayout.x < visibleLeft) {
      targetX = itemLayout.x - SECTION_SCROLL_EDGE_PADDING;
    } else if (itemLayout.x + itemLayout.width > visibleRight) {
      targetX =
        itemLayout.x +
        itemLayout.width -
        sectionViewportWidth +
        MORE_SECTIONS_INDICATOR_WIDTH +
        SECTION_SCROLL_EDGE_PADDING;
    }

    const maximumScrollX: number = Math.max(
      0,
      sectionContentWidth - sectionViewportWidth,
    );
    const clampedTargetX: number = Math.min(
      Math.max(0, targetX),
      maximumScrollX,
    );

    if (Math.abs(clampedTargetX - sectionScrollX) > 1) {
      sectionScrollRef.current?.scrollTo({
        x: clampedTargetX,
        animated: true,
      });
    }
  };

  const speakText = (text: string, onDispatched?: () => void): void => {
    void Speech.stop().then((): void => {
      Speech.speak(text, {
        language: 'pt-BR',
        rate: 0.85,
      });
      onDispatched?.();
    });
  };

  const selectPictogram = (pictogram: Pictogram): void => {
    if (pictogram.behavior === 'immediate') {
      speakText(pictogram.spokenText);
      return;
    }

    setSentence((currentSentence: Pictogram[]) => [
      ...currentSentence,
      pictogram,
    ]);
  };

  const removeLastPictogram = (): void => {
    setSentence((currentSentence: Pictogram[]) => currentSentence.slice(0, -1));
  };

  const clearSentence = (): void => {
    void Speech.stop();
    setSentence([]);
  };

  const speakSentence = (): void => {
    const textToSpeak: string = sentence
      .filter(
        (pictogram: Pictogram): boolean =>
          pictogram.behavior === 'sentence',
      )
      .map((pictogram: Pictogram) => pictogram.spokenText)
      .join(' ');

    if (textToSpeak.length === 0) {
      return;
    }

    speakText(textToSpeak, (): void => setSentence([]));
  };

  const renderPictogram: ListRenderItem<Pictogram> = ({ item }): React.JSX.Element => (
    <View
      style={[
        styles.gridItem,
        {
          maxWidth: layout.cardMaxWidth,
          marginBottom: layout.gridGap,
        },
      ]}
    >
      <PictogramButton
        pictogram={item}
        onPress={selectPictogram}
        isLargeScreen={layout.isTablet}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'bottom', 'left']}>
      <View
        style={[
          styles.container,
          layout.isCompactLandscape && styles.compactContainer,
          { paddingHorizontal: layout.screenPadding },
        ]}
      >
        <Text
          accessibilityRole="header"
          style={[
            styles.title,
            layout.isTablet && styles.largeTitle,
            layout.isCompactLandscape && styles.compactTitle,
          ]}
        >
          Minha comunicação
        </Text>

        <SentenceBar
          sentence={sentence}
          onSpeak={speakSentence}
          onRemoveLast={removeLastPictogram}
          onClear={clearSentence}
        />

        <Text
          accessibilityRole="header"
          style={[
            styles.sectionTitle,
            layout.isTablet && styles.largeSectionTitle,
            layout.isCompactLandscape && styles.compactSectionTitle,
          ]}
        >
          Escolha um pictograma
        </Text>

        <View
          style={[
            styles.sectionBar,
            layout.isCompactLandscape && styles.compactSectionBar,
          ]}
          onLayout={handleSectionLayout}
        >
          <ScrollView
            ref={sectionScrollRef}
            horizontal
            scrollEnabled={hasSectionOverflow}
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={[
              styles.categories,
              layout.isTablet && styles.largeCategories,
              layout.isCompactLandscape && styles.compactCategories,
            ]}
            onContentSizeChange={(width: number): void =>
              setSectionContentWidth(width)
            }
            onScroll={handleSectionScroll}
            scrollEventThrottle={16}
          >
            {PICTOGRAM_SECTIONS.map((section: PictogramSection) => {
              const isActive: boolean = section.id === activeSection;

              return (
                <Fragment key={section.id}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Seção ${section.label}`}
                    accessibilityState={{ selected: isActive }}
                    onLayout={(event: LayoutChangeEvent): void => {
                      sectionItemLayouts.current[section.id] = {
                        x: event.nativeEvent.layout.x,
                        width: event.nativeEvent.layout.width,
                      };
                    }}
                    onPress={(): void => selectSection(section.id)}
                    style={({ pressed }) => [
                      styles.categoryButton,
                      layout.isTablet && styles.largeCategoryButton,
                      layout.isCompactLandscape && styles.compactCategoryButton,
                      isActive && styles.activeCategoryButton,
                      pressed && styles.pressedCategoryButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryLabel,
                        layout.isTablet && styles.largeCategoryLabel,
                        layout.isCompactLandscape && styles.compactCategoryLabel,
                        isActive && styles.activeCategoryLabel,
                      ]}
                    >
                      {section.icon} {section.label}
                    </Text>
                  </Pressable>

                  {section.id === 'quick-messages' && (
                    <View accessibilityElementsHidden style={styles.sectionDivider} />
                  )}
                </Fragment>
              );
            })}
          </ScrollView>

          {hasMoreSectionsToRight && (
            <View
              accessible={false}
              importantForAccessibility="no-hide-descendants"
              pointerEvents="none"
              style={[
                styles.moreSectionsIndicator,
                layout.isTablet && styles.largeMoreSectionsIndicator,
                layout.isCompactLandscape && styles.compactMoreSectionsIndicator,
              ]}
            >
              <Text style={styles.moreSectionsArrow}>›</Text>
            </View>
          )}
        </View>

        <FlatList<Pictogram>
          key={layout.numberOfColumns}
          data={filteredPictograms}
          renderItem={renderPictogram}
          keyExtractor={(item: Pictogram): string => item.id}
          numColumns={layout.numberOfColumns}
          contentContainerStyle={[
            styles.grid,
            layout.isTablet && styles.largeGrid,
          ]}
          columnWrapperStyle={[
            styles.gridRow,
            { gap: layout.gridGap },
          ]}
          style={styles.gridList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  container: {
    flex: 1,
    minHeight: 0,
    paddingTop: 8,
  },
  compactContainer: {
    paddingTop: 4,
  },
  title: {
    color: '#172033',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 12,
  },
  largeTitle: {
    fontSize: 29,
    marginBottom: 16,
  },
  compactTitle: {
    display: 'none',
  },
  sectionTitle: {
    color: '#172033',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 18,
  },
  largeSectionTitle: {
    fontSize: 22,
    marginTop: 20,
  },
  compactSectionTitle: {
    display: 'none',
  },
  sectionBar: {
    flexGrow: 0,
    flexShrink: 0,
    position: 'relative',
  },
  compactSectionBar: {
    marginTop: 6,
    maxHeight: 50,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categories: {
    alignItems: 'center',
    gap: 10,
    paddingBottom: 14,
    paddingRight: 16,
  },
  largeCategories: {
    gap: 12,
    paddingBottom: 18,
  },
  compactCategories: {
    gap: 8,
    paddingBottom: 6,
    paddingRight: 8,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#B9C4D2',
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  largeCategoryButton: {
    minHeight: 58,
    paddingHorizontal: 22,
  },
  compactCategoryButton: {
    borderRadius: 12,
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  activeCategoryButton: {
    backgroundColor: '#1565C0',
    borderColor: '#1565C0',
  },
  pressedCategoryButton: {
    opacity: 0.72,
  },
  categoryLabel: {
    color: '#24324A',
    fontSize: 16,
    fontWeight: '800',
  },
  largeCategoryLabel: {
    fontSize: 18,
  },
  compactCategoryLabel: {
    fontSize: 14,
  },
  activeCategoryLabel: {
    color: '#FFFFFF',
  },
  sectionDivider: {
    alignSelf: 'center',
    backgroundColor: '#AAB8CA',
    height: 30,
    width: 1,
  },
  moreSectionsIndicator: {
    alignItems: 'center',
    backgroundColor: 'rgba(244, 247, 251, 0.94)',
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    height: 52,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: MORE_SECTIONS_INDICATOR_WIDTH,
  },
  compactMoreSectionsIndicator: {
    height: 44,
  },
  largeMoreSectionsIndicator: {
    height: 58,
  },
  moreSectionsArrow: {
    color: '#5B6575',
    fontSize: 28,
    fontWeight: '600',
  },
  grid: {
    paddingBottom: 24,
  },
  gridList: {
    flex: 1,
    minHeight: 0,
  },
  largeGrid: {
    paddingBottom: 32,
  },
  gridRow: {
    justifyContent: 'center',
  },
  gridItem: {
    flex: 1,
  },
});
