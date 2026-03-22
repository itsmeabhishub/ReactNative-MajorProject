import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import StatCard from '../components/StatCard';
import {colors, spacing, radius, typography} from '../theme';
import {inventoryData, ticketsData, activityFeed, currentUser} from '../data/mockData';
import {ActivityItem} from '../types';

const Dashboard: React.FC = () => {
  const lowStock    = inventoryData.filter(i => i.qty < i.minQty).length;
  const openTickets = ticketsData.filter(t => t.status !== 'Closed').length;
  const totalItems  = inventoryData.reduce((sum, i) => sum + i.qty, 0);
  const totalValue  = inventoryData.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.org}>{currentUser.organization}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{currentUser.avatar}</Text>
        </View>
      </View>

      {/* Stats */}
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.row}>
        <View style={styles.half}>
          <StatCard title="Total Stock"  value={totalItems} subtitle="units in inventory"          accent={colors.primary} />
        </View>
        <View style={styles.half}>
          <StatCard title="Stock Value"  value={`Rs.${(totalValue / 100000).toFixed(1)}L`} subtitle="estimated value" accent={colors.success} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.half}>
          <StatCard title="Open Tickets" value={openTickets} subtitle="require attention"          accent={colors.warning} />
        </View>
        <View style={styles.half}>
          <StatCard title="Low Stock"    value={lowStock}    subtitle="below min threshold"        accent={colors.danger} />
        </View>
      </View>

      {/* Low stock alert */}
      {lowStock > 0 && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>
            ⚠️  {lowStock} item(s) below minimum stock level
          </Text>
        </View>
      )}

      {/* Activity feed */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {activityFeed.map((item: ActivityItem) => (
        <View key={item.id} style={styles.activityRow}>
          <View style={styles.dot} />
          <View style={styles.actLeft}>
            <Text style={styles.actAction}>{item.action}</Text>
            <Text style={styles.actDetail}>{item.detail}</Text>
          </View>
          <View style={styles.actRight}>
            <Text style={styles.actUser}>{item.user}</Text>
            <Text style={styles.actTime}>{item.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen:       {flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.md},
  content:      {paddingBottom: 32},
  header:       {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.xl, paddingBottom: spacing.lg},
  greeting:     {fontSize: 14, color: colors.textSecondary},
  name:         {fontSize: 22, fontWeight: '700', color: colors.textPrimary},
  org:          {fontSize: 13, color: colors.textMuted},
  avatar:       {width: 46, height: 46, borderRadius: 23, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center'},
  avatarText:   {fontSize: 15, fontWeight: '700', color: colors.primary},
  sectionTitle: {...typography.h3, marginTop: spacing.lg, marginBottom: spacing.sm},
  row:          {flexDirection: 'row', gap: spacing.sm},
  half:         {flex: 1},
  alert:        {backgroundColor: colors.warningLight, borderRadius: radius.md, padding: spacing.md, marginVertical: spacing.sm},
  alertText:    {color: colors.warning, fontWeight: '600', fontSize: 14},
  activityRow:  {flexDirection: 'row', alignItems: 'flex-start', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border, gap: spacing.sm},
  dot:          {width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: 5},
  actLeft:      {flex: 1},
  actAction:    {fontSize: 14, fontWeight: '600', color: colors.textPrimary},
  actDetail:    {fontSize: 13, color: colors.textSecondary, marginTop: 1},
  actRight:     {alignItems: 'flex-end'},
  actUser:      {fontSize: 12, color: colors.textMuted},
  actTime:      {fontSize: 12, color: colors.textMuted, marginTop: 1},
});

export default Dashboard;
