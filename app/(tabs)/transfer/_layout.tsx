import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function TransferLayout() {
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
          title: 'Transfer',
        }}
      />
    </Stack>
  );
}
