import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import StatCard from '../components/StatCard';
import { spacing, radius } from '../theme';
import { useTheme } from '../context/ThemeContext';
import {
  inventoryData,
  ticketsData,
  activityFeed,
  currentUser,
} from '../data/mockData';
import type { ActivityItem } from '../types';

const Dashboard: React.FC = () => {
  const { colors } = useTheme();

  const lowStock = inventoryData.filter(i => i.qty < i.minQty).length;
  const openTickets = ticketsData.filter(t => t.status !== 'Closed').length;
  const totalItems = inventoryData.reduce((sum, i) => sum + i.qty, 0);
  const totalValue = inventoryData.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Good morning 👋
          </Text>
          <Text style={[styles.name, { color: colors.textPrimary }]}>
            {currentUser.name}
          </Text>
          <Text style={[styles.org, { color: colors.textMuted }]}>
            {currentUser.organization}
          </Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>
            {currentUser.avatar}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Overview
      </Text>
      <View style={styles.row}>
        <View style={styles.half}>
          <StatCard
            title="Total Stock"
            value={totalItems}
            subtitle="units across all items"
            accent={colors.primary}
          />
        </View>
        <View style={styles.half}>
          <StatCard
            title="Stock Value"
            value={`₹${(totalValue / 100000).toFixed(1)}L`}
            subtitle="estimated inventory value"
            accent={colors.success}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.half}>
          <StatCard
            title="Open Tickets"
            value={openTickets}
            subtitle="require attention"
            accent={colors.warning}
          />
        </View>
        <View style={styles.half}>
          <StatCard
            title="Low Stock"
            value={lowStock}
            subtitle="items below min threshold"
            accent={colors.danger}
          />
        </View>
      </View>

      {/* Low stock alert */}
      {lowStock > 0 && (
        <View style={[styles.alert, { backgroundColor: colors.warningLight }]}>
          <Text style={[styles.alertText, { color: colors.warning }]}>
            ⚠️ {lowStock} item(s) below minimum stock level
          </Text>
        </View>
      )}

      {/* Activity feed */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Recent Activity
      </Text>
      {activityFeed.map((item: ActivityItem) => (
        <View
          key={item.id}
          style={[styles.activityRow, { borderBottomColor: colors.border }]}
        >
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.actAction, { color: colors.textPrimary }]}>
              {item.action}
            </Text>
            <Text style={[styles.actDetail, { color: colors.textSecondary }]}>
              {item.detail}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.actUser, { color: colors.textMuted }]}>
              {item.user}
            </Text>
            <Text style={[styles.actTime, { color: colors.textMuted }]}>
              {item.time}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  greeting: { fontSize: 14 },
  name: { fontSize: 22, fontWeight: '700' },
  org: { fontSize: 13 },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '700' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  row: { flexDirection: 'row', gap: spacing.sm },
  half: { flex: 1 },
  alert: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  alertText: { fontWeight: '600', fontSize: 14 },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    gap: spacing.sm,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  actAction: { fontSize: 14, fontWeight: '600' },
  actDetail: { fontSize: 13, marginTop: 1 },
  actUser: { fontSize: 12 },
  actTime: { fontSize: 12, marginTop: 1 },
});
