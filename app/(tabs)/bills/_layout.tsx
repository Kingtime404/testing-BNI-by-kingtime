import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function BillsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: '600',
          color: Colors.gray[800],
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Bayar Tagihan',
        }}
      />
    </Stack>
  );
}
