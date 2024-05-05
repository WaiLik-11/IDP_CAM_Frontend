import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { Link } from "expo-router";
  import Colors from "@/constants/Colors";
  
  const categories = [
    {
      name: "Favourites",
      icon: "heart-outline",
    },
    {
      name: "All Devices",
      icon: "grid-outline",
    },
  ];
  
  interface Props {
    onCategoryChanged: (category: string) => void;
  }

  const Header = ({ onCategoryChanged }: Props) => {
    const itemsRef = useRef<Array<TouchableOpacity | null>>([])
    const [activeIndex, setActiveIndex] = useState(0)

    const selectCategory = (index: number) => {
        setActiveIndex(index)
        onCategoryChanged(categories[index].name)
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
        <View style={styles.container}>
          <View style={styles.actionRow}>
            <Text style={styles.headerText}>My home</Text>
  
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={styles.notiBtn}>
                <Ionicons name="notifications-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add-circle-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ 
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
           }}>
            { categories.map((item, index) => (
                <TouchableOpacity
                    onPress={() => selectCategory(index)}
                    key={index} 
                    ref={(el) => (itemsRef.current[index] = el)}
                    
                >
                    <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{ item.name }</Text>
                </TouchableOpacity>
            )) }
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.primary,
      height: 130,
    },
    actionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingBottom: 16,
    },
    headerText: {
      fontSize: 18,
      fontWeight: '700',
    },
    addBtn: {
      padding: 10,
      borderWidth: 0,
      borderColor: Colors.grey,
      borderRadius: 24,
    },
    notiBtn: {
      padding: 10,
      borderWidth: 0,
      borderColor: Colors.grey,
      borderRadius: 24,
    },
    categoryText: {
        fontSize: 17,
        color: Colors.grey,
        fontWeight: '600'
    },
    categoryTextActive: {
        fontSize: 17,
        color: '#000',
        fontWeight: '700',
    },
  });
  
  export default Header;