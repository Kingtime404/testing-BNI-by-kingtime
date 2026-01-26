import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/constants/colors";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Kembali" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="balance" 
        options={{ 
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="notifications" 
        options={{ 
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="history" 
        options={{ 
          presentation: "card",
        }} 
      />
      <Stack.Screen 
        name="topup" 
        options={{ 
          title: "Top Up",
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.gray[800],
        }} 
      />
      <Stack.Screen 
        name="qr-scan" 
        options={{ 
          title: "Scan QR",
          presentation: "modal",
          headerStyle: { backgroundColor: Colors.white },
        }} 
      />
      <Stack.Screen 
        name="services" 
        options={{ 
          title: "Layanan Lainnya",
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.gray[800],
        }} 
      />
      <Stack.Screen 
        name="investment" 
        options={{ 
          title: "Investasi",
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.gray[800],
        }} 
      />
      <Stack.Screen 
        name="insurance" 
        options={{ 
          title: "Asuransi",
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.gray[800],
        }} 
      />
      <Stack.Screen 
        name="credit" 
        options={{ 
          title: "Kredit",
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.gray[800],
        }} 
      />
      <Stack.Screen 
        name="purchase" 
        options={{ 
          title: "Pembelian",
          headerStyle: { backgroundColor: Colors.white },
          headerTintColor: Colors.gray[800],
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
