import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing, radius } from '../theme';
import { useTheme } from '../context/ThemeContext';
import type { AddItemForm, AppStackParamList, Category } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'AddItem'>;

const CATEGORIES: Category[] = ['Electronics', 'Peripherals', 'Accessories', 'Furniture'];

const AddItem: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();

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

  const Field: React.FC<FieldProps> = ({ label, field, placeholder, keyboardType = 'default' }) => (
    <View style={styles.fieldWrap}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.textPrimary }]}
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
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.textPrimary }]}>Add Inventory Item</Text>
      </View>

      <Field label="Item Name *"      field="name"     placeholder="e.g. MacBook Pro 14 inch" />
      <Field label="SKU"              field="sku"      placeholder="e.g. EL-011" />

      <View style={styles.fieldWrap}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Category *</Text>
        <View style={styles.chips}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                { borderColor: colors.border, backgroundColor: colors.card },
                form.category === cat && { backgroundColor: colors.primary, borderColor: colors.primary },
              ]}
              onPress={() => set('category', cat)}
            >
              <Text style={[
                styles.chipText,
                { color: colors.textSecondary },
                form.category === cat && { color: '#FFFFFF', fontWeight: '600' },
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Field label="Quantity *"        field="qty"      placeholder="e.g. 10"      keyboardType="numeric" />
      <Field label="Minimum Qty"       field="minQty"   placeholder="e.g. 5"       keyboardType="numeric" />
      <Field label="Price (₹)"         field="price"    placeholder="e.g. 1999"    keyboardType="numeric" />
      <Field label="Storage Location"  field="location" placeholder="e.g. Shelf A1" />

      <TouchableOpacity
        style={[styles.saveBtn, { backgroundColor: colors.primary }]}
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
  screen:      { flex: 1, paddingHorizontal: spacing.md },
  header:      { paddingTop: spacing.xl, paddingBottom: spacing.md },
  back:        { marginBottom: spacing.sm },
  backText:    { fontWeight: '600', fontSize: 15 },
  heading:     { fontSize: 22, fontWeight: '700' },
  fieldWrap:   { marginBottom: spacing.md },
  label:       { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.xs },
  input:       { borderWidth: 1, borderRadius: radius.md, padding: spacing.md, fontSize: 15 },
  chips:       { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip:        { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: 999, borderWidth: 1 },
  chipText:    { fontSize: 13 },
  saveBtn:     { borderRadius: radius.md, padding: spacing.md + 2, alignItems: 'center', marginTop: spacing.lg },
  saveBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
