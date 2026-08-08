import { Pressable, StyleSheet, Text } from 'react-native';

import { PictogramVisual } from '@/components/PictogramVisual';
import type { Pictogram } from '@/data/pictograms';

type PictogramButtonProps = {
  pictogram: Pictogram;
  onPress: (pictogram: Pictogram) => void;
  isLargeScreen: boolean;
};

export function PictogramButton({
  pictogram,
  onPress,
  isLargeScreen,
}: PictogramButtonProps): React.JSX.Element {
  const handlePress = (): void => {
    onPress(pictogram);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Adicionar ${pictogram.label} à frase`}
      accessibilityHint="Adiciona este pictograma à barra superior"
      android_ripple={{ color: '#C9D8EA' }}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        isLargeScreen && styles.largeButton,
        { backgroundColor: pictogram.backgroundColor },
        pressed && styles.buttonPressed,
      ]}
    >
      <PictogramVisual
        pictogram={pictogram}
        size={isLargeScreen ? 70 : 58}
        fontSize={isLargeScreen ? 58 : 48}
      />
      <Text style={[styles.label, isLargeScreen && styles.largeLabel]}>
        {pictogram.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    aspectRatio: 1,
    borderColor: '#AAB8CA',
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: '100%',
  },
  largeButton: {
    borderRadius: 20,
    padding: 12,
  },
  buttonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
  label: {
    color: '#101828',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
  },
  largeLabel: {
    fontSize: 18,
    marginTop: 8,
  },
});
