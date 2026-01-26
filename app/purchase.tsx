import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ShoppingBag, Shirt, Watch, Smartphone, Gift, Utensils, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface PurchaseCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const purchaseCategories: PurchaseCategory[] = [
  { id: '1', name: 'Fashion', description: 'Baju, sepatu, aksesoris', icon: <Shirt size={24} color="#fff" />, color: Colors.menu.purple },
  { id: '2', name: 'Elektronik', description: 'Gadget & perangkat', icon: <Smartphone size={24} color="#fff" />, color: Colors.menu.blue },
  { id: '3', name: 'Lifestyle', description: 'Jam, tas, kacamata', icon: <Watch size={24} color="#fff" />, color: Colors.menu.yellow },
  { id: '4', name: 'Makanan', description: 'Restoran & kuliner', icon: <Utensils size={24} color="#fff" />, color: Colors.menu.red },
  { id: '5', name: 'Voucher', description: 'Voucher belanja', icon: <Gift size={24} color="#fff" />, color: Colors.menu.green },
];

const merchants = [
  { id: '1', name: 'Tokopedia', cashback: '10%' },
  { id: '2', name: 'Shopee', cashback: '5%' },
  { id: '3', name: 'Blibli', cashback: '8%' },
  { id: '4', name: 'Lazada', cashback: '7%' },
];

export default function PurchaseScreen() {
  const handlePress = (category: PurchaseCategory) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert(category.name, `Belanja ${category.name} akan segera hadir!`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.bannerCard}>
        <ShoppingBag size={40} color="#fff" />
        <Text style={styles.bannerTitle}>Belanja Lebih Hemat</Text>
        <Text style={styles.bannerDesc}>Dapatkan cashback hingga 10% untuk setiap transaksi</Text>
      </View>

      <Text style={styles.sectionTitle}>Kategori</Text>
      <View style={styles.categoriesGrid}>
        {purchaseCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handlePress(category)}
            activeOpacity={0.7}
          >
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              {category.icon}
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Merchant Partner</Text>
      <View style={styles.merchantsList}>
        {merchants.map((merchant, index) => (
          <TouchableOpacity
            key={merchant.id}
            style={[
              styles.merchantItem,
              index !== merchants.length - 1 && styles.merchantItemBorder,
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.merchantIcon}>
              <ShoppingBag size={20} color={Colors.primary} />
            </View>
            <View style={styles.merchantContent}>
              <Text style={styles.merchantName}>{merchant.name}</Text>
              <View style={styles.cashbackBadge}>
                <Text style={styles.cashbackText}>Cashback {merchant.cashback}</Text>
              </View>
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
  bannerCard: {
    backgroundColor: Colors.menu.purple,
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
  },
  bannerDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[800],
    marginHorizontal: 20,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  categoryCard: {
    width: '20%',
    alignItems: 'center',
    padding: 8,
  },
  categoryIcon: {
    width: 52,
    height: 52,
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
  merchantsList: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  merchantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  merchantItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  merchantIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  merchantContent: {
    flex: 1,
    marginLeft: 14,
  },
  merchantName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  cashbackBadge: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  cashbackText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
  },
});
