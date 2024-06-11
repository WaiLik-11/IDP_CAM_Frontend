import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import EmptyState from '../../components/EmptyState'
import { getAllPost } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { database } from '../../lib/firebaseConfig'
import { ref, onValue } from "firebase/database";
import { useGlobalContext } from '../../context/GlobalProvider'


const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPost);
  const { user, setUser } = useGlobalContext()

  const [refreshing, setRefreshing] = useState(false)
  const [humidity, setHumidity] = useState(null);
  const [temperature, setTemperature] = useState(null);

   // Define static video data
   const staticPosts = [
    {
      $id: '1',
      title: 'Static Video 1',
      description: 'This is a static video description 1',
      videoUrl: 'https://example.com/video1.mp4',
      thumbnail: 'https://example.com/thumbnail1.jpg'
    },
    {
      $id: '2',
      title: 'Static Video 2',
      description: 'This is a static video description 2',
      videoUrl: 'https://example.com/video2.mp4',
      thumbnail: 'https://example.com/thumbnail2.jpg'
    }
    // Add more static videos as needed
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  // Fetch humidity value from Firebase
  useEffect(() => {
    const humidityRef = ref(database, 'Devices/Humidity/Humidity');
    onValue(humidityRef, (snapshot) => {
      const value = snapshot.val();
      setHumidity(value);
    });
  }, []);

  // Fetch temperature value from Firebase
  useEffect(() => {
    const tempRef = ref(database, 'Devices/Humidity/Temperature');
    onValue(tempRef, (snapshot) => {
      const value = snapshot.val();
      setTemperature(value);
    });
  }, []);
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}

        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome back</Text>
                <Text className="text-2xl font-psemibold text-white">{user?.username}</Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            {/* Temperature Box Container */}
            <View className="bg-gray-800 p-4 rounded-lg mb-5">
              <Text className="text-white text-lg font-semibold">Cozy Home</Text>
              <Text className="text-white text-4xl font-bold">{temperature !== null ? `${temperature} °C` : '-- °C'}</Text>
              <View className="mt-2 flex-row justify-between">
                <View className="items-start">
                  <Text className="text-gray-400 font-psemibold">{humidity !== null ? `${humidity}` : '-- %'}</Text>
                  <Text className="text-gray-400">Humidity</Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-400 font-psemibold">1002.4hPa</Text>
                  <Text className="text-gray-400">Air Pressure</Text>
                </View>
                <View className="items-end">
                  <Text className="text-gray-400 font-psemibold">2.1m/s</Text>
                  <Text className="text-gray-400">Wind Speed</Text>
                </View>
              </View>
            </View>


          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No device added"
            subtitle="Add your first device to get started"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      />
    </SafeAreaView>
  )
}

export default Home