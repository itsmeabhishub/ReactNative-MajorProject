import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, spacing, radius, typography} from '../theme';
import {StatCardProps} from '../types';

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  accent = colors.primary,
}) => {
  return (
    <View style={[styles.card, {borderLeftColor: accent}]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, {color: accent}]}>{value}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  title:    {...typography.caption, marginBottom: 4},
  value:    {fontSize: 26, fontWeight: '700', marginBottom: 2},
  subtitle: {...typography.caption},
});

export default StatCard;
