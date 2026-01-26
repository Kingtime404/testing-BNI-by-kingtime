import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Zap, Droplets, Phone, Wifi, Plus, Calendar, CheckCircle, LucideIcon } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { bills, formatCurrency, Bill } from '@/mocks/bankData';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface BillCategory {
  id: string;
  name: string;
  Icon: LucideIcon;
  color: string;
  type: Bill['category'];
}

const billCategories: BillCategory[] = [
  { id: '1', name: 'Listrik', Icon: Zap, color: Colors.menu.red, type: 'electricity' },
  { id: '2', name: 'Air', Icon: Droplets, color: Colors.menu.blue, type: 'water' },
  { id: '3', name: 'Telepon', Icon: Phone, color: Colors.menu.green, type: 'phone' },
  { id: '4', name: 'Internet', Icon: Wifi, color: Colors.menu.purple, type: 'internet' },
];

export default function BillsScreen() {
  const [billsData, setBillsData] = useState(bills);

  const toggleAutoDebit = (billId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setBillsData(prev =>
      prev.map(bill =>
        bill.id === billId ? { ...bill, autoDebit: !bill.autoDebit } : bill
      )
    );
  };

  const handlePayBill = (bill: Bill) => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    Alert.alert(
      'Konfirmasi Pembayaran',
      `Bayar ${bill.name} sebesar ${formatCurrency(bill.amount)}?`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Bayar', onPress: () => Alert.alert('Berhasil', 'Pembayaran berhasil!') },
      ]
    );
  };

  const handleAddBill = (category: BillCategory) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert('Tambah Tagihan', `Tambah tagihan ${category.name} baru`);
  };

  const getCategoryIcon = (type: Bill['category']): LucideIcon => {
    const category = billCategories.find(c => c.type === type);
    return category?.Icon || Zap;
  };

  const getCategoryColor = (type: Bill['category']) => {
    const category = billCategories.find(c => c.type === type);
    return category?.color || Colors.gray[500];
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Kategori Tagihan</Text>
      <View style={styles.categoriesGrid}>
        {billCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleAddBill(category)}
            activeOpacity={0.7}
          >
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <category.Icon size={24} color="#fff" />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.autoDebitInfo}>
        <View style={styles.autoDebitHeader}>
          <CheckCircle size={20} color={Colors.success} />
          <Text style={styles.autoDebitTitle}>Auto-Debit Aktif</Text>
        </View>
        <Text style={styles.autoDebitDesc}>
          Tagihan akan dibayar otomatis saat jatuh tempo
        </Text>
      </View>

      <View style={styles.billsHeader}>
        <Text style={styles.sectionTitle}>Tagihan Anda</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.primary} />
          <Text style={styles.addButtonText}>Tambah</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.billsList}>
        {billsData.map((bill) => {
          const daysUntilDue = getDaysUntilDue(bill.dueDate);
          const isUrgent = daysUntilDue <= 3;

          return (
            <View key={bill.id} style={styles.billCard}>
              <View style={styles.billHeader}>
                <View style={[styles.billIcon, { backgroundColor: getCategoryColor(bill.category) + '20' }]}>
                  {(() => {
                    const IconComponent = getCategoryIcon(bill.category);
                    return <IconComponent size={22} color={getCategoryColor(bill.category)} />;
                  })()}
                </View>
                <View style={styles.billInfo}>
                  <Text style={styles.billName}>{bill.name}</Text>
                  <Text style={styles.billProvider}>{bill.provider}</Text>
                </View>
                <View style={styles.autoDebitToggle}>
                  <Text style={styles.autoDebitLabel}>Auto</Text>
                  <Switch
                    value={bill.autoDebit}
                    onValueChange={() => toggleAutoDebit(bill.id)}
                    trackColor={{ false: Colors.gray[200], true: Colors.successLight }}
                    thumbColor={bill.autoDebit ? Colors.success : Colors.gray[400]}
                  />
                </View>
              </View>

              <View style={styles.billDetails}>
                <View style={styles.billAmountSection}>
                  <Text style={styles.billAmountLabel}>Jumlah Tagihan</Text>
                  <Text style={styles.billAmount}>{formatCurrency(bill.amount)}</Text>
                </View>
                <View style={styles.billDueSection}>
                  <View style={styles.dueDateRow}>
                    <Calendar size={14} color={isUrgent ? Colors.error : Colors.gray[500]} />
                    <Text style={[styles.dueDate, isUrgent && styles.dueDateUrgent]}>
                      {daysUntilDue} hari lagi
                    </Text>
                  </View>
                  <Text style={styles.dueDateFull}>{bill.dueDate}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.payButton, bill.autoDebit && styles.payButtonDisabled]}
                onPress={() => handlePayBill(bill)}
                disabled={bill.autoDebit}
                activeOpacity={0.8}
              >
                <Text style={[styles.payButtonText, bill.autoDebit && styles.payButtonTextDisabled]}>
                  {bill.autoDebit ? 'Auto-Debit Aktif' : 'Bayar Sekarang'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[800],
    marginHorizontal: 20,
    marginTop: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  categoryCard: {
    alignItems: 'center',
    width: '22%',
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.gray[700],
    textAlign: 'center',
  },
  autoDebitInfo: {
    backgroundColor: Colors.successLight,
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    borderRadius: 14,
  },
  autoDebitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  autoDebitTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.success,
  },
  autoDebitDesc: {
    fontSize: 13,
    color: Colors.gray[600],
    marginTop: 4,
    marginLeft: 28,
  },
  billsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  billsList: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  billCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  billHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  billInfo: {
    flex: 1,
    marginLeft: 12,
  },
  billName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  billProvider: {
    fontSize: 13,
    color: Colors.gray[500],
    marginTop: 2,
  },
  autoDebitToggle: {
    alignItems: 'center',
  },
  autoDebitLabel: {
    fontSize: 10,
    color: Colors.gray[500],
    marginBottom: 2,
  },
  billDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  billAmountSection: {},
  billAmountLabel: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  billAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.gray[800],
    marginTop: 2,
  },
  billDueSection: {
    alignItems: 'flex-end',
  },
  dueDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dueDate: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray[600],
  },
  dueDateUrgent: {
    color: Colors.error,
  },
  dueDateFull: {
    fontSize: 12,
    color: Colors.gray[400],
    marginTop: 2,
  },
  payButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  payButtonDisabled: {
    backgroundColor: Colors.gray[100],
  },
  payButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  payButtonTextDisabled: {
    color: Colors.gray[500],
  },
});
