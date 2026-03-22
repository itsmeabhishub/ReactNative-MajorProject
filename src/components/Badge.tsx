import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, radius} from '../theme';
import {BadgeProps, BadgeLabel} from '../types';

type BadgeStyle = {bg: string; text: string};

const presets: Record<BadgeLabel, BadgeStyle> = {
  Open:         {bg: colors.infoLight,    text: colors.info},
  'In Progress':{bg: colors.warningLight, text: colors.warning},
  Closed:       {bg: colors.successLight, text: colors.success},
  High:         {bg: colors.dangerLight,  text: colors.danger},
  Medium:       {bg: colors.warningLight, text: colors.warning},
  Low:          {bg: colors.successLight, text: colors.success},
  Active:       {bg: colors.successLight, text: colors.success},
  Inactive:     {bg: '#F1F5F9',           text: colors.textMuted},
  Admin:        {bg: colors.primaryLight, text: colors.primary},
  Manager:      {bg: '#EDE9FE',           text: '#7C3AED'},
  Staff:        {bg: '#F0FDF4',           text: '#15803D'},
};

const Badge: React.FC<BadgeProps> = ({label}) => {
  const style = presets[label] ?? {bg: '#F1F5F9', text: colors.textSecondary};
  return (
    <View style={[styles.badge, {backgroundColor: style.bg}]}>
      <Text style={[styles.text, {color: style.text}]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  text: {fontSize: 12, fontWeight: '600'},
});

export default Badge;
