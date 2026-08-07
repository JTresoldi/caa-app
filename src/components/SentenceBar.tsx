import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { Pictogram } from '@/data/pictograms';
import { useResponsiveLayout } from '@/hooks/use-responsive-layout';

type SentenceBarProps = {
  sentence: Pictogram[];
  onSpeak: () => void;
  onRemoveLast: () => void;
  onClear: () => void;
};

type ActionButtonProps = {
  label: string;
  icon: string;
  onPress: () => void;
  disabled: boolean;
  primary?: boolean;
  isLargeScreen: boolean;
  isCompactLandscape: boolean;
  isLandscape: boolean;
};

function ActionButton({
  label,
  icon,
  onPress,
  disabled,
  primary = false,
  isLargeScreen,
  isCompactLandscape,
  isLandscape,
}: ActionButtonProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        isLandscape && styles.landscapeActionButton,
        isLargeScreen && styles.largeActionButton,
        isCompactLandscape && styles.compactActionButton,
        primary ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <Text
        style={[
          styles.actionIcon,
          isLargeScreen && styles.largeActionIcon,
          isCompactLandscape && styles.compactActionIcon,
          primary && styles.primaryLabel,
        ]}
      >
        {icon}
      </Text>
      <Text
        style={[
          styles.actionLabel,
          isLargeScreen && styles.largeActionLabel,
          isCompactLandscape && styles.compactActionLabel,
          primary && styles.primaryLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function SentenceBar({
  sentence,
  onSpeak,
  onRemoveLast,
  onClear,
}: SentenceBarProps): React.JSX.Element {
  const isEmpty: boolean = sentence.length === 0;
  const layout = useResponsiveLayout();

  return (
    <View
      accessibilityLabel="Frase atual"
      style={[
        styles.container,
        layout.isLandscape && styles.landscapeContainer,
        layout.isTablet && styles.largeContainer,
        layout.isCompactLandscape && styles.compactContainer,
      ]}
    >
      <View
        style={[
          styles.sentenceArea,
          layout.isLandscape && styles.landscapeSentenceArea,
          layout.isCompactLandscape && styles.compactSentenceArea,
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[
            styles.sentenceScroll,
            layout.isCompactLandscape && styles.compactSentenceScroll,
          ]}
          contentContainerStyle={[
            styles.sentenceContent,
            layout.isTablet && styles.largeSentenceContent,
            layout.isCompactLandscape && styles.compactSentenceContent,
          ]}
        >
          {isEmpty ? (
            <Text
              style={[
                styles.placeholder,
                layout.isCompactLandscape && styles.compactPlaceholder,
              ]}
            >
              Toque nos pictogramas para formar uma frase
            </Text>
          ) : (
            sentence.map((pictogram: Pictogram, index: number) => (
              <View
                key={`${pictogram.id}-${index}`}
                style={[
                  styles.selectedPictogram,
                  layout.isTablet && styles.largeSelectedPictogram,
                  layout.isCompactLandscape && styles.compactSelectedPictogram,
                ]}
              >
                <Text
                  style={[
                    styles.selectedEmoji,
                    layout.isTablet && styles.largeSelectedEmoji,
                    layout.isCompactLandscape && styles.compactSelectedEmoji,
                  ]}
                >
                  {pictogram.emoji}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.selectedLabel,
                    layout.isTablet && styles.largeSelectedLabel,
                    layout.isCompactLandscape && styles.compactSelectedLabel,
                  ]}
                >
                  {pictogram.label}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <View
        style={[
          styles.actions,
          layout.isLandscape && styles.landscapeActions,
          layout.isCompactLandscape && styles.compactActions,
        ]}
      >
        <ActionButton
          label="Falar"
          icon="▶"
          onPress={onSpeak}
          disabled={isEmpty}
          primary
          isLargeScreen={layout.isTablet}
          isCompactLandscape={layout.isCompactLandscape}
          isLandscape={layout.isLandscape}
        />
        <ActionButton
          label="Remover"
          icon="⌫"
          onPress={onRemoveLast}
          disabled={isEmpty}
          isLargeScreen={layout.isTablet}
          isCompactLandscape={layout.isCompactLandscape}
          isLandscape={layout.isLandscape}
        />
        <ActionButton
          label="Limpar"
          icon="✕"
          onPress={onClear}
          disabled={isEmpty}
          isLargeScreen={layout.isTablet}
          isCompactLandscape={layout.isCompactLandscape}
          isLandscape={layout.isLandscape}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: '#B9C4D2',
    borderRadius: 18,
    borderWidth: 2,
    padding: 12,
  },
  landscapeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  largeContainer: {
    padding: 16,
  },
  compactContainer: {
    borderRadius: 14,
    height: 78,
    maxHeight: 78,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  sentenceArea: {
    minWidth: 0,
  },
  landscapeSentenceArea: {
    flex: 1,
    minWidth: 0,
  },
  compactSentenceArea: {
    height: 62,
  },
  sentenceScroll: {
    flexGrow: 0,
    width: '100%',
  },
  compactSentenceScroll: {
    height: 62,
    maxHeight: 62,
  },
  sentenceContent: {
    alignItems: 'center',
    flexGrow: 1,
    gap: 8,
    justifyContent: 'flex-start',
    minHeight: 92,
    paddingRight: 8,
  },
  largeSentenceContent: {
    gap: 10,
    minHeight: 104,
  },
  compactSentenceContent: {
    gap: 6,
    minHeight: 62,
    paddingRight: 6,
  },
  placeholder: {
    color: '#5B6575',
    fontSize: 17,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  compactPlaceholder: {
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 4,
  },
  selectedPictogram: {
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    borderColor: '#CBD3DF',
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 78,
    padding: 6,
  },
  largeSelectedPictogram: {
    minWidth: 88,
    padding: 8,
  },
  compactSelectedPictogram: {
    borderRadius: 8,
    minWidth: 58,
    padding: 3,
  },
  selectedEmoji: {
    fontSize: 42,
  },
  largeSelectedEmoji: {
    fontSize: 48,
  },
  compactSelectedEmoji: {
    fontSize: 30,
  },
  selectedLabel: {
    color: '#172033',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 3,
    maxWidth: 82,
  },
  largeSelectedLabel: {
    fontSize: 15,
  },
  compactSelectedLabel: {
    fontSize: 11,
    marginTop: 1,
    maxWidth: 64,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  landscapeActions: {
    alignSelf: 'stretch',
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'flex-end',
    marginLeft: 12,
    marginTop: 0,
  },
  compactActions: {
    gap: 6,
    marginLeft: 8,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    minHeight: 58,
    minWidth: 76,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  landscapeActionButton: {
    flexGrow: 0,
    flexShrink: 0,
  },
  largeActionButton: {
    minHeight: 66,
    minWidth: 92,
    paddingHorizontal: 10,
  },
  compactActionButton: {
    borderRadius: 10,
    minHeight: 48,
    minWidth: 68,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  primaryButton: {
    backgroundColor: '#1565C0',
  },
  secondaryButton: {
    backgroundColor: '#E7ECF3',
  },
  disabledButton: {
    opacity: 0.42,
  },
  pressedButton: {
    opacity: 0.75,
  },
  actionIcon: {
    color: '#172033',
    fontSize: 19,
    fontWeight: '800',
  },
  largeActionIcon: {
    fontSize: 21,
  },
  compactActionIcon: {
    fontSize: 16,
  },
  actionLabel: {
    color: '#172033',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  largeActionLabel: {
    fontSize: 15,
  },
  compactActionLabel: {
    fontSize: 12,
    marginTop: 0,
  },
  primaryLabel: {
    color: '#FFFFFF',
  },
});
