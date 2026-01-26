import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { balanceHistory, formatCurrency } from '@/mocks/bankData';

export default function BalanceChart() {
  const maxAmount = Math.max(...balanceHistory.map(item => item.amount));
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Saldo</Text>
      <Text style={styles.subtitle}>6 bulan terakhir</Text>
      
      <View style={styles.chartContainer}>
        {balanceHistory.map((item, index) => {
          const height = (item.amount / maxAmount) * 120;
          const isLast = index === balanceHistory.length - 1;
          
          return (
            <View key={item.month} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height,
                      backgroundColor: isLast ? Colors.primary : Colors.primaryLight,
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.barLabel, isLast && styles.barLabelActive]}>
                {item.month}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
          <Text style={styles.legendText}>Bulan ini</Text>
        </View>
        <Text style={styles.legendAmount}>
          {formatCurrency(balanceHistory[balanceHistory.length - 1].amount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[800],
  },
  subtitle: {
    fontSize: 13,
    color: Colors.gray[400],
    marginTop: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 24,
    height: 140,
    paddingHorizontal: 8,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 120,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 32,
    borderRadius: 8,
    minHeight: 8,
  },
  barLabel: {
    fontSize: 12,
    color: Colors.gray[400],
    marginTop: 8,
    fontWeight: '500',
  },
  barLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  legendAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
});
