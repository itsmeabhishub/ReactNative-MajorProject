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
import { colors, spacing, radius, typography } from '../theme';
import { ticketsData } from '../data/mockData';
import type { Ticket, TicketStatus } from '../types';

type Filter = 'All' | TicketStatus;

const FILTERS: Filter[] = ['All', 'Open', 'In Progress', 'Closed'];

const Tickets: React.FC = () => {
  const [filter,   setFilter]   = useState<Filter>('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const data: Ticket[] =
    filter === 'All'
      ? ticketsData
      : ticketsData.filter(t => t.status === filter);

  const renderItem: ListRenderItem<Ticket> = ({ item }) => {
    const isOpen = expanded === item.id;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => setExpanded(isOpen ? null : item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.cardTop}>
          <Text style={styles.ticketId}>{item.id}</Text>
          <Badge label={item.priority} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.row}>
          <Badge label={item.status} />
          <Text style={styles.meta}>{item.category} · {item.created}</Text>
        </View>
        {isOpen && (
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.detailText}>{item.description}</Text>
            <Text style={styles.detailLabel}>Assigned to</Text>
            <Text style={styles.detailText}>{item.assignee}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={[typography.h2, styles.heading]}>Support Tickets</Text>

      <View style={styles.chips}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, filter === f && styles.chipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>
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
          <Text style={styles.empty}>No tickets found.</Text>
        }
      />
    </View>
  );
};

export default Tickets;

const styles = StyleSheet.create({
  screen:         { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.md },
  heading:        { paddingTop: spacing.xl, paddingBottom: spacing.md },
  chips:          { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md },
  chip: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipActive:     { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText:       { fontSize: 13, color: colors.textSecondary },
  chipTextActive: { color: colors.white, fontWeight: '600' },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 3, elevation: 1,
  },
  cardTop:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  ticketId:    { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  title:       { fontSize: 15, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
  row:         { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  meta:        { fontSize: 12, color: colors.textMuted },
  detail: {
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  detailLabel: { ...typography.label, marginBottom: 2, marginTop: spacing.sm },
  detailText:  { fontSize: 14, color: colors.textSecondary },
  empty:       { textAlign: 'center', marginTop: 40, color: colors.textMuted },
});
