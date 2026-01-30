import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { X, Check, Eye, EyeOff, CreditCard } from 'lucide-react-native';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';

import { LinearGradient } from 'expo-linear-gradient';

interface BalanceCardProps {
  accountName: string;
  accountNumber: string;
  balance: number;
}

const formatBalance = (amount: number): string => {
  return new Intl.NumberFormat('id-ID').format(amount);
};

export default function BalanceCard({ accountName, accountNumber, balance }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [currentBalance, setCurrentBalance] = useState<number>(balance);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [tempBalance, setTempBalance] = useState<string>('');

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const savedBalance = await AsyncStorage.getItem('cardBalance');
        if (savedBalance) {
          setCurrentBalance(Number(savedBalance));
        }
      } catch (error) {
        console.log('Error loading balance:', error);
      }
    };
    loadBalance();
  }, []);

  const openEditModal = () => {
    setTempBalance(currentBalance.toString());
    setEditModalVisible(true);
  };

  const saveBalance = async () => {
    const numericBalance = Number(tempBalance.replace(/[^0-9]/g, ''));
    if (!isNaN(numericBalance)) {
      try {
        await AsyncStorage.setItem('cardBalance', numericBalance.toString());
        setCurrentBalance(numericBalance);
      } catch (error) {
        console.log('Error saving balance:', error);
      }
    }
    setEditModalVisible(false);
  };

  const toggleBalance = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowBalance(!showBalance);
  };



  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d', '#3a3a3a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardPattern}>
          <View style={styles.patternCircle1} />
          <View style={styles.patternCircle2} />
        </View>

        <View style={styles.topSection}>
          <View style={styles.accountInfoSection}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconContainer}>
                <CreditCard size={16} color="#fff" />
              </View>
              <Text style={styles.cardLabel}>BNI PRIVATE</Text>
            </View>
            <Text style={styles.accountNumberText}>1651956069</Text>
          </View>
          <View style={styles.utamaBadge}>
            <Text style={styles.utamaText}>UTAMA</Text>
          </View>
        </View>

        <View style={styles.balanceSection}>
          <View style={styles.balanceLabelRow}>
            <Text style={styles.balanceLabel}>Saldo efektif</Text>
            <TouchableOpacity 
              onPress={toggleBalance} 
              style={styles.eyeButton} 
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {showBalance ? (
                <Eye size={16} color="#fff" />
              ) : (
                <EyeOff size={16} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.balanceRow} onPress={openEditModal} activeOpacity={0.7}>
            <Text style={styles.currency}>Rp</Text>
            <Text style={styles.balanceAmount}>
              {showBalance ? formatBalance(currentBalance) : '••••••••••'}
            </Text>
          </TouchableOpacity>
        </View>


      </LinearGradient>

      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Ubah Saldo</Text>
                  <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.modalCloseBtn}>
                    <X size={20} color={Colors.gray[500]} />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputPrefix}>Rp</Text>
                  <TextInput
                    style={styles.balanceInput}
                    value={tempBalance}
                    onChangeText={setTempBalance}
                    placeholder="Masukkan saldo"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginLeft: 16,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  cardPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  patternCircle1: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(192,192,192,0.1)',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(192,192,192,0.08)',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  utamaBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  utamaText: {
    fontSize: 10,
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
    letterSpacing: 0.2,
  },
  accountInfoSection: {
    flexDirection: 'column',
  },
  accountNumberText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: '#fff',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(192,192,192,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cardIconContainer: {
    marginRight: 6,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: '#fff',
    letterSpacing: 0.3,
  },
  eyeButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceSection: {
    marginBottom: 0,
  },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '400' as const,
    letterSpacing: 0.2,
    marginRight: 6,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#fff',
    marginRight: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#fff',
    letterSpacing: 0,
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
    fontWeight: '700' as const,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginBottom: 20,
  },
  inputPrefix: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.gray[600],
    marginRight: 8,
  },
  balanceInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.black,
  },
  saveButton: {
    backgroundColor: '#F26522',
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
    fontWeight: '700' as const,
  },
});
