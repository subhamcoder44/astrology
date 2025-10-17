import { StyleSheet, Text, View, Image, ScrollView, Pressable, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigator'

const { width } = Dimensions.get('window')

const Store_details = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, "Store_details">) => {
  const { item } = route.params || {}
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const images = [
    item.image_url ? { uri: item.image_url } : require('../diamon.jpg'),
    item.image_url ? { uri: item.image_url } : require('../diamon.jpg'),
    item.image_url ? { uri: item.image_url } : require('../diamon.jpg'),
  ]

  const reviews = [
    { id: 1, name: 'John Doe', rating: 5, comment: 'Excellent quality diamond!', date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', rating: 4, comment: 'Beautiful cut and clarity.', date: '2024-01-10' },
    { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Perfect for engagement ring.', date: '2024-01-05' },
  ]

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', `${item?.name} added to cart`)
  }

  const handleBuyNow = () => {
    Alert.alert('Buy Now', `Purchase ${item?.name} for $${item?.price_usd_per_carat_estimate}/carat`)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    Alert.alert(isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist')
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {/* Top sections: Kundli, Matching, Horoscope (added before product) */}
      <View style={styles.topBar}>
        <Pressable style={styles.topItem} onPress={() => navigation.navigate('Kundli_Form' as never)}>
          <Image source={require('../../Images/kundli.jpg')} style={styles.topIcon} />
          <Text style={styles.topLabel}>Kundli</Text>
        </Pressable>

        <Pressable style={styles.topItem} onPress={() => navigation.navigate('Matching' as never)}>
          <Image source={require('../../Images/love.jpg')} style={styles.topIcon} />
          <Text style={styles.topLabel}>Matching</Text>
        </Pressable>

        <Pressable style={styles.topItem} onPress={() => navigation.navigate('Horoscope' as never)}>
          <Image source={require('../../Images/horos.jpg')} style={styles.topIcon} />
          <Text style={styles.topLabel}>Horoscope</Text>
        </Pressable>
      </View>

      {/* Image Gallery */}
      <View style={styles.imageContainer}>
        <Image source={images[selectedImage]} style={styles.mainImage} />
        <View style={styles.thumbnailContainer}>
          {images.map((img, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedImage(index)}
              style={[styles.thumbnail, selectedImage === index && styles.selectedThumbnail]}
            >
              <Image source={img} style={styles.thumbnailImage} />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.productName}>{item.name}</Text>
          <Pressable onPress={handleWishlist} style={styles.wishlistBtn}>
            <Text style={styles.wishlistText}>{isWishlisted ? '❤️' : '🤍'}</Text>
          </Pressable>
        </View>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐⭐⭐⭐⭐</Text>
          <Text style={styles.ratingText}>(4.8) • 127 reviews</Text>
        </View>

        <Text style={styles.price}>${item.price_usd_per_carat_estimate}/carat</Text>
        
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <View style={styles.quantityControls}>
            <Pressable 
              style={styles.quantityBtn}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityBtnText}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable 
              style={styles.quantityBtn}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityBtnText}>+</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.description}>{item.details}</Text>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Key Features:</Text>
          <Text style={styles.feature}>• Premium Quality Diamond</Text>
          <Text style={styles.feature}>• GIA Certified</Text>
          <Text style={styles.feature}>• Free Shipping</Text>
          <Text style={styles.feature}>• 30-Day Return Policy</Text>
          <Text style={styles.feature}>• Lifetime Warranty</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
          <Pressable style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </Pressable>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Customer Reviews</Text>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <Text style={styles.reviewRating}>⭐{'⭐'.repeat(review.rating - 1)}</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Store_details

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc107', // changed from purple/#f5f5f5 to #ffc107
  },
  topBar: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffc107', // matches app background
  },
  topItem: {
    alignItems: 'center',
  },
  topIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eee',
  },
  topLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
  },
  mainImage: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#1e90ff',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  productInfo: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  wishlistBtn: {
    padding: 8,
  },
  wishlistText: {
    fontSize: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingText: {
    color: '#666',
    fontSize: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e90ff',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  quantityBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  quantityBtnText: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantityText: {
    width: 50,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  feature: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  reviewsContainer: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 16,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    fontSize: 12,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
})