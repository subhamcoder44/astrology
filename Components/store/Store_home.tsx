import { Pressable, StyleSheet, Text, View , FlatList, Image, TextInput, ScrollView, Alert} from 'react-native'
import React, { useState, useMemo } from 'react'
import {NativeStackScreenProps} from "@react-navigation/native-stack"
import {RootStackParamList} from "../Navigator"
import Data from "./Data/Data"

const Store_home = ({navigation}: NativeStackScreenProps<RootStackParamList, "Store_home">) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [cart, setCart] = useState<any[]>([])

  const filters = ['All', 'Natural', 'Lab-Grown', 'Treated', 'Fancy Colors']

  const filteredData = useMemo(() => {
    let filtered = Data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.details.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = selectedFilter === 'All' || 
                           item.name.includes(selectedFilter) ||
                           item.diamond_name.includes(selectedFilter)
      return matchesSearch && matchesFilter
    })
    return filtered
  }, [searchQuery, selectedFilter])

  const handleBuyNow = (item: any) => {
    Alert.alert(
      'Buy Now',
      `Purchase ${item.name}?\nPrice: $${item.price_usd_per_carat_estimate}/carat`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm Purchase', 
          onPress: () => {
            setCart([...cart, item])
            Alert.alert('Success', 'Item added to cart!')
          }
        }
      ]
    )
  }

  const handleAddToCart = (item: any) => {
    setCart([...cart, item])
    Alert.alert('Added to Cart', `${item.name} added to your cart`)
  }

  const renderItem = ({item}: {item: any}) => (
    <Pressable 
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Store_details", { item })}
    >
      <Image 
        source={item.image_url ? { uri: item.image_url } : require('../diamon.jpg')} 
        style={styles.image} 
        onError={() => console.log('Image load error')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details} numberOfLines={2}>{item.details}</Text>
        <Text style={styles.price}>${item.price_usd_per_carat_estimate}/carat</Text>
        
        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.addToCartBtn} 
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
          
          <Pressable 
            style={styles.buyNowBtn} 
            onPress={() => handleBuyNow(item)}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Diamond Store</Text>
        <View style={styles.cartContainer}>
          <Text style={styles.cartText}>Cart ({cart.length})</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search diamonds..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            style={[styles.filterChip, selectedFilter === filter && styles.selectedFilter]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.selectedFilterText]}>
              {filter}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
       
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  )
}

export default Store_home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  cartContainer: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cartText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedFilter: {
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
  },
  filterText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedFilterText: {
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  details: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e90ff',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 12,
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: '#1e90ff',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buyNowText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
});