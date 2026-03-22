import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radius, typography } from '../theme';
import type { AddItemForm, AppStackParamList, InventoryCategory } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'AddItem'>;

const CATEGORIES: InventoryCategory[] = [
  'Electronics',
  'Peripherals',
  'Accessories',
  'Furniture',
];

const AddItem: React.FC<Props> = ({ navigation }) => {
  const [form, setForm] = useState<AddItemForm>({
    name: '', sku: '', category: '', qty: '',
    minQty: '', price: '', location: '',
  });

  const set = (key: keyof AddItemForm, val: string): void => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = (): void => {
    if (!form.name || !form.qty || !form.category) {
      Alert.alert('Missing fields', 'Name, quantity, and category are required.');
      return;
    }
    Alert.alert(
      'Item Added ✅',
      `"${form.name}" has been added to inventory.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  interface FieldProps {
    label: string;
    field: keyof AddItemForm;
    placeholder: string;
    keyboardType?: 'default' | 'numeric' | 'email-address';
  }

  const Field: React.FC<FieldProps> = ({
    label,
    field,
    placeholder,
    keyboardType = 'default',
  }) => (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        value={form[field]}
        onChangeText={v => set(field, v)}
      />
    </View>
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={typography.h2}>Add Inventory Item</Text>
      </View>

      <Field label="Item Name *"     field="name"     placeholder="e.g. MacBook Pro 14 inch" />
      <Field label="SKU"             field="sku"      placeholder="e.g. EL-011" />

      {/* Category picker */}
      <View style={styles.fieldWrap}>
        <Text style={styles.label}>Category *</Text>
        <View style={styles.chips}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, form.category === cat && styles.chipActive]}
              onPress={() => set('category', cat)}
            >
              <Text style={[styles.chipText, form.category === cat && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Field label="Quantity *"       field="qty"      placeholder="e.g. 10"     keyboardType="numeric" />
      <Field label="Minimum Qty"      field="minQty"   placeholder="e.g. 5"      keyboardType="numeric" />
      <Field label="Price (₹)"        field="price"    placeholder="e.g. 1999"   keyboardType="numeric" />
      <Field label="Storage Location" field="location" placeholder="e.g. Shelf A1" />

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <Text style={styles.saveBtnText}>Save Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  screen:         { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.md },
  header:         { paddingTop: spacing.xl, paddingBottom: spacing.lg },
  back:           { marginBottom: spacing.sm },
  backText:       { color: colors.primary, fontWeight: '600', fontSize: 15 },
  fieldWrap:      { marginBottom: spacing.md },
  label:          { ...typography.label, marginBottom: spacing.xs },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 15,
    color: colors.textPrimary,
  },
  chips:          { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipActive:     { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText:       { fontSize: 13, color: colors.textSecondary },
  chipTextActive: { color: colors.white, fontWeight: '600' },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md + 2,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  saveBtnText:    { color: colors.white, fontSize: 16, fontWeight: '700' },
});
