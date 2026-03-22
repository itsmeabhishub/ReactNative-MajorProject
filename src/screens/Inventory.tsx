import React, {useState, useMemo} from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  TextInput, StyleSheet, ListRenderItemInfo,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Badge from '../components/Badge';
import {colors, spacing, radius, typography} from '../theme';
import {inventoryData} from '../data/mockData';
import {InventoryItem, InventoryCategory, AppStackParamList} from '../types';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'MainTabs'>;
};

const CATEGORIES: InventoryCategory[] = [
  'All', 'Electronics', 'Peripherals', 'Accessories', 'Furniture',
];

const Inventory: React.FC<Props> = ({navigation}) => {
  const [search,  setSearch] = useState<string>('');
  const [filter,  setFilter] = useState<InventoryCategory>('All');
  const [data]               = useState<InventoryItem[]>(inventoryData);

  const filtered = useMemo<InventoryItem[]>(() => {
    return data.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = filter === 'All' || item.category === filter;
      return matchSearch && matchCat;
    });
  }, [search, filter, data]);

  const renderItem = ({item}: ListRenderItemInfo<InventoryItem>) => {
    const isLow = item.qty < item.minQty;
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardLeft}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.sku}>{item.sku} · {item.location}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={[styles.qty, isLow && styles.qtyLow]}>{item.qty} units</Text>
            {isLow && <Badge label="Low" />}
          </View>
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.meta}>{item.category}</Text>
          <Text style={styles.meta}>Rs.{item.price.toLocaleString()}</Text>
          <Text style={styles.meta}>Min: {item.minQty}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={typography.h2}>Inventory</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddItem')}
          activeOpacity={0.8}>
          <Text style={styles.addBtnText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search by name or SKU..."
        placeholderTextColor={colors.textMuted}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.chips}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, filter === cat && styles.chipActive]}
            onPress={() => setFilter(cat)}>
            <Text style={[styles.chipText, filter === cat && styles.chipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No items found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen:         {flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.md},
  header:         {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.xl, paddingBottom: spacing.md},
  addBtn:         {backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2, borderRadius: radius.full},
  addBtnText:     {color: colors.white, fontWeight: '700', fontSize: 14},
  search:         {backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm + 2, fontSize: 14, color: colors.textPrimary, marginBottom: spacing.sm},
  chips:          {flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md},
  chip:           {paddingHorizontal: spacing.sm + 2, paddingVertical: spacing.xs, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card},
  chipActive:     {backgroundColor: colors.primary, borderColor: colors.primary},
  chipText:       {fontSize: 13, color: colors.textSecondary},
  chipTextActive: {color: colors.white, fontWeight: '600'},
  list:           {paddingBottom: 32},
  card:           {backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, elevation: 1},
  cardTop:        {flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm},
  cardLeft:       {flex: 1},
  cardRight:      {alignItems: 'flex-end', gap: 4},
  itemName:       {fontSize: 15, fontWeight: '600', color: colors.textPrimary},
  sku:            {fontSize: 12, color: colors.textMuted, marginTop: 2},
  qty:            {fontSize: 15, fontWeight: '700', color: colors.success},
  qtyLow:         {color: colors.danger},
  cardBottom:     {flexDirection: 'row', gap: spacing.md},
  meta:           {fontSize: 12, color: colors.textSecondary},
  empty:          {textAlign: 'center', marginTop: 40, color: colors.textMuted},
});

export default Inventory;
