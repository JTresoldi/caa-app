import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PictogramVisual } from '@/components/PictogramVisual';
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
  size: number;
  primary?: boolean;
};

const BAR_METRICS = {
  regular: {
    height: 104,
    actionSize: 60,
    gap: 8,
    padding: 8,
  },
  compact: {
    height: 72,
    actionSize: 48,
    gap: 4,
    padding: 6,
  },
  tablet: {
    height: 118,
    actionSize: 72,
    gap: 10,
    padding: 10,
  },
} as const;

function ActionButton({
  label,
  icon,
  onPress,
  disabled,
  size,
  primary = false,
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
        { height: size, width: size },
        primary ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <Text
        style={[
          styles.actionIcon,
          size === BAR_METRICS.compact.actionSize && styles.compactActionIcon,
          size === BAR_METRICS.tablet.actionSize && styles.largeActionIcon,
          primary && styles.primaryIcon,
        ]}
      >
        {icon}
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
  const metrics = layout.isTablet
    ? BAR_METRICS.tablet
    : layout.isCompactLandscape
      ? BAR_METRICS.compact
      : BAR_METRICS.regular;
  const selectedVisualSize: number = layout.isTablet
    ? 48
    : layout.isCompactLandscape
      ? 30
      : 40;
  const selectedEmojiSize: number = layout.isTablet
    ? 44
    : layout.isCompactLandscape
      ? 28
      : 36;

  return (
    <View
      accessibilityLabel="Frase atual"
      style={[
        styles.container,
        {
          gap: metrics.gap,
          height: metrics.height,
          padding: metrics.padding,
        },
      ]}
    >
      <View style={styles.sentenceField}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.sentenceScroll}
          contentContainerStyle={[
            styles.sentenceContent,
            { gap: metrics.gap },
          ]}
        >
          {isEmpty ? (
            <Text
              numberOfLines={1}
              style={[
                styles.placeholder,
                layout.isCompactLandscape && styles.compactPlaceholder,
                layout.isTablet && styles.largePlaceholder,
              ]}
            >
              Toque nos pictogramas para formar uma frase
            </Text>
          ) : (
            sentence.map((pictogram: Pictogram, index: number) => (
              <View key={`${pictogram.id}-${index}`} style={styles.selectedPictogram}>
                <PictogramVisual
                  pictogram={pictogram}
                  size={selectedVisualSize}
                  fontSize={selectedEmojiSize}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.selectedLabel,
                    layout.isCompactLandscape && styles.compactSelectedLabel,
                    layout.isTablet && styles.largeSelectedLabel,
                  ]}
                >
                  {pictogram.label}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.inlineAction}>
          <ActionButton
            label="Falar"
            icon="▶"
            onPress={onSpeak}
            disabled={isEmpty}
            size={metrics.actionSize}
            primary
          />
        </View>
      </View>

      <View style={[styles.actions, { gap: metrics.gap }]}>
        <ActionButton
          label="Remover"
          icon="⌫"
          onPress={onRemoveLast}
          disabled={isEmpty}
          size={metrics.actionSize}
        />
        <ActionButton
          label="Limpar"
          icon="✕"
          onPress={onClear}
          disabled={isEmpty}
          size={metrics.actionSize}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#EAF2FC',
    borderColor: '#D3E1F3',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  sentenceField: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    borderColor: '#B9C4D2',
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    minWidth: 0,
    overflow: 'hidden',
  },
  sentenceScroll: {
    flex: 1,
    minWidth: 0,
  },
  sentenceContent: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  placeholder: {
    color: '#5B6575',
    fontSize: 15,
    lineHeight: 21,
  },
  compactPlaceholder: {
    fontSize: 12,
  },
  largePlaceholder: {
    fontSize: 17,
  },
  selectedPictogram: {
    alignItems: 'center',
    flexShrink: 0,
    justifyContent: 'center',
    minWidth: 54,
    paddingHorizontal: 2,
  },
  selectedLabel: {
    color: '#172033',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 1,
    maxWidth: 76,
  },
  compactSelectedLabel: {
    fontSize: 10,
    maxWidth: 62,
  },
  largeSelectedLabel: {
    fontSize: 14,
    maxWidth: 88,
  },
  inlineAction: {
    flexShrink: 0,
    paddingHorizontal: 6,
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 0,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#1565C0',
  },
  secondaryButton: {
    backgroundColor: '#DCEBFF',
    borderColor: '#C2D8F2',
    borderWidth: 1,
  },
  disabledButton: {
    opacity: 0.4,
  },
  pressedButton: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  actionIcon: {
    color: '#1565C0',
    fontSize: 25,
    fontWeight: '800',
  },
  compactActionIcon: {
    fontSize: 20,
  },
  largeActionIcon: {
    fontSize: 29,
  },
  primaryIcon: {
    color: '#FFFFFF',
  },
});
