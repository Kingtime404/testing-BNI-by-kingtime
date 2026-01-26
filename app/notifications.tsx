import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { ArrowRightLeft, Tag, Info, Check, Circle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { notifications, Notification } from '@/mocks/bankData';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'transaction':
      return <ArrowRightLeft size={20} color={Colors.primary} />;
    case 'promo':
      return <Tag size={20} color={Colors.warning} />;
    case 'info':
      return <Info size={20} color={Colors.info} />;
    default:
      return <Info size={20} color={Colors.gray[500]} />;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'transaction':
      return Colors.primaryLight;
    case 'promo':
      return Colors.warningLight;
    case 'info':
      return Colors.infoLight;
    default:
      return Colors.gray[100];
  }
};

export default function NotificationsScreen() {
  const [notificationsList, setNotificationsList] = useState(notifications);

  const markAsRead = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setNotificationsList(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notificationsList.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Notifikasi',
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.gray[800],
          headerTitleStyle: { fontWeight: '600' },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {unreadCount > 0 && (
          <View style={styles.header}>
            <Text style={styles.unreadText}>{unreadCount} belum dibaca</Text>
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={styles.markAllText}>Tandai semua dibaca</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.notificationsList}>
          {notificationsList.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.notificationUnread,
              ]}
              onPress={() => markAsRead(notification.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.notificationIcon, { backgroundColor: getNotificationColor(notification.type) }]}>
                {getNotificationIcon(notification.type)}
              </View>
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationDate}>{notification.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {notificationsList.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Tidak ada notifikasi</Text>
            <Text style={styles.emptyDesc}>Anda akan menerima notifikasi tentang transaksi dan promo di sini</Text>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  unreadText: {
    fontSize: 14,
    color: Colors.gray[600],
    fontWeight: '500',
  },
  markAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  notificationsList: {
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  notificationUnread: {
    backgroundColor: Colors.primaryLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 14,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[800],
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.gray[600],
    marginTop: 4,
    lineHeight: 20,
  },
  notificationDate: {
    fontSize: 12,
    color: Colors.gray[400],
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray[700],
  },
  emptyDesc: {
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
