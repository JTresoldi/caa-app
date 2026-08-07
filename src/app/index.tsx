import * as Speech from 'expo-speech';
import { useState } from 'react';
import {
  FlatList,
  ListRenderItem,
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
  PICTOGRAM_CATEGORIES,
  PICTOGRAMS,
  Pictogram,
  PictogramCategory,
} from '@/data/pictograms';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';

export default function HomeScreen(): React.JSX.Element {
  const [sentence, setSentence] = useState<Pictogram[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<PictogramCategory>('Essenciais');
  const layout = useResponsiveLayout();
  const filteredPictograms: Pictogram[] = PICTOGRAMS
    .filter(
      (pictogram: Pictogram): boolean => pictogram.category === activeCategory,
    )
    .sort(
      (first: Pictogram, second: Pictogram): number =>
        first.order - second.order,
    );

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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[
            styles.categoryScroll,
            layout.isCompactLandscape && styles.compactCategoryScroll,
          ]}
          contentContainerStyle={[
            styles.categories,
            layout.isTablet && styles.largeCategories,
            layout.isCompactLandscape && styles.compactCategories,
          ]}
        >
          {PICTOGRAM_CATEGORIES.map((category: PictogramCategory) => {
            const isActive: boolean = category === activeCategory;

            return (
              <Pressable
                key={category}
                accessibilityRole="button"
                accessibilityLabel={`Categoria ${category}`}
                accessibilityState={{ selected: isActive }}
                onPress={(): void => setActiveCategory(category)}
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
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

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
  categoryScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  compactCategoryScroll: {
    marginTop: 6,
    maxHeight: 50,
  },
  categories: {
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
