import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../theme/tokens';

interface CourviaMarkProps {
  size?: number;
}

export function CourviaMark({ size = 28 }: CourviaMarkProps) {
  return (
    <View style={[styles.markWrap, { width: size, height: size, borderRadius: Math.round(size * 0.28) }]}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="36" height="36" rx="10" fill={COLORS.truffle} />
        {/* Abstract C-arch & open learning ribbon */}
        <path
          d="M24.2 12.6C22.7 10.9 20.5 9.9 18 9.9C13.3 9.9 9.6 13.5 9.6 18C9.6 22.5 13.3 26.1 18 26.1C20.5 26.1 22.7 25.1 24.2 23.4"
          stroke={COLORS.powder}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Coral achievement spark / certificate seal dot */}
        <circle cx="24.5" cy="18" r="3" fill={COLORS.coral} />
      </svg>
    </View>
  );
}

interface CourviaLogoProps {
  markSize?: number;
  fontSize?: number;
  centered?: boolean;
}

export function CourviaLogo({
  markSize = 28,
  fontSize = 21,
  centered = false,
}: CourviaLogoProps) {
  return (
    <View style={[styles.row, centered && styles.rowCentered]}>
      <CourviaMark size={markSize} />
      <Text style={[styles.wordmark, { fontSize }]}>Courvia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  markWrap: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowCentered: {
    justifyContent: 'center',
  },
  wordmark: {
    fontFamily: FONTS.serif,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: COLORS.truffle,
  },
});
