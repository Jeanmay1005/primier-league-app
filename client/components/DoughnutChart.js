import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const DoughnutChart = (teamInfo) => {
  const stat = teamInfo.teamInfo.fixtures;
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const wins = stat.wins.total;
  const loses = stat.loses.total;
  const draws = stat.draws.total;
  const total = stat.played.total;

  const winsPercentage = (wins / total) * 100;
  const strokeDashoffset1 =
    circleCircumference - (circleCircumference * winsPercentage) / 100;

  const losesPercentage = (loses / total) * 100;
  const strokeDashoffset2 =
    circleCircumference - (circleCircumference * losesPercentage) / 100;

  const drawsPercentage = (draws / total) * 100;
  const strokeDashoffset3 =
    circleCircumference - (circleCircumference * drawsPercentage) / 100;

  const winsAngel = (wins / total) * 360;
  const losesAngel = (loses / total) * 360;
  const drawsAngel = winsAngel + losesAngel;

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#3FA152"
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset1}
              rotation={0}
              originX="90"
              originY="90"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#FD5B4B"
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset2}
              rotation={winsAngel}
              originX="90"
              originY="90"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#3BA2FD"
              fill="transparent"
              strokeWidth="40"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset3}
              rotation={drawsAngel}
              originX="90"
              originY="90"
            />
          </G>
        </Svg>
        {/* <Text style={styles.text}>{spentAmount}€</Text> */}
      </View>
    </View>
  );
};

export default DoughnutChart;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    color: "#394867",
  },
});
