import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { useState, useEffect } from "react";

import getNews from "../api/NewsApi";

export default function News() {
  const [newsArray, setNewsArray] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setNewsArray(await getNews());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <ScrollView style={{ padding: 10 }}>
      {newsArray.map((news) => (
        <View key={news.title} style={styles.newsBlock}>
          <Text
            style={styles.newsTitle}
            onPress={() => {
              Linking.openURL(`${news.url}`);
            }}
          >
            {news.title}
          </Text>
          <View style={{ alignSelf: "center", padding: 10 }}>
            <Image
              source={{ uri: news.image }}
              style={{ width: 300, height: 200 }}
            ></Image>
          </View>
          <Text style={{ fontWeight: "bold" }}>
            {news.publishTime.slice(0, 10)}
          </Text>
          <Text style={styles.newsText}>{news.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  newsBlock: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#244068",
  },
});
