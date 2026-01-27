import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CreditCard, Home, Car, GraduationCap, Briefcase, ChevronRight, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { formatCurrency } from '@/mocks/bankData';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface CreditProduct {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const creditProducts: CreditProduct[] = [
  { id: '1', name: 'KPR', description: 'Kredit Pemilikan Rumah', icon: <Home size={24} color="#fff" />, color: Colors.menu.blue },
  { id: '2', name: 'KKB', description: 'Kredit Kendaraan Bermotor', icon: <Car size={24} color="#fff" />, color: Colors.menu.green },
  { id: '3', name: 'KTA', description: 'Kredit Tanpa Agunan', icon: <Briefcase size={24} color="#fff" />, color: Colors.menu.purple },
  { id: '4', name: 'Kredit Pendidikan', description: 'Biaya kuliah & pendidikan', icon: <GraduationCap size={24} color="#fff" />, color: Colors.menu.yellow },
];

const activeCreditCard = {
  name: 'BNI Emerald Card',
  number: '4111 **** **** 1234',
  limit: 50000000,
  used: 12500000,
  dueDate: '2026-01-28',
  minPayment: 1250000,
};

export default function CreditScreen() {
  const usedPercent = (activeCreditCard.used / activeCreditCard.limit) * 100;
  const available = activeCreditCard.limit - activeCreditCard.used;

  const handlePress = (product: CreditProduct) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert(product.name, `Info lengkap ${product.name} akan segera hadir!`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.cardContainer}>
        <View style={styles.creditCard}>
          <View style={styles.cardHeader}>
            <CreditCard size={28} color="#fff" />
            <Text style={styles.cardType}>EMERALD</Text>
          </View>
          <Text style={styles.cardNumber}>{activeCreditCard.number}</Text>
          <Text style={styles.cardName}>{activeCreditCard.name}</Text>
          <View style={styles.cardDecor1} />
          <View style={styles.cardDecor2} />
        </View>
      </View>

      <View style={styles.usageCard}>
        <View style={styles.usageHeader}>
          <Text style={styles.usageTitle}>Penggunaan Limit</Text>
          <Text style={styles.usagePercent}>{usedPercent.toFixed(0)}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${usedPercent}%` }]} />
        </View>
        <View style={styles.usageDetails}>
          <View>
            <Text style={styles.usageLabel}>Terpakai</Text>
            <Text style={styles.usageAmount}>{formatCurrency(activeCreditCard.used)}</Text>
          </View>
          <View style={styles.usageRight}>
            <Text style={styles.usageLabel}>Tersedia</Text>
            <Text style={[styles.usageAmount, styles.usageAvailable]}>{formatCurrency(available)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.alertCard}>
        <AlertCircle size={20} color={Colors.warning} />
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>Jatuh Tempo {activeCreditCard.dueDate}</Text>
          <Text style={styles.alertDesc}>
            Minimum pembayaran: {formatCurrency(activeCreditCard.minPayment)}
          </Text>
        </View>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Bayar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Produk Kredit</Text>
      <View style={styles.productsList}>
        {creditProducts.map((product, index) => (
          <TouchableOpacity
            key={product.id}
            style={[
              styles.productItem,
              index !== creditProducts.length - 1 && styles.productItemBorder,
            ]}
            onPress={() => handlePress(product)}
            activeOpacity={0.7}
          >
            <View style={[styles.productIcon, { backgroundColor: product.color }]}>
              {product.icon}
            </View>
            <View style={styles.productContent}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDesc}>{product.description}</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray[300]} />
          </TouchableOpacity>
        ))}
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
  cardContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  creditCard: {
    backgroundColor: Colors.menu.red,
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
    aspectRatio: 1.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 2,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 2,
    marginTop: 'auto',
  },
  cardName: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  cardDecor1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  cardDecor2: {
    position: 'absolute',
    bottom: -80,
    left: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  usageCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    padding: 20,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  usageTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  usagePercent: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  usageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  usageRight: {
    alignItems: 'flex-end',
  },
  usageLabel: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  usageAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray[800],
    marginTop: 2,
  },
  usageAvailable: {
    color: Colors.success,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warningLight,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 14,
  },
  alertContent: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  alertDesc: {
    fontSize: 12,
    color: Colors.gray[600],
    marginTop: 2,
  },
  payButton: {
    backgroundColor: Colors.warning,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  payButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[800],
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 16,
  },
  productsList: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  productItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  productIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContent: {
    flex: 1,
    marginLeft: 14,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  productDesc: {
    fontSize: 13,
    color: Colors.gray[500],
    marginTop: 2,
  },
});
