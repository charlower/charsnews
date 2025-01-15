import { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  View,
} from 'react-native';

import { Loader, LoaderMini } from '@/components/Loader';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  icon?: any;
  colorScheme?: 'primary' | 'black' | 'danger' | 'transparent' | 'white';
  style?: any;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  title,
  icon,
  onPress,
  colorScheme,
  style,
  isDisabled,
  isLoading,
}: ButtonProps) {
  const backgroundColorPrimary = useThemeColor(
    { light: '#1A28FD', dark: '#1A28FD' },
    'background'
  );
  const backgroundColorBlack = useThemeColor(
    { light: '#000000', dark: 'rgba(255,255,255,0.9)' },
    'background'
  );
  const backgroundColorDanger = useThemeColor(
    { light: '#F53742', dark: '#F53742' },
    'background'
  );
  const backgroundColorTransparent = 'rgba(0,0,0,0)';
  const backgroundColorWhite = 'rgba(255,255,255,1)';

  const opacity = useRef(new Animated.Value(isDisabled ? 0.2 : 1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isDisabled ? 0.2 : 1,
      duration: 200, // Adjust the duration as needed
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [isDisabled]);

  return (
    <Animated.View style={[{ opacity }, { ...style }]}>
      <TouchableOpacity
        style={[
          {
            backgroundColor:
              colorScheme === 'black'
                ? backgroundColorBlack
                : colorScheme === 'danger'
                ? backgroundColorDanger
                : colorScheme === 'transparent'
                ? backgroundColorTransparent
                : colorScheme === 'white'
                ? backgroundColorWhite
                : backgroundColorPrimary,
            opacity,
          },
          styles.button,
          { ...style },
        ]}
        onPress={() => {
          if (isDisabled) return;
          onPress();
        }}
      >
        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
            }}
          >
            <LoaderMini
              customColor={
                colorScheme === 'transparent'
                  ? undefined
                  : colorScheme === 'white'
                  ? 'black'
                  : 'white'
              }
            />
          </View>
        ) : (
          <>
            {icon && icon}
            {title && (
              <ThemedText
                lightColor='#FCFCFD'
                darkColor={colorScheme === 'black' ? '#000000' : '#FCFCFD'}
                type='defaultSemiBold'
              >
                {title}
              </ThemedText>
            )}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});
