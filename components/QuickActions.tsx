import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Send, QrCode, ShoppingBag, Wallet } from 'lucide-react-native';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface QuickAction {
  id: string;
  name: string;
  icon: React.ReactNode;
  route?: string;
  bgColor: string;
}

const actions: QuickAction[] = [
  { id: '1', name: 'Transfer', icon: <Send size={24} color="#fff" />, route: '/(tabs)/transfer', bgColor: Colors.primary },
  { id: '2', name: 'QRIS', icon: <QrCode size={24} color="#fff" />, route: '/qr-scan', bgColor: '#1A1A1A' },
  { id: '3', name: 'Bayar & Beli', icon: <ShoppingBag size={24} color="#fff" />, route: '/(tabs)/bills', bgColor: '#F26522' },
  { id: '4', name: 'E-Wallet', icon: <Wallet size={24} color="#fff" />, route: '/topup', bgColor: '#0EA5E9' },
];

export default function QuickActions() {
  const router = useRouter();

  const handlePress = (action: QuickAction) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (action.route) {
      router.push(action.route as any);
    }
  };

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.actionItem}
          onPress={() => handlePress(action)}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: action.bgColor }]}>
            {action.icon}
          </View>
          <Text style={styles.label}>{action.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray[700],
    marginTop: 8,
  },
});
