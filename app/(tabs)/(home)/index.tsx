import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, Gift, Percent, Lightbulb, ArrowLeftRight, TrendingUp, Award, LogOut, User, Bell, FileText, X, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import BalanceCard from '@/components/BalanceCard';
import PortfolioCard from '@/components/PortfolioCard';
import QuickActions from '@/components/QuickActions';
import MenuGrid from '@/components/MenuGrid';
import TransactionItem from '@/components/TransactionItem';
import { userData, transactions } from '@/mocks/bankData';

type TabType = 'insight' | 'transaksi' | 'growth';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('insight');
  const [userName, setUserName] = useState<string>('Ozan');
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>('');
  const recentTransactions = transactions.slice(0, 4);
  const userPoints = 12500;

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');
        if (savedName) {
          setUserName(savedName);
        }
      } catch (error) {
        console.log('Error loading user name:', error);
      }
    };
    loadUserName();
  }, []);

  const openEditModal = () => {
    setTempName(userName);
    setEditModalVisible(true);
  };

  const saveUserName = async () => {
    if (tempName.trim()) {
      try {
        await AsyncStorage.setItem('userName', tempName.trim());
        setUserName(tempName.trim());
      } catch (error) {
        console.log('Error saving user name:', error);
      }
    }
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>wondr</Text>
            <Text style={styles.logoSubText}>by BNI</Text>
          </View>
          <View style={styles.topRightMenu}>
            <View style={styles.topRightColumn}>
              <View style={styles.topRightRow}>
                <TouchableOpacity 
                  style={styles.pointButton}
                  onPress={() => console.log('Points')}
                >
                  <View style={styles.pointIconContainer}>
                    <Award size={16} color="#F26522" strokeWidth={2.5} />
                  </View>
                  <Text style={styles.pointText}>{userPoints.toLocaleString('id-ID')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={() => console.log('Logout')}
                >
                  <LogOut size={20} color={Colors.gray[600]} />
                </TouchableOpacity>
              </View>
              <View style={styles.topRightRow}>
                <TouchableOpacity 
                  style={styles.smallIconButton}
                  onPress={() => router.push('/notifications')}
                >
                  <Bell size={18} color={Colors.gray[600]} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.smallIconButton}
                  onPress={() => router.push('/history')}
                >
                  <FileText size={18} color={Colors.gray[600]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.header}>
          <TouchableOpacity style={styles.userSection} onPress={openEditModal} activeOpacity={0.7}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarInner}>
                <User size={22} color="#6B7280" strokeWidth={2} />
              </View>
            </View>
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingHi}>Hi,</Text>
              <Text style={styles.greetingName}>{userName}</Text>
            </View>
          </TouchableOpacity>
        </View>

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
                    <Text style={styles.modalTitle}>Ubah Nama</Text>
                    <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.modalCloseBtn}>
                      <X size={20} color={Colors.gray[500]} />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.nameInput}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder="Masukkan nama"
                    placeholderTextColor={Colors.gray[400]}
                    autoFocus
                    maxLength={30}
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={saveUserName}>
                    <Check size={18} color="#fff" />
                    <Text style={styles.saveButtonText}>Simpan</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'insight' && styles.tabItemActive]}
            onPress={() => setActiveTab('insight')}
          >
            <View style={[styles.tabIcon, activeTab === 'insight' && styles.tabIconActive]}>
              <Lightbulb size={18} color={activeTab === 'insight' ? '#F26522' : Colors.gray[400]} />
            </View>
            <Text style={[styles.tabText, activeTab === 'insight' && styles.tabTextActive]}>Insight</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'transaksi' && styles.tabItemActive]}
            onPress={() => setActiveTab('transaksi')}
          >
            <View style={[styles.tabIcon, activeTab === 'transaksi' && styles.tabIconActive]}>
              <ArrowLeftRight size={18} color={activeTab === 'transaksi' ? '#F26522' : Colors.gray[400]} />
            </View>
            <Text style={[styles.tabText, activeTab === 'transaksi' && styles.tabTextActive]}>Transaksi</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'growth' && styles.tabItemActive]}
            onPress={() => setActiveTab('growth')}
          >
            <View style={[styles.tabIcon, activeTab === 'growth' && styles.tabIconActive]}>
              <TrendingUp size={18} color={activeTab === 'growth' ? '#F26522' : Colors.gray[400]} />
            </View>
            <Text style={[styles.tabText, activeTab === 'growth' && styles.tabTextActive]}>Growth</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScrollContent}
          style={styles.cardsScroll}
        >
          <PortfolioCard
            totalValue={13225987225}
            growthPercentage={2.5}
          />
          <BalanceCard
            accountName="Rekening Utama"
            accountNumber="0812345678"
            balance={userData.totalBalance}
          />
          <View style={{ width: 16 }} />
        </ScrollView>

        <QuickActions />

        <MenuGrid />

        <View style={styles.promoSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promo Spesial</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
              <ChevronRight size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoScroll}
          >
            <TouchableOpacity style={styles.promoCard}>
              <View style={[styles.promoIconBg, { backgroundColor: '#FFF3EB' }]}>
                <Percent size={20} color={Colors.primary} />
              </View>
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>Cashback 15%</Text>
                <Text style={styles.promoDesc}>Belanja di Tokopedia</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.promoCard}>
              <View style={[styles.promoIconBg, { backgroundColor: '#DCFCE7' }]}>
                <Gift size={20} color="#22C55E" />
              </View>
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>Gratis Transfer</Text>
                <Text style={styles.promoDesc}>100x per bulan</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.promoCard}>
              <View style={[styles.promoIconBg, { backgroundColor: '#DBEAFE' }]}>
                <Percent size={20} color="#3B82F6" />
              </View>
              <View style={styles.promoContent}>
                <Text style={styles.promoTitle}>Bunga 6%</Text>
                <Text style={styles.promoDesc}>Deposito Spesial</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/history')}
            >
              <Text style={styles.seeAllText}>Lihat Semua</Text>
              <ChevronRight size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.white,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: '#F26522',
    letterSpacing: -0.5,
  },
  logoSubText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#F26522',
    marginLeft: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: Colors.white,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  avatarInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  greetingContainer: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 13,
    color: Colors.gray[500],
    fontWeight: '400',
  },
  greetingHi: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
  },
  greetingName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.black,
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
  nameInput: {
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginBottom: 20,
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
    fontWeight: '700',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: Colors.gray[50],
    borderRadius: 16,
    padding: 6,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
  },
  tabItemActive: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconActive: {
    backgroundColor: '#FFF3EB',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.gray[400],
  },
  tabTextActive: {
    color: '#F26522',
  },
  topRightMenu: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  topRightColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 6,
  },
  topRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  pointIconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F26522',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  promoScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  promoCard: {
    width: 200,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.gray[100],
    marginRight: 12,
  },
  promoIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
  },
  promoDesc: {
    fontSize: 12,
    color: Colors.gray[500],
    marginTop: 2,
  },
  transactionsSection: {
    marginTop: 24,
  },
  transactionsList: {
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  cardsScroll: {
    marginTop: 8,
  },
  cardsScrollContent: {
    paddingRight: 16,
  },
});
