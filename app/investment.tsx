import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown, PieChart, BarChart3, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { formatCurrency } from '@/mocks/bankData';

const portfolioItems = [
  { id: '1', name: 'Reksadana Campuran', value: 15000000, change: 5.2, type: 'up' },
  { id: '2', name: 'Reksadana Pasar Uang', value: 8000000, change: 2.1, type: 'up' },
  { id: '3', name: 'SBN Ritel', value: 5000000, change: 0.5, type: 'up' },
  { id: '4', name: 'Reksadana Saham', value: 2000000, change: -1.3, type: 'down' },
];

export default function InvestmentScreen() {
  const totalValue = 2350225021;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Investasi</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalValue)}</Text>
        <View style={styles.changeRow}>
          <TrendingUp size={16} color={Colors.success} />
          <Text style={styles.changeText}>+3.5% bulan ini</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <PieChart size={20} color={Colors.primary} />
          <Text style={styles.actionText}>Beli</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <BarChart3 size={20} color={Colors.primary} />
          <Text style={styles.actionText}>Jual</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Portofolio Anda</Text>
      <View style={styles.portfolioList}>
        {portfolioItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.portfolioItem,
              index !== portfolioItems.length - 1 && styles.portfolioItemBorder,
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.portfolioIcon}>
              {item.type === 'up' ? (
                <TrendingUp size={20} color={Colors.success} />
              ) : (
                <TrendingDown size={20} color={Colors.error} />
              )}
            </View>
            <View style={styles.portfolioContent}>
              <Text style={styles.portfolioName}>{item.name}</Text>
              <Text style={styles.portfolioValue}>{formatCurrency(item.value)}</Text>
            </View>
            <View style={styles.portfolioChange}>
              <Text style={[styles.changePercent, item.type === 'up' ? styles.changeUp : styles.changeDown]}>
                {item.type === 'up' ? '+' : ''}{item.change}%
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Mulai Investasi</Text>
        <Text style={styles.infoDesc}>
          Mulai dari Rp 10.000 dan nikmati keuntungan investasi jangka panjang
        </Text>
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
  totalCard: {
    backgroundColor: Colors.primary,
    margin: 20,
    borderRadius: 20,
    padding: 24,
  },
  totalLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  changeText: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 14,
    gap: 8,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[800],
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
  },
  portfolioList: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  portfolioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  portfolioItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  portfolioIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  portfolioContent: {
    flex: 1,
    marginLeft: 14,
  },
  portfolioName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  portfolioValue: {
    fontSize: 13,
    color: Colors.gray[500],
    marginTop: 2,
  },
  portfolioChange: {
    alignItems: 'flex-end',
  },
  changePercent: {
    fontSize: 15,
    fontWeight: '700',
  },
  changeUp: {
    color: Colors.success,
  },
  changeDown: {
    color: Colors.error,
  },
  infoCard: {
    backgroundColor: Colors.primaryLight,
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  infoDesc: {
    fontSize: 14,
    color: Colors.gray[600],
    marginTop: 4,
    lineHeight: 20,
  },
});
