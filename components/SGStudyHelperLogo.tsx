
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

interface SGStudyHelperLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function SGStudyHelperLogo({ 
  size = 'medium', 
  showText = true 
}: SGStudyHelperLogoProps) {
  const logoSize = size === 'small' ? 40 : size === 'medium' ? 60 : 80;
  const textSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;
  const containerSize = size === 'small' ? 50 : size === 'medium' ? 80 : 100;

  return (
    <View style={styles.container}>
      <View style={[
        styles.logoContainer, 
        { 
          width: containerSize, 
          height: containerSize, 
          borderRadius: containerSize / 2 
        }
      ]}>
        {/* Background gradient effect */}
        <View style={[styles.gradientBackground, { 
          width: containerSize, 
          height: containerSize, 
          borderRadius: containerSize / 2 
        }]} />
        
        {/* Main icon */}
        <IconSymbol 
          name="brain.head.profile" 
          size={logoSize} 
          color={colors.text} 
          style={styles.mainIcon}
        />
        
        {/* SG Badge */}
        <View style={[styles.sgBadge, { 
          width: containerSize * 0.35, 
          height: containerSize * 0.35,
          borderRadius: (containerSize * 0.35) / 2,
          right: -2,
          top: -2
        }]}>
          <Text style={[styles.sgText, { fontSize: containerSize * 0.15 }]}>
            SG
          </Text>
        </View>
      </View>
      
      {showText && (
        <Text style={[styles.logoText, { fontSize: textSize }]}>
          SGStudyHelper
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gradientBackground: {
    position: 'absolute',
    backgroundColor: colors.highlight,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  mainIcon: {
    zIndex: 1,
  },
  sgBadge: {
    position: 'absolute',
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    zIndex: 2,
  },
  sgText: {
    color: colors.background,
    fontWeight: '800',
    textAlign: 'center',
  },
  logoText: {
    color: colors.text,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
