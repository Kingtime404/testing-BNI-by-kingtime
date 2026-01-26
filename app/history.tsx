import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Filter, Download } from 'lucide-react-native';
import Colors from '@/constants/colors';
import TransactionItem from '@/components/TransactionItem';
import { transactions, formatCurrency } from '@/mocks/bankData';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

type FilterType = 'all' | 'credit' | 'debit';

export default function HistoryScreen() {
  const [filter, setFilter] = useState<FilterType>('all');

  const handleFilterChange = (newFilter: FilterType) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setFilter(newFilter);
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const totalIncome = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Riwayat Transaksi',
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.gray[800],
          headerTitleStyle: { fontWeight: '600' },
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Download size={22} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Pemasukan</Text>
            <Text style={[styles.summaryAmount, styles.income]}>
              +{formatCurrency(totalIncome)}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Pengeluaran</Text>
            <Text style={[styles.summaryAmount, styles.expense]}>
              -{formatCurrency(totalExpense)}
            </Text>
          </View>
        </View>

        <View style={styles.filterSection}>
          <View style={styles.filterRow}>
            {(['all', 'credit', 'debit'] as FilterType[]).map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filterButton, filter === f && styles.filterButtonActive]}
                onPress={() => handleFilterChange(f)}
              >
                <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                  {f === 'all' ? 'Semua' : f === 'credit' ? 'Masuk' : 'Keluar'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.transactionsList}>
          <Text style={styles.sectionTitle}>Januari 2026</Text>
          <View style={styles.transactionsCard}>
            {filteredTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </View>
        </View>

        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Tidak ada transaksi</Text>
            <Text style={styles.emptyDesc}>Tidak ada transaksi untuk filter yang dipilih</Text>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: Colors.gray[200],
    marginHorizontal: 16,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.gray[500],
    marginBottom: 6,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  income: {
    color: Colors.success,
  },
  expense: {
    color: Colors.gray[800],
  },
  filterSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: Colors.gray[100],
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  filterButtonActive: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[500],
  },
  filterTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  transactionsList: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[500],
    marginBottom: 12,
  },
  transactionsCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray[700],
  },
  emptyDesc: {
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
    marginTop: 4,
  },
});
