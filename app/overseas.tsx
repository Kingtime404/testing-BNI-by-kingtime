import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Keyboard, TouchableWithoutFeedback, Alert, Platform } from 'react-native';
import { Wallet, ChevronRight, X, Check, Globe, User } from 'lucide-react-native';
import Colors from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const menuItems: MenuItem[] = [
  { 
    id: '1', 
    name: 'Transfer Profil', 
    description: 'Ubah nominal saldo pada card balance',
    icon: <Wallet size={24} color="#fff" />, 
    color: '#22C55E' 
  },
  { 
    id: '2', 
    name: 'Transfer Data', 
    description: 'Ubah nama account',
    icon: <User size={24} color="#fff" />, 
    color: '#3B82F6' 
  },
];

export default function OverseasScreen() {
  const [balanceModalVisible, setBalanceModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [tempBalance, setTempBalance] = useState('');
  const [tempName, setTempName] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentName, setCurrentName] = useState('Ozan');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedBalance = await AsyncStorage.getItem('cardBalance');
      if (savedBalance) {
        setCurrentBalance(parseInt(savedBalance, 10));
      }
      const savedName = await AsyncStorage.getItem('accountName');
      if (savedName) {
        setCurrentName(savedName);
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const handlePress = (item: MenuItem) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (item.id === '1') {
      setTempBalance(currentBalance.toString());
      setBalanceModalVisible(true);
    } else if (item.id === '2') {
      setTempName(currentName);
      setNameModalVisible(true);
    }
  };

  const saveBalance = async () => {
    const numericBalance = parseInt(tempBalance.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(numericBalance) && numericBalance >= 0) {
      try {
        await AsyncStorage.setItem('cardBalance', numericBalance.toString());
        setCurrentBalance(numericBalance);
        Alert.alert('Berhasil', 'Saldo berhasil diubah');
      } catch (error) {
        console.log('Error saving balance:', error);
        Alert.alert('Error', 'Gagal menyimpan saldo');
      }
    } else {
      Alert.alert('Error', 'Masukkan nominal yang valid');
    }
    setBalanceModalVisible(false);
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/[^0-9]/g, '');
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleBalanceChange = (text: string) => {
    const formatted = formatCurrency(text);
    setTempBalance(formatted);
  };

  const saveName = async () => {
    if (tempName.trim().length > 0) {
      try {
        await AsyncStorage.setItem('accountName', tempName.trim());
        setCurrentName(tempName.trim());
        Alert.alert('Berhasil', 'Nama account berhasil diubah');
      } catch (error) {
        console.log('Error saving name:', error);
        Alert.alert('Error', 'Gagal menyimpan nama');
      }
    } else {
      Alert.alert('Error', 'Masukkan nama yang valid');
    }
    setNameModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerCard}>
        <View style={styles.headerIcon}>
          <Globe size={32} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>Luar Negeri</Text>
        <Text style={styles.headerDesc}>Kelola profil dan data akun Anda</Text>
      </View>

      <Text style={styles.sectionTitle}>Menu Tersedia</Text>
      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index !== menuItems.length - 1 && styles.menuItemBorder,
            ]}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
              {item.icon}
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuDesc}>{item.description}</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray[300]} />
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={balanceModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setBalanceModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setBalanceModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Transfer Profil</Text>
                  <TouchableOpacity onPress={() => setBalanceModalVisible(false)} style={styles.modalCloseBtn}>
                    <X size={20} color={Colors.gray[500]} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.inputLabel}>Masukkan Nominal Saldo Baru</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.currencyPrefix}>Rp</Text>
                  <TextInput
                    style={styles.balanceInput}
                    value={tempBalance}
                    onChangeText={handleBalanceChange}
                    placeholder="0"
                    placeholderTextColor={Colors.gray[400]}
                    keyboardType="numeric"
                    autoFocus
                  />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={saveBalance}>
                  <Check size={18} color="#fff" />
                  <Text style={styles.saveButtonText}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={nameModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setNameModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setNameModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Transfer Data</Text>
                  <TouchableOpacity onPress={() => setNameModalVisible(false)} style={styles.modalCloseBtn}>
                    <X size={20} color={Colors.gray[500]} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.inputLabel}>Masukkan Nama Account Baru</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.nameInput}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder="Nama"
                    placeholderTextColor={Colors.gray[400]}
                    autoFocus
                  />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={saveName}>
                  <Check size={18} color="#fff" />
                  <Text style={styles.saveButtonText}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerCard: {
    backgroundColor: '#6366F1',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  headerDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[800],
    marginHorizontal: 20,
    marginBottom: 16,
  },
  menuList: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 14,
  },
  menuName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  menuDesc: {
    fontSize: 13,
    color: Colors.gray[500],
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[600],
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  currencyPrefix: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray[600],
    marginRight: 8,
  },
  balanceInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  nameInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  saveButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
