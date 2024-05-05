import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import Listings from "@/components/Listings";
import listingsData from '@/assets/data/cam-listings.json'

const Page = () => {
  const [category, setCategory] = useState('Favourites')
  const items = useMemo(() => listingsData as any, [])

  const onDataCahanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View style={{ flex: 1, marginTop: 150 }}>
      <Stack.Screen
        options={{
          header: () => <Header onCategoryChanged={onDataCahanged} />,
        }}
      />
      <Listings listings={items} category={category} />
    </View>
  );
};

export default Page;
