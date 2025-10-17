import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Horoscope = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Horoscope</Text>
      <Text style={styles.subtitle}>Aries</Text>
      <Text style={styles.content}>
        Today, you may feel a surge of energy and motivation. Embrace new opportunities and trust your instincts. Challenges may arise, but your determination will see you through.
      </Text>
      <Text style={styles.subtitle}>Taurus</Text>
      <Text style={styles.content}>
        Focus on stability and practicality. A financial matter may require your attention. Patience will be your ally in resolving any issues.
      </Text>
      <Text style={styles.subtitle}>Gemini</Text>
      <Text style={styles.content}>
        Communication is key today. Share your ideas and listen to others. A social gathering could bring unexpected insights.
      </Text>
      {/* Add more signs as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Horoscope;
