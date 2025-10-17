import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'

// Sample data for astrologers
const astrologersData = [
  {
    id: '1',
    name: 'Raj Kumar',
    specialty: 'Vedic Astrology',
    experience: '15 years',
    rating: 4.8,
    price: '₹999/session',
    availability: 'Available Today',
    image: null, // Placeholder for image
  },
  {
    id: '2',
    name: 'Sunita Patel',
    specialty: 'Numerology',
    experience: '10 years',
    rating: 4.6,
    price: '₹899/session',
    availability: 'Available Tomorrow',
    image: null,
  },
  {
    id: '3',
    name: 'Vikram Singh',
    specialty: 'Tarot Reading',
    experience: '8 years',
    rating: 4.5,
    price: '₹799/session',
    availability: 'Available Today',
    image: null,
  },
  {
    id: '4',
    name: 'Priya Sharma',
    specialty: 'Palmistry',
    experience: '12 years',
    rating: 4.7,
    price: '₹1099/session',
    availability: 'Available in 2 days',
    image: null,
  },
  {
    id: '5',
    name: 'Amit Verma',
    specialty: 'Vastu Shastra',
    experience: '20 years',
    rating: 4.9,
    price: '₹1299/session',
    availability: 'Available Today',
    image: null,
  },
];

const AstrologerBooking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Filter options
  const filters = ['All', 'Vedic', 'Numerology', 'Tarot', 'Palmistry', 'Vastu'];

  // Filter astrologers based on search query and selected filter
  const filteredAstrologers = astrologersData.filter(astrologer => {
    const matchesSearch = astrologer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         astrologer.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'All' || 
                         astrologer.specialty.toLowerCase().includes(selectedFilter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  const handleBooking = (astrologerId: string) => {
    // In a real app, this would navigate to a booking confirmation page
    // Use console.log instead of alert for React Native
    console.log(`Booking request sent for astrologer ID: ${astrologerId}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book an Astrologer</Text>
        <Text style={styles.headerSubtitle}>Find the perfect guide for your cosmic journey</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or specialty..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Options */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text 
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Astrologers List */}
      <View style={styles.astrologersListContainer}>
        <Text style={styles.sectionTitle}>
          {filteredAstrologers.length} Astrologers Available
        </Text>

        {filteredAstrologers.map((astrologer) => (
          <View key={astrologer.id} style={styles.astrologerCard}>
            <View style={styles.astrologerHeader}>
              <View style={styles.astrologerImageContainer}>
                <Text style={styles.astrologerInitials}>
                  {astrologer.name.split(' ').map(name => name[0]).join('')}
                </Text>
              </View>
              <View style={styles.astrologerInfo}>
                <Text style={styles.astrologerName}>{astrologer.name}</Text>
                <Text style={styles.astrologerSpecialty}>{astrologer.specialty}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>★ {astrologer.rating}</Text>
                  <Text style={styles.experienceText}>{astrologer.experience}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.bookingDetails}>
              <View>
                <Text style={styles.priceLabel}>Consultation Fee</Text>
                <Text style={styles.priceValue}>{astrologer.price}</Text>
              </View>
              <View>
                <Text style={styles.availabilityText}>{astrologer.availability}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => handleBooking(astrologer.id)}
            >
              <Text style={styles.bookButtonText}>Book Consultation</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default AstrologerBooking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9e6',
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
  searchContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filtersContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#ffc107',
    borderColor: '#ffc107',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  filterTextActive: {
    color: 'white',
  },
  astrologersListContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  astrologerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  astrologerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  astrologerImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffc107',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  astrologerInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  astrologerInfo: {
    flex: 1,
  },
  astrologerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  astrologerSpecialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff9d00',
    marginRight: 10,
  },
  experienceText: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  availabilityText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});