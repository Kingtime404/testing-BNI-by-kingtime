import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Smartphone, Gamepad2, Tv, Zap, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface TopUpOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const topUpOptions: TopUpOption[] = [
  { id: '1', name: 'Pulsa', icon: <Smartphone size={24} color="#fff" />, color: Colors.menu.blue },
  { id: '2', name: 'Paket Data', icon: <Smartphone size={24} color="#fff" />, color: Colors.menu.green },
  { id: '3', name: 'Game', icon: <Gamepad2 size={24} color="#fff" />, color: Colors.menu.purple },
  { id: '4', name: 'E-Money', icon: <Zap size={24} color="#fff" />, color: Colors.menu.yellow },
  { id: '5', name: 'TV Kabel', icon: <Tv size={24} color="#fff" />, color: Colors.menu.red },
];

const denominations = [10000, 20000, 25000, 50000, 100000, 200000];

export default function TopUpScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleSelectAmount = (amount: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedAmount(amount);
  };

  const handleTopUp = () => {
    if (!phoneNumber || !selectedAmount) {
      Alert.alert('Error', 'Mohon lengkapi nomor dan nominal');
      return;
    }
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    Alert.alert('Berhasil', `Top up Rp ${selectedAmount.toLocaleString('id-ID')} ke ${phoneNumber}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Pilih Layanan</Text>
      <View style={styles.optionsGrid}>
        {topUpOptions.map((option) => (
          <TouchableOpacity key={option.id} style={styles.optionCard} activeOpacity={0.7}>
            <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
              {option.icon}
            </View>
            <Text style={styles.optionName}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Nomor Telepon</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nomor telepon"
          placeholderTextColor={Colors.gray[400]}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <Text style={styles.sectionTitle}>Pilih Nominal</Text>
      <View style={styles.denominationsGrid}>
        {denominations.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.denominationCard,
              selectedAmount === amount && styles.denominationSelected,
            ]}
            onPress={() => handleSelectAmount(amount)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.denominationAmount,
                selectedAmount === amount && styles.denominationAmountSelected,
              ]}
            >
              Rp {amount.toLocaleString('id-ID')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.topUpButton, (!phoneNumber || !selectedAmount) && styles.topUpButtonDisabled]}
        onPress={handleTopUp}
        activeOpacity={0.8}
      >
        <Text style={styles.topUpButtonText}>Top Up Sekarang</Text>
      </TouchableOpacity>

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
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  optionCard: {
    width: '20%',
    alignItems: 'center',
    padding: 8,
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.gray[700],
    textAlign: 'center',
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: Colors.gray[800],
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  denominationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
  },
  denominationCard: {
    width: '31%',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    margin: '1%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.gray[200],
  },
  denominationSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  denominationAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[700],
  },
  denominationAmountSelected: {
    color: Colors.primary,
  },
  topUpButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    marginTop: 32,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  topUpButtonDisabled: {
    backgroundColor: Colors.gray[300],
  },
  topUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
