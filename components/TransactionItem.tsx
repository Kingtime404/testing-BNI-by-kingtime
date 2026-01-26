import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Zap, Phone, Utensils } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Transaction, formatCurrency } from '@/mocks/bankData';

interface TransactionItemProps {
  transaction: Transaction;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'transfer':
      return <ArrowRightIcon />;
    case 'income':
      return <ArrowDownLeft size={20} color={Colors.success} />;
    case 'shopping':
      return <ShoppingBag size={20} color={Colors.menu.purple} />;
    case 'bills':
      return <Zap size={20} color={Colors.menu.yellow} />;
    case 'topup':
      return <Phone size={20} color={Colors.menu.blue} />;
    case 'food':
      return <Utensils size={20} color={Colors.menu.orange} />;
    default:
      return <ArrowUpRight size={20} color={Colors.gray[500]} />;
  }
};

const ArrowRightIcon = () => <ArrowUpRight size={20} color={Colors.error} />;

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'transfer':
      return Colors.errorLight;
    case 'income':
      return Colors.successLight;
    case 'shopping':
      return '#EDE9FE';
    case 'bills':
      return Colors.warningLight;
    case 'topup':
      return Colors.infoLight;
    case 'food':
      return '#FFEDD5';
    default:
      return Colors.gray[100];
  }
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isCredit = transaction.type === 'credit';

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: getCategoryColor(transaction.category) }]}>
        {getCategoryIcon(transaction.category)}
      </View>
      <View style={styles.details}>
        <Text style={styles.description} numberOfLines={1}>{transaction.description}</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
      <Text style={[styles.amount, isCredit ? styles.credit : styles.debit]}>
        {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.gray[800],
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: Colors.gray[400],
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
  },
  credit: {
    color: Colors.success,
  },
  debit: {
    color: Colors.gray[800],
  },
});
