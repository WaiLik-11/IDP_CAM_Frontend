import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ListingData from '@/assets/data/cam-listings.json'
import Animated from 'react-native-reanimated'
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const IMG_HEIGHT = 300

const { width } = Dimensions.get('window')

const Page = () => {
  const laptopIp = '172.20.10.2';
  const flaskAppUrl = `http://${laptopIp}:5000/webcam`;

    const { id } = useLocalSearchParams<{ id: string }>();
    const listing = (ListingData as any[]).find((item) => item.id === id)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 5000); // 2 seconds timeout
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, []); // Empty dependency array means this effect runs only once on component mount
  
    const handleLoadStart = () => {
      setLoading(true);
      setError(false);
    };
  
    const handleLoadEnd = () => {
      setLoading(false);
      setError(false);
    };
  
    const handleLoadError = (error: any) => {
      console.log('Webview load error:', error);
      setLoading(false);
      setError(true);
    };
  

  return (
    <View style={styles.container}>
      <Animated.ScrollView>
      {loading ? <ActivityIndicator size='small' /> : null}
      <WebView
        source={{ uri: flaskAppUrl }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleLoadError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      {/* <View style={styles.webview}>
        <Text style={{ padding: 24 }}>Video goes here</Text>
      </View> */}

      
      <View style={styles.infoContainer}>
        <TouchableOpacity>
          <Ionicons name="camera" size={24} color='gray' style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="videocam" size={24} color='gray' style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="volume-medium" size={24} color="gray" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="call" size={24} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <View style={styles.control}>
            
          </View>
        </View>
      </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cam: {
    height: IMG_HEIGHT,
    width,
  },
  webview: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    marginHorizontal: 40,
  },
  controlsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  },
  control: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
})

export default Page