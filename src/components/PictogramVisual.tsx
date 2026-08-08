import { Image, StyleSheet, Text, View } from 'react-native';

import type { Pictogram } from '@/data/pictograms';

type PictogramVisualProps = {
  pictogram: Pictogram;
  size: number;
  fontSize: number;
};

export function PictogramVisual({
  pictogram,
  size,
  fontSize,
}: PictogramVisualProps): React.JSX.Element {
  if (pictogram.image) {
    return (
      <Image
        accessible={false}
        resizeMode="contain"
        source={{ uri: pictogram.image.uri }}
        style={{ height: size, width: size }}
      />
    );
  }

  if (pictogram.emoji) {
    return (
      <Text
        accessible={false}
        style={{ fontSize, lineHeight: Math.round(fontSize * 1.2) }}
      >
        {pictogram.emoji}
      </Text>
    );
  }

  const fallbackLetter: string =
    Array.from(pictogram.label.trim())[0]?.toLocaleUpperCase('pt-BR') ?? '?';

  return (
    <View
      accessible={false}
      style={[
        styles.fallback,
        {
          borderRadius: size / 2,
          height: size,
          width: size,
        },
      ]}
    >
      <Text style={[styles.fallbackText, { fontSize }]}>{fallbackLetter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    backgroundColor: '#E7ECF3',
    borderColor: '#AAB8CA',
    borderWidth: 1,
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#172033',
    fontWeight: '800',
  },
});
