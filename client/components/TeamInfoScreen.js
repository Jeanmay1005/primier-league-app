import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { getTeamInfo } from "../api/TeamInfoApi";
import DoughnutChart from "./DoughnutChart";

export default function TeamInfoScreen(props) {
  const [teamInfo, setTeamInfo] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setTeamInfo(await getTeamInfo(props.route.params));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  if (teamInfo.length !== 0) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {teamInfo.team.name}
        </Text>
        <Image
          source={{ uri: teamInfo.team.logo }}
          style={{ width: 150, height: 150 }}
        ></Image>

        <DoughnutChart teamInfo={teamInfo} style={{ paddingTop: 20 }} />
        <View style={styles.labels}>
          <View style={[styles.box, { backgroundColor: "#3FA152" }]}></View>
          <Text>wins</Text>
        </View>
        <View style={styles.labels}>
          <View style={[styles.box, { backgroundColor: "#FD5B4B" }]}></View>
          <Text>loses</Text>
        </View>
        <View style={styles.labels}>
          <View style={[styles.box, { backgroundColor: "#3BA2FD" }]}></View>
          <Text>draws</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    paddingTop: 20,
  },
  box: {
    top: 10,
    left: 10,
    width: 10,
    height: 10,
    padding: 10,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 20,
  },
});
