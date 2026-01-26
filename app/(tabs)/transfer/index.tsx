import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, Modal, TextInput } from 'react-native';
import { QrCode, ChevronRight, UserPlus, Users, Clock, Send, X, Search, Building2, Info, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';

interface QuickMenu {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface SavedContact {
  id: string;
  name: string;
  bank: string;
  bankCode: string;
  accountNumber: string;
}

const savedContacts: SavedContact[] = [
  { id: '1', name: 'Ahmad Fauzi', bank: 'BNI', bankCode: 'BNI', accountNumber: '0456789123' },
  { id: '2', name: 'Dewi Lestari', bank: 'BCA', bankCode: 'BCA', accountNumber: '7891234560' },
  { id: '3', name: 'Budi Santoso', bank: 'BRI', bankCode: 'BRI', accountNumber: '1234567890' },
  { id: '4', name: 'Siti Rahayu', bank: 'BNI', bankCode: 'BNI', accountNumber: '9876543210' },
  { id: '5', name: 'Eko Prasetyo', bank: 'BCA', bankCode: 'BCA', accountNumber: '5678901234' },
];

const recentContacts: SavedContact[] = [
  { id: '1', name: 'Rini Wulandari', bank: 'BRI', bankCode: 'BRI', accountNumber: '3456789012' },
  { id: '2', name: 'Hendra Gunawan', bank: 'BNI', bankCode: 'BNI', accountNumber: '6789012345' },
  { id: '3', name: 'Maya Putri', bank: 'BCA', bankCode: 'BCA', accountNumber: '2345678901' },
  { id: '4', name: 'Agus Setiawan', bank: 'BRI', bankCode: 'BRI', accountNumber: '8901234567' },
];

interface BankItem {
  id: string;
  name: string;
  code: string;
  color: string;
}

const bankList: BankItem[] = [
  { id: '1', name: 'Bank Negara Indonesia', code: 'BNI', color: '#F26522' },
  { id: '2', name: 'Bank Central Asia', code: 'BCA', color: '#0066AE' },
  { id: '3', name: 'Bank Rakyat Indonesia', code: 'BRI', color: '#00529C' },
  { id: '4', name: 'Bank Mandiri', code: 'MANDIRI', color: '#003D79' },
  { id: '5', name: 'Bank CIMB Niaga', code: 'CIMB', color: '#7B0C0C' },
  { id: '6', name: 'Bank Danamon', code: 'DANAMON', color: '#003D6A' },
  { id: '7', name: 'Bank Permata', code: 'PERMATA', color: '#00A650' },
  { id: '8', name: 'Bank OCBC NISP', code: 'OCBC', color: '#D71920' },
  { id: '9', name: 'Bank Panin', code: 'PANIN', color: '#003D79' },
  { id: '10', name: 'Bank Maybank', code: 'MAYBANK', color: '#FFC600' },
];

const getBankColor = (bankCode: string): string => {
  switch (bankCode) {
    case 'BNI': return '#F26522';
    case 'BCA': return '#0066AE';
    case 'BRI': return '#00529C';
    default: return Colors.primary;
  }
};

const quickMenus: QuickMenu[] = [
  {
    id: '1',
    name: 'Penerima Baru',
    icon: <UserPlus size={20} color="#FF6B00" strokeWidth={2} />,
  },
  {
    id: '2',
    name: 'Grup Transfer',
    icon: <Users size={20} color="#FF6B00" strokeWidth={2} />,
  },
  {
    id: '3',
    name: 'Jadwal Transfer',
    icon: <Clock size={20} color="#FF6B00" strokeWidth={2} />,
  },
];

export default function TransferScreen() {
  const [activeTab, setActiveTab] = useState<'tersimpan' | 'terakhir'>('tersimpan');
  const [showNewRecipient, setShowNewRecipient] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankItem | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankSearch, setBankSearch] = useState('');
  const [showBankList, setShowBankList] = useState(true);

  const filteredBanks = bankList.filter(bank => 
    bank.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
    bank.code.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const handleSelectBank = (bank: BankItem) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedBank(bank);
    setShowBankList(false);
  };

  const handleAccountNumberChange = (text: string) => {
    setAccountNumber(text);
    if (text.length >= 10) {
      setAccountName('BUDI SANTOSO');
    } else {
      setAccountName('');
    }
  };

  const handleCloseNewRecipient = () => {
    setShowNewRecipient(false);
    setSelectedBank(null);
    setAccountNumber('');
    setAccountName('');
    setBankSearch('');
    setShowBankList(true);
  };

  const handleBackToBank = () => {
    setShowBankList(true);
    setSelectedBank(null);
    setAccountNumber('');
    setAccountName('');
  };

  const handleQuickMenu = (menu: QuickMenu) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (menu.id === '1') {
      setShowNewRecipient(true);
    } else {
      Alert.alert(menu.name, `Fitur ${menu.name} akan segera hadir!`);
    }
  };

  const handleQRScan = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert('Scan QR', 'Fitur scan QR akan segera hadir!');
  };



  const handleSavedContact = (contact: SavedContact) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert('Transfer', `Transfer ke ${contact.name}\n${contact.bank} • ${contact.accountNumber}`);
  };

  const maskAccountNumber = (accNum: string): string => {
    if (accNum.length <= 4) return accNum;
    return '••••' + accNum.slice(-4);
  };

  return (
    <>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.quickMenuContainer}>
        {quickMenus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.quickMenuItem}
            onPress={() => handleQuickMenu(menu)}
            activeOpacity={0.7}
          >
            <View style={styles.quickMenuIcon}>
              {menu.icon}
            </View>
            <Text style={styles.quickMenuText}>{menu.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.qrButton} onPress={handleQRScan} activeOpacity={0.8}>
        <View style={styles.qrIconContainer}>
          <QrCode size={24} color="#FF6B00" strokeWidth={2} />
        </View>
        <View style={styles.qrContent}>
          <Text style={styles.qrTitle}>Scan QR</Text>
          <Text style={styles.qrDesc}>Transfer cepat dengan QRIS</Text>
        </View>
        <ChevronRight size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <View style={styles.infoIconContainer}>
          <Send size={16} color="#FF6B00" strokeWidth={2} />
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Gratis Biaya Transfer</Text>
          <Text style={styles.infoDesc}>
            Nikmati 100x gratis transfer antar bank per bulan
          </Text>
        </View>
      </View>

      <View style={styles.tabSectionContainer}>
        <Text style={styles.sectionLabel}>Daftar Penerima</Text>
        <View style={styles.tabHeader}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'tersimpan' && styles.tabButtonActive]}
            onPress={() => setActiveTab('tersimpan')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabButtonText, activeTab === 'tersimpan' && styles.tabButtonTextActive]}>
              Tersimpan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'terakhir' && styles.tabButtonActive]}
            onPress={() => setActiveTab('terakhir')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabButtonText, activeTab === 'terakhir' && styles.tabButtonTextActive]}>
              Terakhir
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.savedContactsList}>
          {(activeTab === 'tersimpan' ? savedContacts : recentContacts).map((contact, index) => (
            <TouchableOpacity
              key={contact.id}
              style={[
                styles.savedContactItem,
                index === (activeTab === 'tersimpan' ? savedContacts : recentContacts).length - 1 && styles.savedContactItemLast
              ]}
              onPress={() => handleSavedContact(contact)}
              activeOpacity={0.7}
            >
              <View style={[styles.bankBadge, { backgroundColor: getBankColor(contact.bankCode) }]}>
                <Text style={styles.bankBadgeText}>{contact.bankCode.charAt(0)}</Text>
              </View>
              <View style={styles.savedContactInfo}>
                <Text style={styles.savedContactName}>{contact.name}</Text>
                <Text style={styles.savedContactAccount}>
                  {contact.bank} • {maskAccountNumber(contact.accountNumber)}
                </Text>
              </View>
              <ChevronRight size={18} color={Colors.gray[300]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>

    <Modal
      visible={showNewRecipient}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCloseNewRecipient}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={handleCloseNewRecipient} style={styles.closeButton}>
            <X size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Penerima Baru</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {showBankList ? (
            <>
              <View style={styles.searchContainer}>
                <Search size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Cari nama bank"
                  placeholderTextColor="#9CA3AF"
                  value={bankSearch}
                  onChangeText={setBankSearch}
                />
              </View>

              <Text style={styles.bankListLabel}>Daftar Bank</Text>
              
              <View style={styles.bankListContainer}>
                {filteredBanks.map((bank, index) => (
                  <TouchableOpacity
                    key={bank.id}
                    style={[
                      styles.bankItem,
                      index === filteredBanks.length - 1 && styles.bankItemLast
                    ]}
                    onPress={() => handleSelectBank(bank)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.bankInfo}>
                      <Text style={styles.bankName}>{bank.name}</Text>
                      <Text style={styles.bankCode}>{bank.code}</Text>
                    </View>
                    <ChevronRight size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.internationalInfoCard}>
                <View style={styles.internationalInfoIcon}>
                  <Info size={18} color="#FF6B00" />
                </View>
                <View style={styles.internationalInfoContent}>
                  <Text style={styles.internationalInfoTitle}>Transfer Luar Negeri</Text>
                  <Text style={styles.internationalInfoDesc}>
                    Untuk transfer ke luar negeri, silakan kunjungi kantor cabang BNI terdekat atau hubungi BNI Call 1500046
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.selectedBankCard} onPress={handleBackToBank} activeOpacity={0.8}>
                <View style={[styles.selectedBankIcon, { backgroundColor: selectedBank?.color }]}>
                  <Building2 size={20} color="#FFFFFF" />
                </View>
                <View style={styles.selectedBankInfo}>
                  <Text style={styles.selectedBankName}>{selectedBank?.name}</Text>
                  <Text style={styles.selectedBankCode}>{selectedBank?.code}</Text>
                </View>
                <Text style={styles.changeText}>Ubah</Text>
              </TouchableOpacity>

              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Nomor Rekening</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.accountInput}
                    placeholder="Masukkan nomor rekening"
                    placeholderTextColor="#9CA3AF"
                    value={accountNumber}
                    onChangeText={handleAccountNumberChange}
                    keyboardType="numeric"
                    maxLength={16}
                  />
                </View>
              </View>

              {accountName !== '' && (
                <View style={styles.accountNameCard}>
                  <View style={styles.accountNameIcon}>
                    <CheckCircle size={20} color="#22C55E" />
                  </View>
                  <View style={styles.accountNameContent}>
                    <Text style={styles.accountNameLabel}>Nama Rekening</Text>
                    <Text style={styles.accountNameValue}>{accountName}</Text>
                  </View>
                </View>
              )}

              <View style={styles.internationalInfoCard}>
                <View style={styles.internationalInfoIcon}>
                  <Info size={18} color="#FF6B00" />
                </View>
                <View style={styles.internationalInfoContent}>
                  <Text style={styles.internationalInfoTitle}>Informasi Transfer</Text>
                  <Text style={styles.internationalInfoDesc}>
                    Pastikan nama dan nomor rekening penerima sudah benar. Transfer akan diproses secara real-time.
                  </Text>
                </View>
              </View>

              {accountName !== '' && (
                <TouchableOpacity 
                  style={styles.continueButton}
                  onPress={() => {
                    Alert.alert('Transfer', `Transfer ke ${accountName}\n${selectedBank?.name} • ${accountNumber}`);
                    handleCloseNewRecipient();
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.continueButtonText}>Lanjutkan</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#1F2937',
  },
  bankListLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
  },
  bankListContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  bankItemLast: {
    borderBottomWidth: 0,
  },
  bankIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  bankCode: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  internationalInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5EE',
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
  },
  internationalInfoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  internationalInfoContent: {
    flex: 1,
    marginLeft: 12,
  },
  internationalInfoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF6B00',
  },
  internationalInfoDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 18,
  },
  selectedBankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  selectedBankIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBankInfo: {
    flex: 1,
    marginLeft: 12,
  },
  selectedBankName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  selectedBankCode: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF6B00',
  },
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  accountInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
  },
  accountNameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  accountNameIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountNameContent: {
    flex: 1,
    marginLeft: 12,
  },
  accountNameLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  accountNameValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  quickMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  quickMenuItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickMenuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickMenuText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
  },
  qrIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF5EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContent: {
    flex: 1,
    marginLeft: 12,
  },
  qrTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  qrDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EE',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF6B00',
  },
  infoDesc: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  tabSectionContainer: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  tabHeader: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    padding: 3,
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  tabButtonTextActive: {
    color: '#FF6B00',
    fontWeight: '600',
  },
  savedContactsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  savedContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  savedContactItemLast: {
    borderBottomWidth: 0,
  },
  bankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  savedContactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  savedContactName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  savedContactAccount: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
