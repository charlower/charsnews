import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export const Loader = () => {
  const barColor = useThemeColor({}, 'text');
  // Array of Animated Values for each bar
  const heights = useRef(
    Array(3)
      .fill(null)
      .map(() => new Animated.Value(20))
  ).current;

  const animate = () => {
    const animations = heights.map((anim) => {
      // Animate from low to high and back to low
      return Animated.sequence([
        Animated.timing(anim, {
          toValue: 30, // maximum height of the bar
          duration: 200,
          useNativeDriver: false, // 'height' cannot be animated using native driver
        }),
        Animated.timing(anim, {
          toValue: 10, // minimum height of the bar
          duration: 200,
          useNativeDriver: false,
        }),
      ]);
    });

    // Staggered start times for each animation, restart once all have completed
    Animated.stagger(50, animations).start(() => animate());
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <View style={styles.container}>
      {heights.map((height, index) => (
        <Animated.View
          key={index}
          style={[styles.bar, { height, backgroundColor: barColor }] as any}
        />
      ))}
    </View>
  );
};

export const LoaderMini = ({ customColor }: { customColor?: string }) => {
  const barColor = useThemeColor({}, 'text');
  // Array of Animated Values for each bar
  const heights = useRef(
    Array(3)
      .fill(null)
      .map(() => new Animated.Value(15))
  ).current;

  const animate = () => {
    const animations = heights.map((anim) => {
      // Animate from low to high and back to low
      return Animated.sequence([
        Animated.timing(anim, {
          toValue: 20, // maximum height of the bar
          duration: 200,
          useNativeDriver: false, // 'height' cannot be animated using native driver
        }),
        Animated.timing(anim, {
          toValue: 10, // minimum height of the bar
          duration: 200,
          useNativeDriver: false,
        }),
      ]);
    });

    // Staggered start times for each animation, restart once all have completed
    Animated.stagger(50, animations).start(() => animate());
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <View style={styles.container_mini}>
      {heights.map((height, index) => (
        <Animated.View
          key={index}
          style={
            [
              styles.bar_mini,
              { height, backgroundColor: customColor ? customColor : barColor },
            ] as any
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    width: 20,
  },
  bar: {
    width: 4,
    borderRadius: 2,
  },
  container_mini: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 15,
    width: 15,
  },
  bar_mini: {
    width: 3,
    borderRadius: 2,
  },
});
