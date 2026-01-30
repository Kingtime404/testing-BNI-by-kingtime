import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowRightLeft, 
  BarChart3, 
  CreditCard, 
  Umbrella, 
  MoreHorizontal,
  Lightbulb,
  Droplet,
  Smartphone,
  Globe,
  Wifi
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  route?: string;
}

const menuItems: MenuItem[] = [
  { id: '1', name: 'Transfer', icon: <ArrowRightLeft size={22} color="#fff" />, color: '#22C55E', route: '/(tabs)/transfer' },
  { id: '2', name: 'Listrik', icon: <Lightbulb size={22} color="#fff" />, color: '#FBBF24', route: '/(tabs)/bills' },
  { id: '3', name: 'Air PDAM', icon: <Droplet size={22} color="#fff" />, color: '#38BDF8', route: '/(tabs)/bills' },
  { id: '4', name: 'Pulsa', icon: <Smartphone size={22} color="#fff" />, color: '#A855F7', route: '/topup' },
  { id: '5', name: 'Internet', icon: <Wifi size={22} color="#fff" />, color: '#F472B6', route: '/(tabs)/bills' },
  { id: '6', name: 'Investasi', icon: <BarChart3 size={22} color="#fff" />, color: '#60A5FA', route: '/investment' },
  { id: '7', name: 'Kredit', icon: <CreditCard size={22} color="#fff" />, color: '#F87171', route: '/credit' },
  { id: '8', name: 'Asuransi', icon: <Umbrella size={22} color="#fff" />, color: '#4ADE80', route: '/insurance' },
  { id: '9', name: 'Luar Negeri', icon: <Globe size={22} color="#fff" />, color: '#6366F1', route: '/overseas' },
  { id: '10', name: 'Lainnya', icon: <MoreHorizontal size={22} color="#fff" />, color: '#9CA3AF', route: '/services' },
];

export default function MenuGrid() {
  const router = useRouter();

  const handlePress = (item: MenuItem) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (item.route) {
      router.push(item.route as any);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              {item.icon}
            </View>
            <Text style={styles.menuLabel} numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  menuItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.gray[700],
    textAlign: 'center',
  },
});
