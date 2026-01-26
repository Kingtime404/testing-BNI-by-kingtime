import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Shield, Heart, Car, Home, Plane, ChevronRight, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { formatCurrency } from '@/mocks/bankData';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface InsuranceProduct {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const insuranceProducts: InsuranceProduct[] = [
  { id: '1', name: 'Asuransi Jiwa', description: 'Perlindungan keluarga tercinta', icon: <Heart size={24} color="#fff" />, color: Colors.menu.red },
  { id: '2', name: 'Asuransi Kesehatan', description: 'Jaminan biaya kesehatan', icon: <Shield size={24} color="#fff" />, color: Colors.menu.green },
  { id: '3', name: 'Asuransi Kendaraan', description: 'Lindungi mobil & motor', icon: <Car size={24} color="#fff" />, color: Colors.menu.blue },
  { id: '4', name: 'Asuransi Properti', description: 'Perlindungan rumah & aset', icon: <Home size={24} color="#fff" />, color: Colors.menu.yellow },
  { id: '5', name: 'Asuransi Perjalanan', description: 'Aman saat bepergian', icon: <Plane size={24} color="#fff" />, color: Colors.menu.purple },
];

const activeInsurance = {
  name: 'Asuransi Jiwa Premium',
  coverage: 500000000,
  premium: 500000,
  dueDate: '2026-02-15',
  status: 'active',
};

export default function InsuranceScreen() {
  const handlePress = (product: InsuranceProduct) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert(product.name, `Info lengkap ${product.name} akan segera hadir!`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.activeCard}>
        <View style={styles.activeHeader}>
          <View style={styles.activeIcon}>
            <Shield size={28} color="#fff" />
          </View>
          <View style={styles.statusBadge}>
            <CheckCircle size={12} color={Colors.success} />
            <Text style={styles.statusText}>Aktif</Text>
          </View>
        </View>
        <Text style={styles.activeName}>{activeInsurance.name}</Text>
        <View style={styles.activeDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Nilai Pertanggungan</Text>
            <Text style={styles.detailValue}>{formatCurrency(activeInsurance.coverage)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Premi Bulanan</Text>
            <Text style={styles.detailValue}>{formatCurrency(activeInsurance.premium)}</Text>
          </View>
        </View>
        <View style={styles.dueDateRow}>
          <Text style={styles.dueLabel}>Jatuh tempo: </Text>
          <Text style={styles.dueDate}>{activeInsurance.dueDate}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Produk Asuransi</Text>
      <View style={styles.productsList}>
        {insuranceProducts.map((product, index) => (
          <TouchableOpacity
            key={product.id}
            style={[
              styles.productItem,
              index !== insuranceProducts.length - 1 && styles.productItemBorder,
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
  activeCard: {
    backgroundColor: Colors.menu.green,
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activeIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.success,
  },
  activeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
  },
  activeDetails: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 24,
  },
  detailItem: {},
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  dueDateRow: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  dueLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  dueDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[800],
    marginHorizontal: 20,
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
