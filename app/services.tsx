import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { 
  Plane, 
  Train, 
  Bus, 
  Hotel, 
  Ticket, 
  Gift, 
  Coins, 
  Building, 
  GraduationCap,
  Heart,
  ChevronRight
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const services: ServiceItem[] = [
  { id: '1', name: 'Tiket Pesawat', description: 'Booking tiket penerbangan', icon: <Plane size={24} color="#fff" />, color: Colors.menu.blue },
  { id: '2', name: 'Tiket Kereta', description: 'Booking tiket KAI', icon: <Train size={24} color="#fff" />, color: Colors.menu.green },
  { id: '3', name: 'Tiket Bus', description: 'Booking tiket bus AKAP', icon: <Bus size={24} color="#fff" />, color: Colors.menu.yellow },
  { id: '4', name: 'Hotel', description: 'Booking hotel & vila', icon: <Hotel size={24} color="#fff" />, color: Colors.menu.purple },
  { id: '5', name: 'Event', description: 'Tiket konser & acara', icon: <Ticket size={24} color="#fff" />, color: Colors.menu.red },
  { id: '6', name: 'Voucher', description: 'Voucher belanja & makan', icon: <Gift size={24} color="#fff" />, color: Colors.menu.orange },
  { id: '7', name: 'Zakat', description: 'Bayar zakat & infaq', icon: <Coins size={24} color="#fff" />, color: Colors.menu.teal },
  { id: '8', name: 'Pajak', description: 'Bayar pajak PBB & lainnya', icon: <Building size={24} color="#fff" />, color: Colors.menu.gray },
  { id: '9', name: 'Pendidikan', description: 'Bayar SPP & uang kuliah', icon: <GraduationCap size={24} color="#fff" />, color: Colors.menu.blue },
  { id: '10', name: 'Donasi', description: 'Donasi & crowdfunding', icon: <Heart size={24} color="#fff" />, color: Colors.menu.red },
];

export default function ServicesScreen() {
  const handlePress = (service: ServiceItem) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert(service.name, `Fitur ${service.name} akan segera hadir!`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Semua Layanan</Text>
      <View style={styles.servicesList}>
        {services.map((service, index) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceItem,
              index !== services.length - 1 && styles.serviceItemBorder,
            ]}
            onPress={() => handlePress(service)}
            activeOpacity={0.7}
          >
            <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
              {service.icon}
            </View>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDesc}>{service.description}</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[800],
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  servicesList: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  serviceItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceContent: {
    flex: 1,
    marginLeft: 14,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  serviceDesc: {
    fontSize: 13,
    color: Colors.gray[500],
    marginTop: 2,
  },
});
