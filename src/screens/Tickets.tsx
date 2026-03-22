import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import Badge from '../components/Badge';
import { spacing, radius } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { ticketsData } from '../data/mockData';
import type { Ticket, TicketStatus } from '../types';

type Filter = 'All' | TicketStatus;

const FILTERS: Filter[] = ['All', 'Open', 'In Progress', 'Closed'];

const Tickets: React.FC = () => {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<Filter>('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const data: Ticket[] =
    filter === 'All'
      ? ticketsData
      : ticketsData.filter(t => t.status === filter);

  const renderItem: ListRenderItem<Ticket> = ({ item }) => {
    const isOpen = expanded === item.id;
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.card }]}
        onPress={() => setExpanded(isOpen ? null : item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.cardTop}>
          <Text style={[styles.ticketId, { color: colors.textMuted }]}>
            {item.id}
          </Text>
          <Badge label={item.priority} />
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {item.title}
        </Text>
        <View style={styles.row}>
          <Badge label={item.status} />
          <Text style={[styles.meta, { color: colors.textMuted }]}>
            {item.category} · {item.created}
          </Text>
        </View>
        {isOpen && (
          <View style={[styles.detail, { borderTopColor: colors.border }]}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
              Description
            </Text>
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {item.description}
            </Text>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
              Assigned to
            </Text>
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {item.assignee}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.textPrimary }]}>
        Support Tickets
      </Text>

      <View style={styles.chips}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[
              styles.chip,
              { borderColor: colors.border, backgroundColor: colors.card },
              filter === f && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.chipText,
                { color: colors.textSecondary },
                filter === f && { color: '#FFFFFF', fontWeight: '600' },
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.textMuted }]}>
            No tickets found.
          </Text>
        }
      />
    </View>
  );
};

export default Tickets;

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: spacing.md },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: { fontSize: 13 },
  card: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  ticketId: { fontSize: 12, fontWeight: '600' },
  title: { fontSize: 15, fontWeight: '600', marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  meta: { fontSize: 12 },
  detail: { marginTop: spacing.md, borderTopWidth: 1, paddingTop: spacing.md },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
    marginTop: spacing.sm,
  },
  detailText: { fontSize: 14 },
  empty: { textAlign: 'center', marginTop: 40 },
});
