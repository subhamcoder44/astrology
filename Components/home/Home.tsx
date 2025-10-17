import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'


const { width } = Dimensions.get('window')

const Home = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Clear any previous error messages when component mounts
    setErrorMessage('')
  }, [])

  const handleNavigationError = (screenName: string) => {
    try {
      return true
    } catch (error) {
      setErrorMessage(`Failed to navigate to ${screenName}. Please try again.`)
      Alert.alert('Navigation Error', `Failed to navigate to ${screenName}. Please try again.`)
      return false
    }
  }

  const navigateToBooking = () => {
    // Navigate to booking screen with error handling
    if (handleNavigationError('Booking')) {
      (navigation as any).navigate('AstrologerBooking');
    }
  }

  const navigateToKundli = () => {
    // Navigate to kundli screen with error handling
    if (handleNavigationError('Kundli')) {
      (navigation as any).navigate('kundli_Form');
    }
  }

  const navigateToHoroscope = () => {
    // Navigate to horoscope screen with error handling
    if (handleNavigationError('Horoscope')) {
      (navigation as any).navigate('Horoscope');
    }
  }
  
  const navigateToMatching = () => {
    // Navigate to matching screen with error handling
    if (handleNavigationError('Matching')) {
      (navigation as any).navigate('Horoscope'); // Using Horoscope as fallback since there's no dedicated Matching screen yet
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Error Message Display */}
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity onPress={() => setErrorMessage('')}>
            <Text style={styles.dismissText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Astrology App</Text>
        <Text style={styles.headerSubtitle}>Discover Your Cosmic Path</Text>
      </View>

      {/* Main Home Section */}
      <View style={styles.mainSection}>
        <Text style={styles.sectionTitle}>Daily Horoscope</Text>
        <View style={styles.horoscopeCard}>
          <Text style={styles.horoscopeText}>
            Today's cosmic energies are aligned for personal growth and new opportunities.
            Take time to reflect on your goals and aspirations.
          </Text>
        </View>

        {/* Kundli Section */}
        <Text style={styles.sectionTitle}>Kundli</Text>
        <TouchableOpacity style={styles.featureCard} onPress={navigateToKundli}>
          <View style={styles.featureContent}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>🔯</Text>
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Birth Chart Analysis</Text>
              <Text style={styles.featureDescription}>
                Get detailed insights about your birth chart and planetary positions
              </Text>
            </View>
          </View>
          <Text style={styles.featureActionText}>Generate Kundli →</Text>
        </TouchableOpacity>

        {/* Matching Section */}
        <Text style={styles.sectionTitle}>Matching</Text>
        <TouchableOpacity style={styles.featureCard} onPress={navigateToMatching}>
          <View style={styles.featureContent}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>❤️</Text>
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Compatibility Check</Text>
              <Text style={styles.featureDescription}>
                Check your compatibility with your partner based on astrological factors
              </Text>
            </View>
          </View>
          <Text style={styles.featureActionText}>Match Horoscopes →</Text>
        </TouchableOpacity>

        {/* Horoscope Section */}
        <Text style={styles.sectionTitle}>Horoscope</Text>
        <TouchableOpacity style={styles.featureCard} onPress={navigateToHoroscope}>
          <View style={styles.featureContent}>
            <View style={styles.featureIconContainer}>
              <Text style={styles.featureIcon}>🌟</Text>
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Daily Predictions</Text>
              <Text style={styles.featureDescription}>
                Get personalized daily, weekly, and monthly horoscope predictions
              </Text>
            </View>
          </View>
          <Text style={styles.featureActionText}>Read Horoscope →</Text>
        </TouchableOpacity>

        {/* Featured Services */}
        <Text style={styles.sectionTitle}>Featured Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesContainer}>
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceIconContainer}>
              <Text style={styles.serviceIcon}>♈</Text>
            </View>
            <Text style={styles.serviceTitle}>Zodiac Reading</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceIconContainer}>
              <Text style={styles.serviceIcon}>🌙</Text>
            </View>
            <Text style={styles.serviceTitle}>Moon Sign</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.serviceCard}>
            <View style={styles.serviceIconContainer}>
              <Text style={styles.serviceIcon}>⭐</Text>
            </View>
            <Text style={styles.serviceTitle}>Compatibility</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Astrologer Booking Section */}
      <View style={styles.bookingSection}>
        <Text style={styles.sectionTitle}>Book an Astrologer</Text>
        <Text style={styles.bookingDescription}>
          Get personalized readings and guidance from our expert astrologers
        </Text>
        
        <View style={styles.astrologersContainer}>
          {/* Astrologer Card 1 */}
          <TouchableOpacity style={styles.astrologerCard} onPress={navigateToBooking}>
            <View style={styles.astrologerImagePlaceholder}>
              <Text style={styles.astrologerInitials}>RK</Text>
            </View>
            <Text style={styles.astrologerName}>Raj Kumar</Text>
            <Text style={styles.astrologerSpecialty}>Vedic Astrology</Text>
            <TouchableOpacity style={styles.bookButton} onPress={navigateToBooking}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          
          {/* Astrologer Card 2 */}
          <TouchableOpacity style={styles.astrologerCard} onPress={navigateToBooking}>
            <View style={styles.astrologerImagePlaceholder}>
              <Text style={styles.astrologerInitials}>SP</Text>
            </View>
            <Text style={styles.astrologerName}>Sunita Patel</Text>
            <Text style={styles.astrologerSpecialty}>Numerology</Text>
            <TouchableOpacity style={styles.bookButton} onPress={navigateToBooking}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.viewAllButton} onPress={navigateToBooking}>
          <Text style={styles.viewAllButtonText}>View All Astrologers</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9e6',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    flex: 1,
  },
  dismissText: {
    color: '#f44336',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffc107',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  mainSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  horoscopeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  horoscopeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff3cd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  featureActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffc107',
    textAlign: 'right',
  },
  servicesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  serviceCard: {
    width: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff3cd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceIcon: {
    fontSize: 24,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  bookingSection: {
    padding: 20,
    backgroundColor: '#fff3cd',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },
  bookingDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  astrologersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  astrologerCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  astrologerImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffc107',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  astrologerInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  astrologerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  astrologerSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 5,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
  viewAllButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  viewAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})