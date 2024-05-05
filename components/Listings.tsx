import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { Camera } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';


interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("RELOAD", items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Camera> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInDown} exiting={FadeOutUp}>
          <View style={styles.box}>
            <Ionicons
              name="videocam-outline"
              size={30}
              color={"#000"}
              style={{ position: "absolute", top: 30, left: 30 }}
            />
            <TouchableOpacity style={styles.circle}>
              <Ionicons name="heart-outline" size={20} color={"#fff"} />
            </TouchableOpacity>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <Image source={{ uri: item.image_url }} />
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View>
      <FlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    position: "relative",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 8,
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 30,
    right: 30,
  },
  name: {
    fontSize: 16,
    color: "#000",
    marginTop: 120,
    paddingLeft: 15,
  },
});

export default Listings;
