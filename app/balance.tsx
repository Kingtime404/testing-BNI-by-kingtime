import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Wallet, CreditCard, TrendingUp, Shield, Eye, EyeOff } from 'lucide-react-native';
import Colors from '@/constants/colors';
import BalanceChart from '@/components/BalanceChart';
import { accounts, formatCurrency, Account } from '@/mocks/bankData';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const getAccountIcon = (type: Account['type']) => {
  switch (type) {
    case 'savings':
      return <Wallet size={24} color="#fff" />;
    case 'credit':
      return <CreditCard size={24} color="#fff" />;
    case 'investment':
      return <TrendingUp size={24} color="#fff" />;
    case 'insurance':
      return <Shield size={24} color="#fff" />;
    default:
      return <Wallet size={24} color="#fff" />;
  }
};

const getAccountColor = (type: Account['type']) => {
  switch (type) {
    case 'savings':
      return Colors.menu.blue;
    case 'credit':
      return Colors.menu.red;
    case 'investment':
      return Colors.menu.purple;
    case 'insurance':
      return Colors.menu.green;
    default:
      return Colors.menu.blue;
  }
};

const getAccountLabel = (type: Account['type']) => {
  switch (type) {
    case 'savings':
      return 'Tabungan';
    case 'credit':
      return 'Kartu Kredit';
    case 'investment':
      return 'Investasi';
    case 'insurance':
      return 'Asuransi';
    default:
      return 'Rekening';
  }
};

export default function BalanceScreen() {
  const [showBalances, setShowBalances] = useState(true);

  const toggleBalances = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowBalances(!showBalances);
  };

  const totalBalance = accounts
    .filter(a => a.type !== 'credit')
    .reduce((sum, a) => sum + a.balance, 0);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Cek Saldo',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.totalCard}>
          <View style={styles.totalHeader}>
            <Text style={styles.totalLabel}>Total Aset</Text>
            <TouchableOpacity onPress={toggleBalances} style={styles.eyeButton}>
              {showBalances ? (
                <Eye size={20} color="rgba(255,255,255,0.8)" />
              ) : (
                <EyeOff size={20} color="rgba(255,255,255,0.8)" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.totalAmount}>
            {showBalances ? formatCurrency(totalBalance) : '••••••••'}
          </Text>
          <View style={styles.decorativeCircle} />
        </View>

        <BalanceChart />

        <Text style={styles.sectionTitle}>Semua Rekening</Text>
        <View style={styles.accountsList}>
          {accounts.map((account) => (
            <TouchableOpacity key={account.id} style={styles.accountCard} activeOpacity={0.7}>
              <View style={[styles.accountIcon, { backgroundColor: getAccountColor(account.type) }]}>
                {getAccountIcon(account.type)}
              </View>
              <View style={styles.accountInfo}>
                <Text style={styles.accountType}>{getAccountLabel(account.type)}</Text>
                <Text style={styles.accountName}>{account.name}</Text>
                <Text style={styles.accountNumber}>{account.accountNumber}</Text>
              </View>
              <View style={styles.accountBalance}>
                <Text style={[
                  styles.balanceAmount,
                  account.type === 'credit' && styles.balanceNegative
                ]}>
                  {showBalances ? formatCurrency(Math.abs(account.balance)) : '••••••'}
                </Text>
                {account.type === 'credit' && (
                  <Text style={styles.creditLabel}>Tagihan</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
  totalCard: {
    backgroundColor: Colors.primary,
    margin: 20,
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
  },
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  eyeButton: {
    padding: 4,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  decorativeCircle: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[800],
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  accountsList: {
    paddingHorizontal: 20,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  accountIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountInfo: {
    flex: 1,
    marginLeft: 14,
  },
  accountType: {
    fontSize: 12,
    color: Colors.gray[500],
    fontWeight: '500',
  },
  accountName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[800],
    marginTop: 2,
  },
  accountNumber: {
    fontSize: 13,
    color: Colors.gray[400],
    marginTop: 2,
  },
  accountBalance: {
    alignItems: 'flex-end',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray[800],
  },
  balanceNegative: {
    color: Colors.error,
  },
  creditLabel: {
    fontSize: 11,
    color: Colors.error,
    marginTop: 2,
  },
});
