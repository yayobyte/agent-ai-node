import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color="#3B82F6" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: 'flex-start',
  }
});