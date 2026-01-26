import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ChevronRight, PieChart, TrendingUp } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface PortfolioCardProps {
  totalValue: number;
  growthPercentage: number;
}

const formatBalance = (amount: number): string => {
  return new Intl.NumberFormat('id-ID').format(amount);
};

export default function PortfolioCard({ totalValue, growthPercentage }: PortfolioCardProps) {
  const router = useRouter();

  const handleViewPortfolio = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/investment');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#006BB4', '#0077CC', '#0088E0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardPattern}>
          <View style={styles.patternCircle1} />
          <View style={styles.patternCircle2} />
        </View>

        <View style={styles.topSection}>
          <View style={styles.headerRow}>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.cardHeader} onPress={handleViewPortfolio}>
              <View style={styles.cardIconContainer}>
                <PieChart size={14} color="#fff" />
              </View>
              <Text style={styles.cardLabel}>Portfolio</Text>
              <ChevronRight size={14} color="#fff" style={styles.headerArrow} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.valueSection}>
          <Text style={styles.valueLabel}>Total Nilai Portfolio</Text>
          <View style={styles.valueRow}>
            <Text style={styles.currency}>Rp</Text>
            <Text style={styles.valueAmount}>{formatBalance(totalValue)}</Text>
          </View>
          <View style={styles.growthRow}>
            <TrendingUp size={14} color="#4ADE80" />
            <Text style={styles.growthText}>+{growthPercentage}%</Text>
            <Text style={styles.growthLabel}>bulan ini</Text>
          </View>
        </View>


      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    marginLeft: 16,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    shadowColor: '#006BB4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
    height: '100%',
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
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  topSection: {
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  cardIconContainer: {
    marginRight: 4,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '500' as const,
    color: '#fff',
    letterSpacing: 0.2,
  },
  headerArrow: {
    marginLeft: 2,
  },
  valueSection: {
    flex: 1,
    justifyContent: 'center',
  },
  valueLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '400' as const,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#fff',
    marginRight: 4,
  },
  valueAmount: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: '#fff',
    letterSpacing: 0,
  },
  growthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  growthText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#4ADE80',
  },
  growthLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '400' as const,
  },

});
