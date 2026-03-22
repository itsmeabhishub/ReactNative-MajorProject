import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Badge from '../components/Badge';
import { spacing, radius } from '../theme';
import { useTheme } from '../context/ThemeContext';
import { inventoryData } from '../data/mockData';
import type { InventoryItem, AppStackParamList, Category } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'MainTabs'>;

const CATEGORIES: Array<'All' | Category> = [
  'All',
  'Electronics',
  'Peripherals',
  'Accessories',
  'Furniture',
];

const Inventory: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [search, setSearch] = useState<string>('');
  const [activeFilter, setFilter] = useState<'All' | Category>('All');
  const [localData] = useState<InventoryItem[]>(inventoryData);

  const filtered = useMemo<InventoryItem[]>(() => {
    return localData.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeFilter === 'All' || item.category === activeFilter;
      return matchSearch && matchCat;
    });
  }, [search, activeFilter, localData]);

  const renderItem: ListRenderItem<InventoryItem> = ({ item }) => {
    const isLow = item.qty < item.minQty;
    return (
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardTop}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.itemName, { color: colors.textPrimary }]}>
              {item.name}
            </Text>
            <Text style={[styles.sku, { color: colors.textMuted }]}>
              {item.sku} · {item.location}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 4 }}>
            <Text
              style={[
                styles.qty,
                { color: isLow ? colors.danger : colors.success },
              ]}
            >
              {item.qty} units
            </Text>
            {isLow && <Badge label="Low" />}
          </View>
        </View>
        <View style={styles.cardBottom}>
          <Text style={[styles.meta, { color: colors.textSecondary }]}>
            Category: {item.category}
          </Text>
          <Text style={[styles.meta, { color: colors.textSecondary }]}>
            ₹{item.price.toLocaleString()}
          </Text>
          <Text style={[styles.meta, { color: colors.textSecondary }]}>
            Min: {item.minQty}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>
          Inventory
        </Text>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('AddItem')}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.search,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.textPrimary,
          },
        ]}
        placeholder="Search by name or SKU…"
        placeholderTextColor={colors.textMuted}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.chips}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.chip,
              { borderColor: colors.border, backgroundColor: colors.card },
              activeFilter === cat && {
                backgroundColor: colors.primary,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => setFilter(cat)}
          >
            <Text
              style={[
                styles.chipText,
                { color: colors.textSecondary },
                activeFilter === cat && { color: '#FFFFFF', fontWeight: '600' },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.textMuted }]}>
            No items match your search.
          </Text>
        }
      />
    </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  heading: { fontSize: 22, fontWeight: '700' },
  addBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 999,
  },
  addBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  search: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.sm + 2,
    fontSize: 14,
    marginBottom: spacing.sm,
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
    marginBottom: spacing.sm,
  },
  itemName: { fontSize: 15, fontWeight: '600' },
  sku: { fontSize: 12, marginTop: 2 },
  qty: { fontSize: 15, fontWeight: '700' },
  cardBottom: { flexDirection: 'row', gap: spacing.md },
  meta: { fontSize: 12 },
  empty: { textAlign: 'center', marginTop: 40 },
});
